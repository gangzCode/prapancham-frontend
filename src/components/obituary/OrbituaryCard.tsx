"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Delete, Edit, Minus, Trash, Trash2 } from 'lucide-react';
import { useLanguage } from "@/components/ui/LanguageProvider";
import toast from "react-hot-toast";

type LanguageKey = "en" | "ta" | "si";

interface OrbituaryCardProps {
  orderId: string;
  condolencesCount: number;
  timeAgo: string;
  imageUrl: string;
  ceremonyTitle: string;
  eventName: string;
  date: string;
  postedDate: string;
  finalPrice?: {
    currencyCode: string;
    price: number;
  };
  donationReceived?: {
    price: number;
    currencyCode?: string; // Optional, default to CAD if not provided
  };
  onPostTribute?: () => void;
  onDonate?: () => void;
  onDelete?: () => void; // Callback to refresh the list after deletion
}

const OrbituaryCard: React.FC<OrbituaryCardProps> = ({
  orderId,
  condolencesCount,
  timeAgo,
  imageUrl,
  ceremonyTitle,
  eventName,
  date,
  postedDate,
  finalPrice,
  donationReceived = {
    price: 0,
    currencyCode: "CAD" // Default to CAD if no currency code
  },
  onPostTribute,
  onDonate,
  onDelete,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { language } = useLanguage();
  let langKey: LanguageKey = "en";
  if (language === "tamil") langKey = "ta";
  else if (language === "sinhala") langKey = "si";

  const translations: Record<LanguageKey, { [key: string]: string }> = {
    en: {
      condolences: "Condolences",
      donationReceived: "Donation received",
      postedDate: "Posted date",
      portrait: "Portrait",
      deleteConfirmTitle: "Delete Obituary",
      deleteConfirmMessage: "Are you sure you want to delete this obituary? This action cannot be undone.",
      cancel: "Cancel",
      delete: "Delete",
      deleting: "Deleting...",
      deleteSuccess: "Obituary deleted successfully",
      deleteError: "Failed to delete obituary",
      loginRequired: "Please log in to delete obituaries"
    },
    ta: {
      condolences: "இரங்கல்கள்",
      donationReceived: "நன்கொடை பெறப்பட்டது",
      postedDate: "இடுகை தேதி",
      portrait: "உருவப்படம்",
      deleteConfirmTitle: "இரங்கல் நீக்கு",
      deleteConfirmMessage: "இந்த இரங்கலை நீக்க விரும்புகிறீர்களா? இந்த செயலை மாற்ற முடியாது.",
      cancel: "ரத்துசெய்",
      delete: "நீக்கு",
      deleting: "நீக்குகிறது...",
      deleteSuccess: "இரங்கல் வெற்றிகரமாக நீக்கப்பட்டது",
      deleteError: "இரங்கலை நீக்க முடியவில்லை",
      loginRequired: "இரங்கல்களை நீக்க தயவுசெய்து உள்நுழையவும்"
    },
    si: {
      condolences: "අනුකම්පාව",
      donationReceived: "දානය ලැබුණි",
      postedDate: "පළ කළ දිනය",
      portrait: "ප්‍රතිමාව",
      deleteConfirmTitle: "මරණ දැන්වීම ඉවත් කරන්න",
      deleteConfirmMessage: "ඔබට මෙම මරණ දැන්වීම ඉවත් කිරීමට අවශ්‍යද? මෙම ක්‍රියාව අවලංගු කළ නොහැක.",
      cancel: "අවලංගු කරන්න",
      delete: "ඉවත් කරන්න",
      deleting: "ඉවත් කරමින්...",
      deleteSuccess: "මරණ දැන්වීම සාර්ථකව ඉවත් කරන ලදී",
      deleteError: "මරණ දැන්වීම ඉවත් කිරීමට අසමත්",
      loginRequired: "මරණ දැන්වීම් ඉවත් කිරීමට කරුණාකර පුරනය වන්න"
    }
  };

  const t = translations[langKey];

  // Function to get user data from localStorage
  const getUserFromStorage = () => {
    try {
      const userData = localStorage.getItem('user');
      const accessToken = localStorage.getItem('accessToken');
      
      if (userData && accessToken) {
        return {
          user: JSON.parse(userData),
          accessToken
        };
      }
      return null;
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return null;
    }
  };

  // Function to handle delete obituary
  const handleDeleteObituary = async () => {
    const userData = getUserFromStorage();
    
    if (!userData || !userData.user || !userData.accessToken) {
      toast.error(t.loginRequired);
      return;
    }

    setIsDeleting(true);
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/order/${userData.user._id}/${orderId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${userData.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        toast.success(t.deleteSuccess);
        setShowDeleteConfirm(false);
        // Call the onDelete callback to refresh the list
        if (onDelete) {
          onDelete();
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || t.deleteError);
      }
    } catch (error) {
      console.error('Error deleting obituary:', error);
      toast.error(t.deleteError);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };
  return (
    <>
      <div className="w-full bg-white shadow-md overflow-hidden p-2">
        <div className="flex justify-end w-full items-center border-b gap-2">
          <Trash2 
            className="w-4 h-4 mb-2 text-[#880002] cursor-pointer hover:text-red-700 transition-colors" 
            onClick={handleDeleteClick}
          />
        </div>

      <div className="flex">
        <div className="w-[40%] h-48 relative">
          <Image
            src={imageUrl || "/images/Prapancham-logo.png"}
            alt={t.portrait}
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </div>
        <div className="w-[60%] bg-black text-white p-4 flex flex-col justify-center items-end">
          <p className="text-sm">{ceremonyTitle}</p>
          <p className="text-sm">{eventName}</p>
          <p className="text-sm">{date}</p>
        </div>
      </div>

      <div className="flex flex-wrap md:justify-between pt-2 border-t gap-2 break-words whitespace-normal">
        <div className="text-left w-full md:w-auto">
          <p className="text font-bold text-gray-500">
            {condolencesCount}
          </p>
          <p className="text-sm text-gray-500">
            {t.condolences}
          </p>
        </div>
        <Minus className=" hidden md:block h-10 w-[1px] mt-1 bg-gray-300" />
        <div className="text-left w-full md:w-auto">
          <p className="text font-bold text-gray-500">
            {donationReceived.price.toFixed(2)} {donationReceived.currencyCode || "CAD"}
          </p>
          <p className="text-sm text-gray-500">
            {t.donationReceived}
          </p>
        </div>
        <Minus className=" hidden md:block h-10 w-[1px] mt-1 bg-gray-300" />
        <div className="text-left w-full md:w-auto">
          <p className="text font-bold text-gray-500">
            {postedDate}
          </p>
          <p className="text-sm text-gray-500">
            {t.postedDate}
          </p>
        </div>
      </div>

      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t.deleteConfirmTitle}
            </h3>
            <p className="text-gray-600 mb-6">
              {t.deleteConfirmMessage}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleDeleteObituary}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {t.deleting}
                  </>
                ) : (
                  t.delete
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrbituaryCard;
