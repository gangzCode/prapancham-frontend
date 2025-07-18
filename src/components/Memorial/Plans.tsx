import React from 'react';
import { CheckCircle } from 'lucide-react';
interface PlansProps {
    planName: string;
    price: number;
    currency: string;
    language?: 'en' | 'ta' | 'si';
    features: string[];
    addons: string[];
    plan: any;
    isPremium: boolean;
    setActiveStep: (step: number) => void;
    setSelectedPlan: (plan: any) => void;

}

const Plans: React.FC<PlansProps> = ({
    planName,
    price,
    features,
    addons,
    isPremium,
    setActiveStep,
    currency,
    language,
    setSelectedPlan,
    plan
}) => {


    return (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2">
            <div className="bg-white rounded-lg shadow-xl p-6 relative">
                <div className={`bg-primary text-white text-center py-4 rounded-t-lg ${isPremium ? 'relative ' : ''}`}>
                    <h2 className="text-lg">{planName}</h2>
                    <p className="text-2xl font-bold">{currency} {price}</p>

                    {isPremium && (
                        <div className="absolute top-0 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-tl-lg">
                            {language === 'ta'
                                ? 'பிரீமியம்'
                                : language === 'si'
                                    ? 'ප්‍රිමියම්'
                                    : 'Premium'}
                        </div>
                    )}
                </div>


                <hr className="my-4" />
                <ul className="text-gray-700 mb-6">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center justify-center mb-2">
                            <CheckCircle className="text-teal-800 mr-2 h-3 w-3" />
                            {feature}
                        </li>
                    ))}
                </ul>

                {/* Display Available Addons */}
                {addons && addons.length > 0 && (
                    <>
                        <hr className="my-4" />
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-gray-800 mb-3 text-center">
                                {language === 'ta'
                                    ? 'கூடுதல் சேவைகள்'
                                    : language === 'si'
                                        ? 'අමතර සේවා'
                                        : 'Available Add-ons'}
                            </h3>
                            <ul className="text-gray-600 text-sm">
                                {addons.map((addon, index) => (
                                    <li key={index} className="flex items-center justify-center mb-2">
                                        <div className="w-2 h-2 bg-teal-600 rounded-full mr-2"></div>
                                        {addon}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
                <button
                    onClick={() => {
                        setActiveStep(2);
                        setSelectedPlan(plan);
                    }}
                    className={`w-full ${isPremium ? 'bg-primary text-white' : 'bg-white text-primary '} border border-primary py-2 rounded`}>
                    {language === 'ta'
                        ? 'தொடங்குங்கள்'
                        : language === 'si'
                            ? 'ආරම්භ කරන්න'
                            : 'Get Started'}
                </button>
            </div>
        </div>
    );
}

export default Plans;
