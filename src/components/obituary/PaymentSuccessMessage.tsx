// Success Component
const PaymentSuccessMessage: React.FC<{ onClose: () => void; t: any; donationAmount?: number; currencyCode?: string; donorName?: string; isAnonymous?: boolean }> = ({
    onClose,
    t,
    donationAmount,
    currencyCode,
    donorName,
    isAnonymous
}) => (
    <div className="max-h-[80vh] w-auto md:w-[40rem] lg:w-[60rem] text-center">
        {/* Success Animation Container */}
        <div className="relative mb-8">
            {/* Animated Background Circle */}
            <div className="mx-auto w-32 h-32 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center relative overflow-hidden">
                {/* Pulse Animation */}
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
                <div className="absolute inset-2 bg-green-400 rounded-full animate-pulse opacity-30"></div>

                {/* Success Icon */}
                <div className="relative z-10 text-green-600 text-5xl font-bold animate-bounce">
                    ✓
                </div>
            </div>
        </div>

        {/* Success Title */}
        <div className="mb-6">
            <h2 className="text-3xl font-bold text-green-700 mb-2">
                {t.paymentSuccessful || "Payment Successful!"}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto rounded-full"></div>
        </div>

        {/* Success Details Card */}
        <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl p-6 mb-6 shadow-sm">
            <div className="space-y-4">
                {/* Thank You Message */}
                <p className="text-gray-700 text-lg leading-relaxed">
                    {t.thankYouDonation || "Thank you for your generous donation. Your contribution will make a meaningful difference."}
                </p>

                {/* Donation Details */}
                {donationAmount && currencyCode && (
                    <div className="bg-white rounded-lg p-4 border border-green-100">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                            <span className="text-xl font-semibold text-green-700">
                                {currencyCode} {donationAmount.toFixed(2)}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600">
                            {isAnonymous
                                ? (t.anonymousDonation || "Anonymous donation")
                                : donorName
                                    ? `${t.donatedBy || "Donated by"} ${donorName}`
                                    : (t.donation || "Donation")
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    </div>
);

export default PaymentSuccessMessage;