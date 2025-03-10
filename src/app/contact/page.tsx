import React from "react";
import { Metadata } from "next";
import CountryMenu from "@/components/contact/CountryMenu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ContactSection from "@/components/contact/ContactSection";
import AdvertisementBanner from "@/components/advertisement/AdvertisementBanner";
import HorizontalAdBanner from "@/components/news-category/HorizontalAdBanner";

export const metadata: Metadata = {
  title: "Contact Us - Prapancham News",
  description: "Contact Prapancham News for inquiries, feedback, or support.",
};

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

  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <div className="w-full h-[280px] px-4 sm:px-8 md:px-16 lg:px-32 py-4 md:py-6 relative">
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
              Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus
              ac hendrerit nisi convallis Lorem ipsum dolor sit amet
              consectetur. Tellus nisi risus tellus ac hendrerit.
            </p>
          </div>
        </div>
      </div>

      <CountryMenu countries={countries} />

      {/* Quick Contact Form Section */}
      <div className="py-6 bg-white px-4 lg:px-32 sm:py-8 md:py-10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left side - Form */}
            <div className="md:col-span-2">
              <div className="text-center mb-4">
                <p className="text-[#1A1D1F] text-body-base">
                  Disclaimer about the country selection
                </p>
              </div>
              <form className="space-y-4">
                <Input
                  placeholder="First Name"
                  className="w-full placeholder:text-body-sm px-6 py-4 h-[48px]"
                />
                <Input
                  placeholder="Last Name"
                  className="w-full placeholder:text-body-sm px-6 py-4 h-[48px]"
                />
                <Input
                  placeholder="Email"
                  type="email"
                  className="w-full placeholder:text-body-sm px-6 py-4 h-[48px]"
                />
                <Textarea
                  placeholder="Description"
                  className="w-full placeholder:text-body-sm"
                  rows={5}
                />

                <div className="pt-2">
                  <Button className="w-full bg-primary hover:bg-[#00506f] text-white font-bold text-sm">
                    Submit
                  </Button>
                </div>
              </form>

              <div className="mt-8 bg-gray-200 h-[280px] w-full rounded flex items-center justify-center">
                <span className="text-gray-500">Advertisement Space</span>
              </div>
            </div>

            {/* Right side - Contact details */}
            <div className="flex flex-col items-center">
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

      {/* Horizontal advertisement Section */}
      <HorizontalAdBanner
        image="/images/top-ad-2.png"
        className="mx-auto  px-32 max-md:px-5 h-[143px]"
      />
    </div>
  );
};

export default ContactPage;
