import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentFormData {
    email: string;
    name: string;
    address: string;
    phoneNumber: string;
    countryId: string;
    donationAmount: number;
    orderId?: string;
}

interface PaymentFormProps {
    formData: PaymentFormData;
    onSuccess: () => void;
    onError: (error: string) => void;
    onBack: () => void;
    isAnonymous: boolean;
    currencyCode?: string;
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

// Main PaymentForm component
const PaymentForm: React.FC<PaymentFormProps> = ({
    formData,
    onSuccess,
    onError,
    onBack,
    isAnonymous,
    currencyCode,
    t
}) => {
    const [clientSecret, setClientSecret] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        createPaymentIntent();
    }, []);

    const createPaymentIntent = async () => {
        try {
            setIsLoading(true);
            setError('');

            const paymentData = {
                email: formData.email,
                name: isAnonymous ? '' : formData.name,
                address: isAnonymous ? '' : formData.address,
                phoneNumber: isAnonymous ? '' : formData.phoneNumber,
                countryId: formData.countryId,
                donationAmount: formData.donationAmount,
                orderId: formData.orderId || null,
            };

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/order/donation`,
                paymentData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.data.paymentIntentClientSecret) {
                setClientSecret(response.data.paymentIntentClientSecret);
            } else {
                throw new Error('No client secret received');
            }
        } catch (err: any) {
            const errorMessage = err.response?.data || err.message || 'Failed to initialize payment';
            setError(errorMessage);
            onError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

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

    if (isLoading) {
        return (
            <div className="max-h-[80vh] w-auto md:w-[40rem] lg:w-[60rem]">
                <div className="flex items-center justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0D1322]"></div>
                    <span className="ml-3">{t.processing || 'Processing...'}</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-h-[80vh] w-auto md:w-[40rem] lg:w-[60rem]">
                <div className="p-8">
                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
                        {error}
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={onBack}
                            className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6"
                        >
                            {t.back || 'Back'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-h-[80vh] w-auto md:w-[40rem] lg:w-[60rem]">
            <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">{t.completePayment || 'Complete Payment'}</h2>

                {/* Payment Summary */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="flex justify-between items-center">
                        <span className="font-medium">{t.donationAmount || 'Donation Amount'}:</span>
                        <span className="font-bold text-lg">
                            {currencyCode || 'CAD'} {formData.donationAmount.toFixed(2)}
                        </span>
                    </div>
                    {!isAnonymous && (
                        <div className="mt-2 text-sm text-gray-600">
                            <p>{t.donor || 'Donor'}: {formData.name}</p>
                            <p>{t.email || 'Email'}: {formData.email}</p>
                        </div>
                    )}
                </div>

                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm
                            clientSecret={clientSecret}
                            onSuccess={onSuccess}
                            onError={onError}
                            onBack={onBack}
                            t={t}
                        />
                    </Elements>
                )}
            </div>
        </div>
    );
};

export default PaymentForm;