"use client";
import Image from 'next/image';
import { Minus, CirclePlus, Camera } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Upload, Trash2 } from 'lucide-react';
import { TitleWithUnderline } from '@/components/ui/title-with-underline';
import OrbituaryCard from '@/components/obituary/OrbituaryCard';
import UserObituaries from '@/components/obituary/UserObituaries';
import UserRemembrances from '@/components/obituary/UserRemembrances';
import SignupModal from "../../components/siginin/SignupModal ";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useLanguage } from "@/components/ui/LanguageProvider";

type LanguageKey = "en" | "ta" | "si";

const Events: React.FC = () => {
    const [activeTab, setActiveTab] = useState("General");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const translations: Record<LanguageKey, { [key: string]: string }> = {
        en: {
            general: "General",
            obituary: "Obituary",
            remembrance: "Remembrance",
            advertisement: "Advertisement",
            logOut: "Log Out",
            uploadImage: "Upload Image",
            remove: "Remove",
            name: "Name",
            emailId: "E-mail ID",
            country: "Country",
            phone: "Phone",
            address: "Address",
            saveChanges: "Save Changes",
            saving: "Saving...",
            selectCountry: "Select Country",
            unitedStates: "United States",
            noAdvertisements: "No advertisements posted!",
            contactAdminPart1: "Contact",
            administration: "administration",
            contactAdminPart2: "to post your advertisements",
            userNotFound: "User not found. Please log in again.",
            profileUpdateSuccess: "Profile updated successfully!",
            profileUpdateFailed: "Failed to update profile.",
        },
        ta: {
            general: "பொதுவானது",
            obituary: "மரண அறிவித்தல்",
            remembrance: "நினைவுச்சின்னம்",
            advertisement: "விளம்பரம்",
            logOut: "வெளியேறு",
            uploadImage: "படம் பதிவேற்றவும்",
            remove: "அகற்று",
            name: "பெயர்",
            emailId: "மின்னஞ்சல் முகவரி",
            country: "நாடு",
            phone: "தொலைபேசி",
            address: "முகவரி",
            saveChanges: "மாற்றங்களை சேமிக்கவும்",
            saving: "சேமிக்கிறது...",
            selectCountry: "நாட்டை தேர்ந்தெடுக்கவும்",
            unitedStates: "அமெரிக்கா",
            noAdvertisements: "விளம்பரங்கள் இடப்படவில்லை!",
            contactAdminPart1: "உங்கள் விளம்பரங்களை இடுவதற்கு",
            administration: "நிர்வாகத்தை",
            contactAdminPart2: "தொடர்பு கொள்ளவும்",
            userNotFound: "பயனர் கண்டுபிடிக்கப்படவில்லை. தயவுசெய்து மீண்டும் உள்நுழையவும்.",
            profileUpdateSuccess: "சுயவிவரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது!",
            profileUpdateFailed: "சுயவிவரம் புதுப்பிக்க முடியவில்லை.",
        },
        si: {
            general: "සාමාන්‍ය",
            obituary: "මරණ දැනුම්දීම",
            remembrance: "අනුස්මරණය",
            advertisement: "වෙළඳ දැන්වීම",
            logOut: "ඉවත් වන්න",
            uploadImage: "පින්තූරය උඩුගත කරන්න",
            remove: "ඉවත් කරන්න",
            name: "නම",
            emailId: "විද්‍යුත් තැපැල් ලිපිනය",
            country: "රට",
            phone: "දුරකථනය",
            address: "ලිපිනය",
            saveChanges: "වෙනස්කම් සුරකින්න",
            saving: "සුරකිමින්...",
            selectCountry: "රට තෝරන්න",
            unitedStates: "එක්සත් ජනපදය",
            noAdvertisements: "වෙළඳ දැන්වීම් පළ කර නැත!",
            contactAdminPart1: "ඔබේ වෙළඳ දැන්වීම් පළ කිරීමට",
            administration: "පරිපාලනය",
            contactAdminPart2: "සම්බන්ධ කරගන්න",
            userNotFound: "පරිශීලකයා සොයා ගත නොහැක. කරුණාකර නැවත පිවිසෙන්න.",
            profileUpdateSuccess: "පැතිකඩ සාර්ථකව යාවත්කාලීන කරන ලදී!",
            profileUpdateFailed: "පැතිකඩ යාවත්කාලීන කිරීමට අසමත් විය.",
        }
    }

    const { language } = useLanguage();
    let langKey: LanguageKey = "en";
    if (language === "tamil") langKey = "ta";
    else if (language === "sinhala") langKey = "si";

    const t = translations[langKey];

    const [profile, setProfile] = useState({
        username: '',
        email: '',
        phone: '',
        country: '',
        address: '',
        image: '',
        imageFile: null as File | null,
    });

    useEffect(() => {
        const checkAuth = () => {
            const user = localStorage.getItem("user");
            if (user) {
                try {
                    const token = localStorage.getItem("accessToken");
                    if (token) {
                        const decodedToken = JSON.parse(atob(token.split(".")[1]));
                        const currentTime = Math.floor(Date.now() / 1000);
                        if (decodedToken.exp && decodedToken.exp > currentTime) {
                            setIsModalOpen(false);
                            return;
                        }
                    }
                } catch (error) { }
            }
            setIsModalOpen(true);
        };
        checkAuth();
    }, [isModalOpen]);

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            const user = JSON.parse(userStr);
            setProfile((prev) => ({
                ...prev,
                username: user.username || '',
                email: user.email || '',
                phone: user.phone || '',
                country: user.country || '',
                address: user.address || '',
                image: user.image || '',
            }));
        }
    }, [isModalOpen]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfile((prev) => ({
                    ...prev,
                    image: reader.result as string,
                    imageFile: file,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setProfile((prev) => ({
            ...prev,
            image: '',
            imageFile: null,
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const userStr = localStorage.getItem("user");
        if (!userStr) {
            setLoading(false);
            toast.error(t.userNotFound);
            return;
        }
        const user = JSON.parse(userStr);

        const formData = new FormData();
        formData.append('username', profile.username);
        formData.append('phone', profile.phone);
        formData.append('country', profile.country);
        formData.append('address', profile.address);
        if (profile.imageFile) {
            formData.append('image', profile.imageFile);
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/update/${user._id}`, {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
                },
            });

            if (response.ok) {
                const updatedUser = await response.json();
                localStorage.setItem('user', JSON.stringify(updatedUser));
                toast.success(t.profileUpdateSuccess);
            } else {
                const data = await response.json();
                toast.error(data?.message || t.profileUpdateFailed);
            }
        } catch (err) {
            toast.error(t.profileUpdateFailed);
        }
        setLoading(false);
    };
    const handleClose = () => {
        const user = localStorage.getItem("user");
        let isAuthValid = false;
        if (user) {
            try {
                const token = localStorage.getItem("accessToken");
                if (token) {
                    const decodedToken = JSON.parse(atob(token.split(".")[1]));
                    const currentTime = Math.floor(Date.now() / 1000);
                    if (decodedToken.exp && decodedToken.exp > currentTime) {
                        isAuthValid = true;
                    }
                }
            } catch (error) { }
        }
        if (!isAuthValid && typeof window !== "undefined") {
            window.history.back();
        } else {
            setIsModalOpen(false);
        }
    };

    const tabs = ["General", "Obituary", "Remembrance", "Advertisement"];

    // Create localized tabs mapping
    const getLocalizedTabText = (tab: string) => {
        switch (tab) {
            case "General":
                return t.general;
            case "Obituary":
                return t.obituary;
            case "Remembrance":
                return t.remembrance;
            case "Advertisement":
                return t.advertisement;
            default:
                return tab;
        }
    };

    if (!isModalOpen) {
        return (
            <section className="flex flex-col justify-center px-4 md:px-8 lg:px-16 py-6 max-md:px-5">
                <div className="shadow rounded">
                    <div className="container mx-auto px-4 shadow border border-gray-300 bg-white rounded-lg">
                        <div className="flex flex-col md:flex-row md:justify-between items-center p-4 md:px-6 gap-4 md:gap-0">
                            <div className="w-full overflow-x-auto">
                                <div className="flex items-center space-x-4 whitespace-nowrap">
                                    {tabs.map((tab, index) => (
                                        <React.Fragment key={tab}>
                                            <a
                                                href="#"
                                                onClick={() => setActiveTab(tab)}
                                                className={`${activeTab === tab ? "text-[#1D94C5] font-bold" : ""
                                                    } transition-colors duration-200`}
                                            >
                                                {getLocalizedTabText(tab)}
                                            </a>
                                            {index < tabs.length - 1 && (
                                                <Minus className=" h-4 w-[1px] mt-1 bg-black" />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>


                            <div className="md:flex justify-end hidden ">
                                <button
                                    className="border border-primary text-primary px-4 py-2 rounded shrink-0"
                                    onClick={() => {
                                        localStorage.removeItem("accessToken");
                                        localStorage.removeItem("user");
                                        window.location.href = "/";
                                    }}
                                >
                                    {t.logOut}
                                </button>
                            </div>
                        </div>
                    </div>
                    {activeTab === 'General' &&
                        <div>
                            <div className="bg-gray-50 p-6 my-10 rounded shadow">
                                <div className="flex flex-row items-center gap-6 md:mx-4">
                                    <div className="relative">
                                        {profile.image ? (
                                            <Image
                                                src={profile.image || "/images/Prapancham-logo.png"}
                                                alt="Profile"
                                                width={100}
                                                height={100}
                                                className="w-24 h-24 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                                                <Camera className="w-10 h-10 text-gray-400" />
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={handleImageChange}
                                            title={t.uploadImage}
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        <button
                                            type="button"
                                            className="border border-primary text-primary px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-50"
                                            onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
                                        >
                                            <Upload className="w-4 h-4" />
                                            <span>{t.uploadImage}</span>
                                        </button>
                                        <button
                                            type="button"
                                            className="border border-[#880002] text-[#880002] px-4 py-2 rounded flex items-center gap-2 hover:bg-red-50"
                                            onClick={handleRemoveImage}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            <span>{t.remove}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <form className='px-8' onSubmit={handleSubmit}>
                                <div className="grid grid-col-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="username" className="block pb-2 ">
                                            {t.name}
                                        </label>
                                        <input
                                            type="text"
                                            id="username"
                                            value={profile.username}
                                            onChange={handleChange}
                                            className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block pb-2">
                                            {t.emailId}
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={profile.email}
                                            readOnly
                                            className="w-full h-[3.5rem] px-3 py-2 border border-gray-400 rounded-lg "
                                        />
                                    </div>
                                    <div>
                                        <div className="flex-1">
                                            <label htmlFor="country" className="block pb-2 ">
                                                {t.country}
                                            </label>
                                            <div className="relative">
                                                <select
                                                    id="country"
                                                    value={profile.country}
                                                    onChange={handleChange}
                                                    className="w-full p-4 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                                >
                                                    <option value="">{t.selectCountry}</option>
                                                    <option value="United States">{t.unitedStates}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block pb-2 ">
                                            {t.phone}
                                        </label>
                                        <input
                                            type="text"
                                            id="phone"
                                            value={profile.phone}
                                            onChange={handleChange}
                                            className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="address" className="block pb-2 ">
                                            {t.address}
                                        </label>
                                        <input
                                            type="text"
                                            id="address"
                                            value={profile.address}
                                            onChange={handleChange}
                                            className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end mt-10 mb-4">
                                    <button
                                        type="submit"
                                        className="px-5 bg-primary text-white p-3 rounded font-semibold"
                                        disabled={loading} // Disable while loading
                                    >
                                        {loading ? t.saving : t.saveChanges}
                                    </button>
                                </div>
                            </form>
                        </div>
                    }
                    {activeTab === 'Obituary' &&
                        <div className='my-4 md:p-6'>
                            <div className="flex-shrink min-w-0 max-w-full pb-6">
                                <TitleWithUnderline text={t.obituary} underlineWidth={64} fontSize={3} />
                            </div>
                            <UserObituaries />
                        </div>
                    }
                    {activeTab === 'Remembrance' &&
                        <div className='my-4 md:p-6'>
                            <div className="flex-shrink min-w-0 max-w-full pb-6">
                                <TitleWithUnderline text={t.remembrance} underlineWidth={64} fontSize={3} />
                            </div>
                            <UserRemembrances />
                        </div>
                    }
                    {activeTab === 'Advertisement' &&
                        <div className='my-4 md:p-6'>
                            <div className="flex-shrink min-w-0 max-w-full pb-6">
                                <TitleWithUnderline text={t.advertisement} underlineWidth={64} fontSize={3} />
                            </div>
                            <div className="border-2 border-dashed border-gray-300 flex items-center justify-center p-4 min-h-48">
                                <div className="text-center">
                                    <p className="text-gray-900">{t.noAdvertisements}</p>
                                    <p className="text-gray-900">
                                        {t.contactAdminPart1} <span className='text-primary underline font-semibold'>{t.administration}</span> {t.contactAdminPart2}
                                    </p>
                                </div>
                            </div>

                        </div>
                    }
                </div>
            </section>
        );
    }
    return <SignupModal isOpen={isModalOpen} onClose={handleClose} />;
};

export default Events;
