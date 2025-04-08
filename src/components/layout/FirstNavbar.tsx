"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignupModal from "../siginin/SignupModal ";
const navItems = [
  { id: "news", label: "News", href: "/news" },
  { id: "obituary", label: "Obituary", href: "/obituary" },
  { id: "about", label: "About Us", href: "/about" },
  { id: "contact", label: "Contact Us", href: "/contact" },
];

const FirstNavbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const [selectedMenu, setSelectedMenu] = useState("");
  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean);
    if (pathSegments.length > 0) {
      setSelectedMenu(
        pathSegments[0]
      );
      if (pathSegments[0] == 'news-individual') {
        setSelectedMenu('news');
      }

    } else {
      setSelectedMenu("");
    }
  }, [pathname]);

  return (
    <header
      className="flex flex-wrap gap-4 sm:gap-6 md:gap-10 justify-between items-center px-4 md:px-8 lg:px-16    mt-4 sm:mt-6 w-full text-sm sm:text-base">
      <h1 className="w-full sm:w-auto sm:min-w-[200px] md:min-w-[292px] order-1 flex items-center justify-center sm:justify-start ">
        <Image
          src="/images/prapancham-logo.svg"
          alt="Prapancham Logo"
          width={292}
          height={56}
          priority
          className="max-w-[200px] sm:max-w-none"
        />
        <span className={`px-1 -mt-2 text-xs text-white bg-[#F65050] ${selectedMenu === "news" ? "block" : selectedMenu === "news-individual" ? "block" : "hidden"}`}>
          News
        </span>
        <span className={`px-1 -mt-2 text-xs text-white bg-black ${selectedMenu === "obituary" ? "block" : selectedMenu === "news-individual" ? "block" : "hidden"}`}>
          Samaathi
        </span>
      </h1>

      <nav className="w-full sm:w-auto flex flex-wrap sm:flex-nowrap gap-2 sm:gap-1 justify-center items-center text-center text-link order-3 mt-4 sm:mt-0">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`flex justify-center items-center rounded-md transition-all   hover:scale-110 font-poppins
              ${selectedMenu === item.id ? "bg-primary text-white" : " hover:text-link-hover"}
              `}
          >
            <span className="px-3 sm:px-4 py-2 sm:py-1">{item.label}</span>
          </Link>
        ))}
        <button
          onClick={() => setIsModalOpen(true)}
          className="border border-primary text-primary  md:ml-8 px-4 py-2 rounded"
        >
          Sign in / Sign up
        </button>
        <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </nav>
    </header>
  );
};

export default FirstNavbar;
