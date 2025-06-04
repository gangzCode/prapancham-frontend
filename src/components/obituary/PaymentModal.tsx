import React from "react";
import Image from "next/image";

type PaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onPay: () => void;
};

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onPay }) => {
  if (!isOpen) return null;

  return (
    <div className="bg-white shadow-lg p-2 md:p-6 w-full mx-auto mt-6 md:mt-16">
      {/* Payment Options */}
      <div className="flex space-x-4 mb-6 flex-wrap justify-center">
        <div className="flex-1 w-40 p-4 border-2 border-gray-300 rounded-lg flex flex-col items-start justify-center mb-4 sm:mb-0">
          <svg
            className="w-4 h-4"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 2H0V5H16V2Z" fill="#030708" />
            <path d="M16 7H0V14H16V7Z" fill="#030708" />
          </svg>
          <span>Card</span>
        </div>
        <div className="flex-1 w-40 p-4 border-2 border-gray-300 rounded-lg flex flex-col items-start justify-center mb-4 sm:mb-0">
          <Image
            alt="EPS logo"
            className="mr-2"
            height={20}
            width={20}
            src="/icons/eps.jpg"
          />
          <span>EPS</span>
        </div>
        <div className="flex-1 w-40 p-4 border-2 border-gray-300 rounded-lg flex flex-col items-start justify-center mb-4 sm:mb-0">
          <Image
            alt="Giropay logo"
            className="mr-2"
            height={20}
            width={20}
            src="/icons/giropay.png"
          />
          <span>Giropay</span>
        </div>
        <div className="flex-1 p-4 border-2 border-gray-300 rounded-lg flex items-start justify-center mb-4 sm:mb-0">
          <i className="fas fa-ellipsis-h text-xl"></i>
        </div>
      </div>

      {/* Card Details */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Account Number</label>
        <div className="relative">
          <input
            className="w-full p-3 border-2 border-gray-300 rounded-lg"
            placeholder="1234 1234 1234 1234"
            type="text"
          />
          <div className="hidden md:flex absolute inset-y-0 right-0 items-center pr-3">
            <Image alt="Visa" height={30} width={30} src="/icons/visa.svg" className="mr-1" />
            <Image alt="MasterCard" height={30} width={30} src="/icons/master.svg" className="mr-1" />
            <Image alt="Amex" height={30} width={30} src="/icons/amex.svg" className="mr-1" />
            <Image alt="Discover" height={30} width={30} src="/icons/discover.svg" className="mr-1" />
          </div>
        </div>
      </div>

      {/* Expiry + CVC */}
      <div className="flex space-x-4 mb-4 flex-wrap">
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-2">Expiry</label>
          <input
            className="w-full p-3 border-2 border-gray-300 rounded-lg"
            placeholder="MM / YY"
            type="text"
          />
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-2">CVC</label>
          <input
            className="w-full p-3 border-2 border-gray-300 rounded-lg"
            placeholder="CVC"
            type="text"
          />
        </div>
      </div>

      {/* Country + Postal Code */}
      <div className="flex space-x-4 mb-4 flex-wrap">
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-2">Country</label>
          <select className="w-full p-3 border-2 border-gray-300 rounded-lg">
            <option>United States</option>
            <option>Sri Lanka</option>
            <option>India</option>
            <option>Germany</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-2">Postal Code</label>
          <input
            className="w-full p-3 border-2 border-gray-300 rounded-lg"
            placeholder="90210"
            type="text"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between w-full mt-8">
        <button
          className="px-4 py-3 text-[#0D1322] rounded border border-teal-900"
          onClick={onClose}
        >
          Back
        </button>
        <button
          className="px-5 bg-primary text-white p-3 rounded font-semibold"
          onClick={(e) => {
            e.preventDefault();
            onPay();
          }}
        >
          Pay
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
