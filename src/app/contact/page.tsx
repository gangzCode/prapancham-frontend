"use client"
import 'react-phone-input-2/lib/style.css';
import React, { useState, useEffect } from "react";
import PhoneInput from 'react-phone-input-2';
import { Metadata } from "next";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ContactSection from "@/components/contact/ContactSection";
import toast from "react-hot-toast";
import useSWR from 'swr';

// Define interfaces for ad types and advertisements
interface AdType {
  _id: string;
  imageSize: string;
  isDeleted: boolean;
  type: string;
  isActive: boolean;
  __v: number;
}

interface AdTypesResponse {
  adTypes: AdType[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}

interface AdCategory {
  name: {
    en: Array<{ name: string; value: string; _id: string }>;
    ta: Array<{ name: string; value: string; _id: string }>;
    si: Array<{ name: string; value: string; _id: string }>;
  };
  _id: string;
  isDeleted: boolean;
  isActive: boolean;
  __v: number;
}

interface Advertisement {
  _id: string;
  image: string;
  isDeleted: boolean;
  adPageName: string;
  isActive: boolean;
  expiryDate: string;
  uploadedDate: string;
  __v: number;
  adCategory: AdCategory;
  adType: AdType;
  link: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const countries = [
  "Sri Lanka",
  "India",
  "USA",
  "China",
  "Australia",
  "Canada",
  "UK",
];

const ContactPage: React.FC = () => {
  const phoneContacts = [
    "+94 77 002 33 23",
    "+94 77 002 33 24",
    "+94 77 002 33 25",
    "+94 77 002 33 26",
    "+94 77 002 33 27",
  ];

  const emailContacts = [
    "contact@prapancham.com",
    "support@prapancham.com",
    "info@prapancham.com",
    "help@prapancham.com",
    "admin@prapancham.com",
  ];

  const [activeCountry, setActiveCountry] = useState(countries[0]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Fetch ad types to get Full Width ad type ID
  const { data: adTypesData } = useSWR<AdTypesResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/advertistment/ad-type/active?page=1&limit=10`,
    fetcher
  );

  // Find Full Width ad type ID
  const fullWidthAdType = adTypesData?.adTypes?.find(type => type.type === 'Full Width');
  const fullWidthAdTypeId = fullWidthAdType?._id;

  // Fetch Full Width ads for contact page
  const { data: contactAds } = useSWR<Advertisement[]>(
    fullWidthAdTypeId
      ? `${process.env.NEXT_PUBLIC_API_URL}/advertistment/by-ad-type-ad-page?adType=${fullWidthAdTypeId}&adPageName=contact`
      : null,
    fetcher
  );

  const validate = () => {
    const newErrors: any = {};
    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!email) newErrors.email = "Email is required";
    if (!phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!activeCountry) newErrors.country = "Country is required";
    if (!description) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact-us`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber: `+${phoneNumber}`,
          country: activeCountry,
          description,
        }),
      });
      if (res.ok) {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setDescription("");
        setSuccess(true);
        setErrors({});
        toast.success("Submitted successfully!");
      } else {
        const data = await res.json();
        setErrors({ api: data.message || "Failed to submit" });
        toast.error(data.message || "Failed to submit");
      }
    } catch (err) {
      setErrors({ api: "Failed to submit" });
      toast.error("Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "94770023323";
    const message = encodeURIComponent("Hi! I'm interested in advertising on your platform. Could you please provide more information?");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <div className="w-full h-[280px] px-4 sm:px-8 md:px-16 lg:px-16 py-4 md:py-6 relative">
          <img
            src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
            alt="Contact Us"
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 md:px-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-poppins font-bold mb-2 md:mb-4 text-center">
              Get In Touch With Us
            </h1>
            <p className="text-center text-sm sm:text-base md:text-lg max-w-xl md:max-w-2xl lg:max-w-3xl">
              
            </p>
          </div>
        </div>
      </div>

      {/* <CountryMenu
        countries={countries}
        activeCountry={activeCountry}
        setActiveCountry={setActiveCountry}
      /> */}

      {/* Quick Contact Form Section */}
      <div className="py-6 bg-white px-4 lg:px-16 sm:py-8 md:py-10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left side - Form */}
            <div className="md:col-span-2 ">
              <div className="text-center mb-4">
                <p className="text-[#880002] text-body-base">
                  Disclaimer about the country selection
                </p>
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <Input
                    placeholder="First Name"
                    className="w-full placeholder:text-body-sm px-6 py-4 h-[48px]"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                  />
                  {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName}</span>}
                </div>
                <div>
                  <Input
                    placeholder="Last Name"
                    className="w-full placeholder:text-body-sm px-6 py-4 h-[48px]"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                  />
                  {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName}</span>}
                </div>
                <div>
                  <Input
                    placeholder="Email"
                    type="email"
                    className="w-full placeholder:text-body-sm px-6 py-4 h-[48px]"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                </div>
                <div>
                  <PhoneInput
                    country={'lk'}
                    placeholder="Phone Number"
                    containerClass="phone-input"
                    inputClass="form-control"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                  />
                  {errors.phoneNumber && <span className="text-red-500 text-xs">{errors.phoneNumber}</span>}
                </div>
                <div>
                  <Textarea
                    placeholder="Description"
                    className="w-full placeholder:text-body-sm"
                    rows={5}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                  {errors.description && <span className="text-red-500 text-xs">{errors.description}</span>}
                </div>
                {errors.api && <div className="text-red-500 text-xs text-center">{errors.api}</div>}
                {success && <div className="text-green-600 text-xs text-center">Submitted successfully!</div>}
                <div className="pt-2 flex justify-center">
                  <Button className="w-64 bg-primary hover:bg-[#00506f] text-white font-bold text-sm" type="submit" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </form>

              <div className="mt-8  h-[260px] w-full rounded flex items-center justify-center border border-black">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153162.457570069!2d-125.0!3d37.09024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d2f3b7bc742d77%3A0xc02a9463c47629fc!2sUnited%20States!5e0!3m2!1sen!2sus!4v1617815733460!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  className="p-2 "
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Right side - Contact details */}
            <div className="flex flex-col items-center md:border-l md:border-gray-300 md:pl-8">
              <ContactSection
                title="For More Details Contact Us"
                contacts={phoneContacts}
                containerClassName="w-full"
                titleClassName="text-center"
                buttonClassName="text-sm font-medium"
              />
              <div className="mt-8 w-full">
                <ContactSection
                  title="E mail addressess"
                  contacts={emailContacts}
                  containerClassName="w-full"
                  titleClassName="text-center"
                  buttonClassName="text-sm font-medium"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Advertisement Section */}
      <div className="px-4 md:px-8 lg:px-16 mb-4">
        {contactAds && contactAds.length > 0 ? (
          <a href={contactAds[0].link} target="_blank" rel="noopener noreferrer">
            <img
              src={contactAds[0].image || "/images/Prapancham-logo.png"}
              alt="Advertisement"
              className="w-full max-h-[232px] object-cover"
            />
          </a>
        ) : (
          <div
            className="mb-2 overflow-hidden cursor-pointer"
            onClick={handleWhatsAppClick}
          >
            <div className="w-full md:max-h-[232px] max-h-[116px] relative bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center hover:from-teal-700 hover:to-teal-900 transition-colors">
              <div className="text-center text-white p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-4">
                  Want to Advertise Here?
                </h3>
                <p className="text-sm md:text-base mb-4 opacity-90">
                  Contact us to post your advertisements and reach thousands of viewers
                </p>
                <div className="space-y-2">
                  <p className="text-sm md:text-base font-medium flex items-center justify-center gap-2">
                    <span className="text-green-300">💬</span>
                    +94 77 002 33 23
                  </p>
                  <p className="text-xs md:text-sm opacity-80">
                    Click to message us on WhatsApp!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
