import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news-letters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSuccess("Subscribed successfully!");
        setEmail("");
      } else {
        const data = await res.json();
        setError(data?.message || "Subscription failed.");
      }
    } catch (err) {
      setError("Subscription failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto py-12 px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-3">
            <div className="mb-12">
              <Image
                src="/images/prapancham-footer-logo.svg"
                alt="Prapancham"
                className="h-16 w-auto drop-shadow-lg"
                width={367}
                height={76}
                priority
              />
            </div>

            <div className="flex gap-4 mb-8">
              <a
                href="#"
                className="bg-[#3b5998] rounded-full p-2.5 hover:opacity-80 transition-opacity"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="bg-black rounded-full p-2.5 hover:opacity-80 transition-opacity"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="bg-[#e1306c] rounded-full p-2.5 hover:opacity-80 transition-opacity"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="bg-[#ff0000] rounded-full p-2.5 hover:opacity-80 transition-opacity"
              >
                <Youtube size={18} />
              </a>
            </div>

            <div className="space-y-5 text-sm">
              <div className="flex items-center gap-3">
                <MapPin size={18} />
                <span>Address</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} />
                <a
                  href="mailto:prapancham@gmail.com"
                  className="hover:text-[#6ec1e4] transition-colors"
                >
                  prapancham@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} />
                <a
                  href="tel:+94772314434"
                  className="hover:text-[#6ec1e4] transition-colors"
                >
                  +94 77 231 4434
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-bold text-lg mb-6">News</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-[#6ec1e4] transition-colors">
                  Politics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#6ec1e4] transition-colors">
                  Business
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#6ec1e4] transition-colors">
                  Technology
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#6ec1e4] transition-colors">
                  Sports
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#6ec1e4] transition-colors">
                  Entertainment
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#6ec1e4] transition-colors">
                  Health
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-bold text-lg mb-6">Quick Link</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-[#6ec1e4] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="terms" className="hover:text-[#6ec1e4] transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#6ec1e4] transition-colors">
                  Editorial Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#6ec1e4] transition-colors">
                  RSS Feeds
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-4xl font-playfair font-bold text-[#6ec1e4] mb-6">
              Stay Tuned
            </h2>
            <p className="text-sm mb-6">
              Lorem ipsum dolor sit amet consectetur. Tellus nisi
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 mb-8 w-full">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="bg-transparent border-[#6ec1e4] text-white placeholder:text-gray-400 flex-1"
                required
              />
              <Button
                className="bg-[#6ec1e4] hover:bg-[#5db1d4] text-white"
                type="submit"
                disabled={loading}
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            {success && <span className="text-green-400 ml-2">{success}</span>}
            {error && <span className="text-red-400 ml-2">{error}</span>}

            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="hover:text-[#6ec1e4] transition-colors">
                News
              </a>
              <span className="text-gray-400">|</span>
              <a href="#" className="hover:text-[#6ec1e4] transition-colors">
                Obituary
              </a>
              <span className="text-gray-400">|</span>
              <a href="#" className="hover:text-[#6ec1e4] transition-colors">
                About Us
              </a>
              <span className="text-gray-400">|</span>
              <a href="#" className="hover:text-[#6ec1e4] transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-[#6ec1e4]/30" />

        <div className="text-center text-sm text-gray-400">
          <p>© 2025 Prapancham. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
