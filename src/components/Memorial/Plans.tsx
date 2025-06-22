import React from 'react';
import { CheckCircle } from 'lucide-react';
interface PlansProps {
    planName: string;
    price: number;
    currency: string;
    language?: 'en' | 'ta' | 'si';
    features: string[];
    plan: any;
    isPremium: boolean;
    setActiveStep: (step: number) => void;
    setSelectedPlan: (plan: any) => void;

}

const Plans: React.FC<PlansProps> = ({
    planName,
    price,
    features,
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
