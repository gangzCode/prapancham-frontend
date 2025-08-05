import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentFormData {
    email: string;
    name: string;
    address: string;
    phoneNumber: string;
    countryId: string;
    packageAmount: number;
    tempOrderId?: string;
    paymentIntentId?: string;
}

interface PaymentFormProps {
    formData: PaymentFormData;
    onSuccess: () => void;
    onError: (error: string) => void;
    onBack: () => void;
    onClose: () => void;
    currencyCode?: string;
    clientSecret: string;
    isOpen: boolean;
    t: { [key: string]: string };
}

interface CheckoutFormProps {
    clientSecret: string;
    onSuccess: () => void;
    onError: (error: string) => void;
    onBack: () => void;
    t: { [key: string]: string };
}

// Checkout form component that uses Stripe Elements
const CheckoutForm: React.FC<CheckoutFormProps> = ({
    clientSecret,
    onSuccess,
    onError,
    onBack,
    t
}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded
            return;
        }

        setIsLoading(true);
        setErrorMessage(null);

        try {
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/payment-status`,
                },
                redirect: 'if_required',
            });

            if (error) {
                // This point will only be reached if there is an immediate error when confirming the payment.
                setErrorMessage(error.message || 'An unexpected error occurred.');
                onError(error.message || 'Payment failed');
            } else {
                // Payment succeeded
                onSuccess();
            }
        } catch (err) {
            setErrorMessage('An unexpected error occurred.');
            onError('An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 border border-gray-200 rounded-lg">
                <PaymentElement
                    options={{
                        layout: 'tabs',
                        paymentMethodOrder: ['card', 'apple_pay', 'google_pay']
                    }}
                />
            </div>

            {errorMessage && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {errorMessage}
                </div>
            )}

            <div className="flex justify-end gap-2 items-center mt-6">
                <button
                    type="button"
                    onClick={onBack}
                    disabled={isLoading}
                    className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6 disabled:opacity-50"
                >
                    {t.back || 'Back'}
                </button>
                <button
                    type="submit"
                    disabled={!stripe || isLoading}
                    className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (t.processing || 'Processing...') : (t.payNow || 'Pay Now')}
                </button>
            </div>
        </form>
    );
};

// Main StripePaymentMemorial component
const StripePaymentMemorial: React.FC<PaymentFormProps> = ({
    formData,
    onSuccess,
    onError,
    onBack,
    onClose,
    currencyCode,
    clientSecret,
    isOpen,
    t
}) => {
    const [error, setError] = useState<string>('');

    if (!isOpen) return null;

    const appearance = {
        theme: 'stripe' as const,
        variables: {
            colorPrimary: '#0D1322',
            colorBackground: '#ffffff',
            colorText: '#30313d',
            colorDanger: '#df1b41',
            fontFamily: 'system-ui, sans-serif',
            spacingUnit: '4px',
            borderRadius: '8px',
        },
    };

    const options = {
        clientSecret,
        appearance,
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-lg max-h-[90vh] overflow-y-auto w-full max-w-2xl relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-8">
                    <h2 className="text-2xl font-bold mb-6 pr-8">{t.completePayment || 'Complete Payment'}</h2>

                    {/* Payment Summary */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <div className="flex justify-between items-center">
                            <span className="font-medium">{t.packageAmount || 'Package Amount'}:</span>
                            <span className="font-bold text-lg">
                                {currencyCode || 'CAD'} {formData.packageAmount.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
                            {error}
                        </div>
                    )}

                    {clientSecret && (
                        <Elements options={options} stripe={stripePromise}>
                            <CheckoutForm
                                clientSecret={clientSecret}
                                onSuccess={onSuccess}
                                onError={(error) => {
                                    setError(error);
                                    onError(error);
                                }}
                                onBack={onBack}
                                t={t}
                            />
                        </Elements>
                    )}

                    {!clientSecret && (
                        <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded mb-4">
                            {t.noClientSecret || 'Payment initialization required. Please try again.'}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Custom hook for managing the payment modal
export const useStripePaymentModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return {
        isOpen,
        openModal,
        closeModal,
    };
};

export default StripePaymentMemorial;