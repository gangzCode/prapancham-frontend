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
import toast from "react-hot-toast";
import { useLanguage } from "@/components/ui/LanguageProvider";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { language } = useLanguage();



  type LanguageKey = 'en' | 'ta' | 'si';
  const translations: Record<LanguageKey, { [key: string]: string }> = {
    en: {
      news: "News",
      politics: "Politics",
      business: "Business",
      technology: "Technology",
      sports: "Sports",
      entertainment: "Entertainment",
      health: "Health",
      quickLink: "Quick Link",
      privacyPolicy: "Privacy Policy",
      termsConditions: "Terms & Conditions",
      editorialPolicy: "Editorial Policy",
      rssFeeds: "RSS Feeds",
      stayTuned: "Stay Tuned",
      subscribe: "Subscribe",
      subscribing: "Subscribing...",
      placeholder: "Email",
      address: "Address",
      email: "Email",
      phone: "Phone",
      newsNav: "News",
      obituary: "Obituary",
      aboutUs: "About Us",
      contactUs: "Contact Us",
      subscribeSuccess: "Subscribed successfully!",
      subscribeFail: "Subscription failed.",
      copyright: "© 2025 Prapancham. All rights reserved.",
    },
    ta: {
      news: "செய்திகள்",
      politics: "அரசியல்",
      business: "வணிகம்",
      technology: "தொழில்நுட்பம்",
      sports: "விளையாட்டு",
      entertainment: "வினோதம்",
      health: "ஆரோக்கியம்",
      quickLink: "விரைவு இணைப்புகள்",
      privacyPolicy: "தனியுரிமைக் கொள்கை",
      termsConditions: "விதிமுறைகள் மற்றும் நிபந்தனைகள்",
      editorialPolicy: "தொகுப்புப் கொள்கை",
      rssFeeds: "RSS ஊட்டங்கள்",
      stayTuned: "தொடர்பில் இருங்கள்",
      subscribe: "சந்தா எடுக்கவும்",
      subscribing: "சந்தா எடுக்கப்படுகிறது...",
      placeholder: "மின்னஞ்சல்",
      address: "முகவரி",
      email: "மின்னஞ்சல்",
      phone: "தொலைபேசி",
      newsNav: "செய்திகள்",
      obituary: "மரண அறிவிப்பு செய்தி",
      aboutUs: "எங்களை பற்றி",
      contactUs: "தொடர்பு கொள்ள",
      subscribeSuccess: "சந்தா எடுக்கப்பட்டது!",
      subscribeFail: "சந்தா செய்ய முடியவில்லை.",
      copyright: "© 2025 ப்ரபஞ்சம். எல்லா உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    },
    si: {
      news: "ප්‍රවෘත්ති",
      politics: "දේශපාලනය",
      business: "ව්‍යාපාරය",
      technology: "තාක්‍ෂණය",
      sports: "ක්‍රීඩා",
      entertainment: "විනෝදාංශය",
      health: "සෞඛ්‍යය",
      quickLink: "ඉක්මන් සබැඳි",
      privacyPolicy: "පෞද්ගලිකත්ව ප්‍රතිපත්තිය",
      termsConditions: "නියමයන් සහ කොන්දේසි",
      editorialPolicy: "සංස්කරණ ප්‍රතිපත්තිය",
      rssFeeds: "RSS පෝෂණය",
      stayTuned: "සම්බන්ධව සිටින්න",
      subscribe: "දායක වන්න",
      subscribing: "දායක වෙමින්...",
      placeholder: "ඊ-තැපැල්",
      address: "ලිපිනය",
      email: "ඊ-තැපැල්",
      phone: "දුරකථනය",
      newsNav: "ප්‍රවෘත්ති",
      obituary: "නිවන් සන්සුන්",
      aboutUs: "අපි ගැන",
      contactUs: "අපව අමතන්න",
      subscribeSuccess: "දායක වීම සාර්ථකයි!",
      subscribeFail: "දායක වීම අසාර්ථකයි.",
      copyright: "© 2025 ප්‍රපංචම්. සියලුම හිමිකම් ඇවිරිණි.",
    },
  };

  let langKey: LanguageKey;

  if (language === "tamil") langKey = "ta";
  else if (language === "sinhala") langKey = "si";
  else langKey = "en";

  const t = translations[langKey];

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
        toast.success(t.subscribeSuccess);
        setEmail("");
      } else {
        const data = await res.json();
        toast.error(data?.message || t.subscribeFail);
      }
    } catch (err) {
      toast.error(t.subscribeFail);
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
                // src="/images/prapancham-footer-logo.svg"
                src="/images/Prapancham-logo.png"
                alt="Prapancham"
                className="max-w-[64px] sm:max-w-none items-center justify-center rounded-md"
                width={64}
                height={64}
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
            <h3 className="font-bold text-lg mb-6">{t.news}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-[#6ec1e4] transition-colors">
                  {t.politics}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#6ec1e4] transition-colors">
                  {t.business}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#6ec1e4] transition-colors">
                  {t.technology}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#6ec1e4] transition-colors">
                  {t.sports}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#6ec1e4] transition-colors">
                  {t.entertainment}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#6ec1e4] transition-colors">
                  {t.health}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-bold text-lg mb-6">{t.quickLink}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-[#6ec1e4] transition-colors">
                  {t.privacyPolicy}
                </a>
              </li>
              <li>
                <a href="terms" className="hover:text-[#6ec1e4] transition-colors">
                  {t.termsConditions}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#6ec1e4] transition-colors">

                  {t.editorialPolicy}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#6ec1e4] transition-colors">
                  {t.rssFeeds}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-4xl font-playfair font-bold text-[#6ec1e4] mb-6">
              {t.stayTuned}
            </h2>
            <p className="text-sm mb-6">
              Lorem ipsum dolor sit amet consectetur. Tellus nisi
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 mb-8 w-full">
              <Input
                type="email"
                placeholder={t.placeholder}
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
                {loading ? t.subscribing : t.subscribe}
              </Button>
            </form>
            {success && <span className="text-green-400 ml-2">{success}</span>}
            {error && <span className="text-red-400 ml-2">{error}</span>}

            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="hover:text-[#6ec1e4] transition-colors">
                {t.newsNav}
              </a>
              <span className="text-gray-400">|</span>
              <a href="#" className="hover:text-[#6ec1e4] transition-colors">
                {t.obituary}
              </a>
              <span className="text-gray-400">|</span>
              <a href="#" className="hover:text-[#6ec1e4] transition-colors">
                {t.aboutUs}
              </a>
              <span className="text-gray-400">|</span>
              <a href="#" className="hover:text-[#6ec1e4] transition-colors">
                {t.contactUs}
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-[#6ec1e4]/30" />

        <div className="text-center text-sm text-gray-400">
          <p>{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
