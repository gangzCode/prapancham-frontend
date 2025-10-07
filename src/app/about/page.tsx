"use client";
import { TitleWithUnderline } from "@/components/ui/title-with-underline";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/components/ui/LanguageProvider";

const About = () => {
    type StatProps = {
        count: string;
        label: string;
    };
    const { language } = useLanguage();
    let langKey: LanguageKey;

    if (language === "tamil") langKey = "ta";
    else if (language === "sinhala") langKey = "si";
    else langKey = "en";
    type LanguageKey = 'en' | 'ta' | 'si';
   const translations: Record<LanguageKey, { [key: string]: string }> = {
  en: {
    label1: "Years of expertise",
    label2: "Daily Readers",
    label3: "Subscribers",
    label4: "Team Members",
    over: "Over",
    aboutTitle: "About",
    howWeWork: "How Do We Work?",
    offeringsTitle: "What Do We Offer?",
    obituaryTitle: "About Our Obituary",
    ourMission: "Our Mission",
    ourVision: "Our Vision",
    Subscribers: "Subscribers",
    aboutparagraph1:"Prapancham is more than just a non- profit— it’s a global mindset grounded in purpose, integrity, and innovation. Rooted in the ancient Sanskrit word for world or universe, Prapancham represents our vision to create meaningful impact across industries, communities, and cultures.",
    aboutparagraph2:"Prapancham is a purpose-driven charitable organization committed to supporting communities with empathy, dignity, and innovation. Rooted in the belief that compassion can be a catalyst for change, we aim to build a trustworthy and sustainable platform that responds to real-life needs—especially during life’s most vulnerable moments.",
    aboutparagraph3:"We focus on creating accessible and lasting impact by combining heartfelt support with smart technology, meaningful partnerships, and a deep understanding of our community's challenges.",
    howdowework1: "At Prapancham, we believe that every act of kindness counts, and every contribution can change a life. Our approach is:",
    howdowework2: "Community-Centered: We start by listening to the needs of the people we serve and co-creating solutions that reflect their realities.",
    howdowework3: "Collaborative: We work alongside local businesses, service providers, and volunteers to deliver personalized, impactful support.",
    howdowework4: "Tech-Enabled: Our easy-to-use web platform streamlines fundraising and community support, making help more accessible when it’s needed most.",
    howdowework5: "Transparent & Accountable: We prioritize trust, providing clear information, reliable processes, and consistent communication.",
    offerparagraph1: "Prapancham provides a range of charitable services and tools designed to support families and inspire community giving:",
    offerparagraph2: "Funeral Fundraising: We help families raise funds quickly and respectfully during times of loss.",
    offerparagraph3: "Local Partnerships: We collaborate with florists and service providers to offer meaningful, affordable support options.",   
    offerparagraph4: "Digital Platform: Our website simplifies the process of giving and receiving help, connecting people through compassion and purpose.", 
    offerparagraph5: "Ongoing Initiatives: From awareness campaigns to support drives, we are always working to meet emerging community needs with grace and care.",
    obituaryparagraph1: "We are a forward-thinking charitable organization committed to building a sustainable, trustworthy platform that meets the evolving needs of our community. Our goal is to create meaningful, accessible, and lasting impact by leveraging innovative solutions, strategic partnerships, and community engagement. Through initiatives like funeral fundraising, collaborations with local florists, and a user-friendly web platform, we aim to support families in need, foster compassion, and inspire collective action for good.",
    missionparagraph:"To support community needs through innovative, sustainable, and inclusive charitable initiatives that foster trust, encourage participation, and create lasting social impact.",
    visionparagraph:"To be a trusted leader in charitable giving, empowering communities through technology, partnerships, and heartfelt support—especially during life’s most emotionally significant moments.",
  },
  ta: {
    label1: "ஆண்டுகளின் அனுபவம்",
    label2: "தினசரி வாசகர்கள்",
    label3: "பதிவாளர்கள்",
    label4: "அணி உறுப்பினர்கள்",
    over: "சுமார்",
    aboutTitle: "எங்களைப் பற்றி",
    howWeWork: "நாங்கள் எப்படி வேலை செய்கிறோம்?",
    offeringsTitle: "என்ன சேவைகள்?",
    obituaryTitle: "எங்கள் மரண அறிவிப்புகள் பற்றி",
    ourMission: "எங்கள் பணிக்கோள்",
    ourVision: "எங்கள் பார்வை",
    Subscribers: "பதிவாளர்கள்",
    aboutparagraph1: "ப்ரபஞ்சம் என்பது ஒரு சாதாரண இல்லாத லாப நிறுவனத்தைத் தாண்டி, நோக்கமும் நேர்மையுமும் புதுமையும் அடிப்படையாக கொண்ட ஒரு உலகளாவிய மனப்பான்மையே ஆகும். உலகம் அல்லது பிரபஞ்சம் என்ற அர்த்தம் கொண்ட பண்டைய சம்ஸ்கிருதச் சொல்லிலிருந்து வந்த ப்ரபஞ்சம் என்பது தொழில்கள், சமூகங்கள் மற்றும் கலாச்சாரங்களில் பயனுள்ள தாக்கத்தை உருவாக்கும் எங்கள் பார்வையை பிரதிபலிக்கிறது.",
    aboutparagraph2: "ப்ரபஞ்சம் என்பது உணர்வும் மரியாதையும் புதுமையையும் கொண்டு சமூகங்களை ஆதரிக்கும் நோக்கத்துடன் செயல்படும் ஒரு குறிக்கோள் சார்ந்த பொதுநல அமைப்பாகும். பரிவு மாற்றத்திற்கு ஊக்குவிப்பாக இருக்க முடியும் என்ற நம்பிக்கையில் இங்கு நம்பிக்கை வைக்கப்பட்டு, வாழ்க்கையின் மிகுந்த பலவீனமான தருணங்களில் உண்மையான தேவைகளுக்கு பதிலளிக்கும் நம்பகமான மற்றும் நிலைத்தளமான மேடையை உருவாக்குவதே எங்கள் இலக்காகும்.",
    aboutparagraph3: "இதில் உணர்ச்சி நிறைந்த ஆதரவை அறிவுத்தொழில்நுட்பம், அர்த்தமுள்ள கூட்டாண்மைகள் மற்றும் எங்கள் சமூகத்தின் சவால்களை ஆழமாகப் புரிந்து கொண்டு இணைத்து, எளிதில் அணுகக்கூடிய மற்றும் நிலையான தாக்கத்தை உருவாக்குவதே எங்கள் கவனமாக உள்ளது.",
    howdowework1: "பிரபஞ்சம் இல், ஒவ்வொரு கருணை செயலும் மதிப்புமிக்கது என்று நாங்கள் நம்புகிறோம், மற்றும் ஒவ்வொரு பங்களிப்பும் ஒருவரின் வாழ்க்கையை மாற்றக் கூடியது. எங்கள் அணுகுமுறை:",
    howdowework2: "சமூக மையமானது: நாங்கள் சேவை செய்யும் மக்களின் தேவைகளை கேட்டுக்கொண்டு, அவர்களின் உண்மைகளை பிரதிபலிக்கும் தீர்வுகளை இணைந்து உருவாக்குவோம்.",
    howdowework3: "ஒத்துழைப்பு: உள்ளூர் வணிகங்கள், சேவை வழங்குநர்கள் மற்றும் தன்னார்வலர்களுடன் இணைந்து தனிப்பட்ட மற்றும் தாக்கமுள்ள ஆதரவை வழங்குகிறோம்.",
    howdowework4: "தொழில்நுட்பம் மூலம் சாத்தியம்: எங்கள் எளிதில் பயன்படுத்தக்கூடிய வலை தளம் நிதி திரட்டலும் சமூக ஆதரவையும் தானாகச் சரளமாக்கி, அவசரத்தில் உதவியை எளிதாக்குகிறது.",
    howdowework5: "வெளிப்படையானதும் பொறுப்பானதும்: நம்பிக்கையை முதன்மையாகக் கொண்டு தெளிவான தகவல்கள், நம்பகமான செயல்முறைகள் மற்றும் தொடர்ந்த தொடர்பை வழங்குகிறோம்.",
    offerparagraph1: "பிரபஞ்சம் பல்வேறு தொண்டு சேவைகளையும் கருணையும் சமூக பங்களிப்பையும் ஊக்குவிக்கும் கருவிகளையும் வழங்குகிறது:",
    offerparagraph2: "இறுதி செலவுகளுக்கான நிதி திரட்டல்: உயிரிழப்பின்போது குடும்பங்கள் விரைவாகவும் மரியாதையுடன் நிதியை திரட்ட உதவுகிறோம்.",
    offerparagraph3: "உள்ளூர் கூட்டாண்மைகள்: பூச்செண்டிகள் மற்றும் சேவை வழங்குநர்களுடன் இணைந்து அர்த்தமுள்ளதும் மலிவானதும் ஆதரவு விருப்பங்களை வழங்குகிறோம்.",
    offerparagraph4: "இணைய தளம்: எங்கள் வலைதளம் உதவியளிக்கும் மற்றும் பெறும் செயல்முறைகளை எளிமைப்படுத்தி, மனதளவிலும் நோக்கத்திலும் மக்களை இணைக்கிறது.",
    offerparagraph5: "தொடரும் முயற்சிகள்: விழிப்புணர்வு இயக்கங்கள் முதல் ஆதரவு இயக்கங்கள் வரை, சமூகத்தின் புதிய தேவைகளை மனமுவந்து, கவனத்துடனும் பூரணமாகவும் சந்திக்க எப்போதும் பாடுபடுகிறோம்.",
    obituaryparagraph1: "நாம் ஒரு முன்னோக்கி சிந்திக்கும் தொண்டு நிறுவனம். சமூகத்தின் மாற்றம் அடையும் தேவைகளை பூர்த்தி செய்யும், நிலைத்திருக்கும் மற்றும் நம்பிக்கைக்குரிய ஒரு தளத்தை உருவாக்குவதற்காக முழுமையாக அர்ப்பணித்துள்ளோம்.எங்கள் இலக்கம்: புதுமையான தீர்வுகள், மூலதன கூட்டாண்மைகள் மற்றும் சமூக ஈடுபாடுகளை பயன்படுத்தி, அர்த்தமுள்ளதும், எளிதாக அணுகக்கூடியதும், நீடித்த தாக்கமுடையதுமான மாற்றங்களை உருவாக்குவது. இறுதி செலவுகளுக்கான நிதி திரட்டல், உள்ளூர் பூச்செண்டிகள் உடனான கூட்டாண்மை மற்றும் பயனருக்கு உகந்த இணையதள தளங்கள் போன்ற முயற்சிகளின் மூலம், உதவிக்கு உள்ள குடும்பங்களை ஆதரித்து, கருணையை வளர்த்துப் பெருக்கவும், நல்லதற்காக ஒருங்கிணைந்த செயல்பாடுகளுக்கு தூண்டுதலாக இருக்கவும் நாம் பணி செய்கிறோம்.",
    missionparagraph: "புதுமையான, நிலைத்திருக்கும் மற்றும் அனைவரையும் உள்ளடக்கிய தொண்டு முயற்சிகளின் மூலம் சமூக தேவைகளை ஆதரித்து, நம்பிக்கையை வளர்க்கவும், மக்கள் ஈடுபாட்டை ஊக்குவிக்கவும், நீடித்த சமூக தாக்கத்தை உருவாக்குவதே எங்கள் நோக்கம்.",
    visionparagraph: "வாழ்க்கையின் உணர்வுபூர்வமான தருணங்களில் கூட, தொழில்நுட்பம், கூட்டாண்மைகள் மற்றும் உள்ளத்திலிருந்து வரும் ஆதரவின் மூலம் சமூகங்களை வலுப்படுத்தும், நம்பிக்கைக்குரிய தொண்டு நிறுவனத் தலைவர் ஆக விரும்புகிறோம்.",

},
  si: {
    label1: "අවුරුදු පළපුරුද්ද",
    label2: "දිනපතා කියවන්නන්",
    label3: "දායකයින්",
    label4: "කණ්ඩායම් සාමාජිකයින්",
    over: "ආසන්නව",
    aboutTitle: "අපි ගැන",
    howWeWork: "අපි කෙසේ ක්‍රියා කරන්නේද?",
    offeringsTitle: "අපි සපයන සේවාවන්",
    obituaryTitle: "අපගේ අවමංගල්‍ය නිවේදනය",
    ourMission: "අපේ මෙහෙවර",
    ourVision: "අපේ දැක්ම",
    Subscribers: "පිවිසුණු අය",
    aboutparagraph1: "ප්‍රපංචම් කියන්නේ සාමාන්‍ය ලාභ රහිත සංවිධානයක් පමණක් නොව, අරමුණ, අවංක බව සහ නවෝත්පාදනය මත පදනම් වූ ගෝලීය මනෝභාවයකි. ලෝකය හෝ විශ්වය යන අදහසක් ඇති පුරාණ සංස්කෘත වචනයෙන් උරුම වූ ප්‍රපංචම්, කාර්යාල, සමාජ සහ සංස්කෘතික ක්ෂේත්‍රවල දී ප්‍රයෝජනවත් බලපෑමක් සාදන අපගේ දෘෂ්ටිය නියෝජනය කරයි.",
    aboutparagraph2: "ප්‍රපංචම් කියන්නේ කරුණාව, ගෞරවය සහ නවෝත්පාදනය මත පදනම් වූ සමාජ හිතැති හිතවත් සංවිධානයක්. කරුණාව වෙනසකට හේතු විය හැකි යැයි අප විශ්වාස කරන බැවින්, ජීවිතයේ අති විරුද්ධ අවස්ථාවලදී සත්‍ය අවශ්‍යතාට ප්‍රතිචාර දක්වන විශ්වාසදායක සහ ස්ථාවර වේදිකාවක් තනා ගැනීමට අප අරමුණ දරා සිටිමු.",
    aboutparagraph3: "අපගේ සමාජයේ අභියෝගයන් ගැඹුරු ලෙස අවබෝධ කරගෙන, හෘද සාක්ෂි සහිත සහාය, නව්‍ය තාක්ෂණය සහ ගුණවත් සහයෝගීතා එකතු කරමින් සතුටුදායක සහ ස්ථිර බලපෑමක් ඇති කර ගැනීමට අප අවධානය යොමු කරමු.",
    howdowework1: "ප්‍රපංචම් වෙත, සෑම කරුණාවකින්ම වටිනාකමක් ඇති බවත්, සෑම දායකත්වයකින්ම ජීවිතයක් වෙනස් කළ හැකි බවත් අපි විශ්වාස කරනවා. අපේ ක්‍රියාමාර්ගය:",
    howdowework2: "සමාජ මධ්‍යස්ථානයක්: අපි සේවය කරන ජනතාවගේ අවශ්‍යතා ඇසගෙන, ඔවුන්ගේ සැබෑ තත්ත්වයන් අනුකූලව විසඳුම් එක්ව නිර්මාණය කරනවා.",
    howdowework3: "හවුල්කාරීත්වය: ස්ථානයේ ව්‍යාපාර, සේවා සැපයුම්කරුවන් සහ ස්වයංසේවකයන් සමඟ එක්ව, පුද්ගලික හා බලපෑම් ඇති සහාය සැපයීම.",
    howdowework4: "තාක්ෂණය සක්‍රීය කිරීම: අපේ පහසු වෙබ් වේදිකාව හරහා අරමුදල් රැස් කිරීම සහ සමාජ සහාය ක්‍රියාවලිය සරල කර, අවශ්‍ය අවස්ථාවේදී සහාය ලබා ගැනීම පහසු කරයි.",
    howdowework5: "පරිද්ද සහ වගකීම: විශ්වාසය ප්‍රමුඛ කරමින් පැහැදිලි තොරතුරු, විශ්වසනීය ක්‍රියාමාර්ග සහ සමානුකූල සන්නිවේදනයක් ලබා දීම.",
    offerparagraph1: "ප්‍රපංචම්, පවුල්වලට සහය වීමට සහ සමාජ දායකත්වය පිළිබඳව උද්‍යෝගය ලබා දීමට නිර්මාණය කරන ලද විවිධ දායක සේවා සහ මෙවලම් සපයයි:",
    offerparagraph2: "අවසන් කටයුතු සඳහා අරමුදල් රැස් කිරීම: අහිමිවීම් වෙළඳාමකදී පවුල්වලට ගෞරවය සහිතව සහ වේගයෙන් අරමුදල් රැස් කර ගැනීමට අපි උපකාර කරමු.",
    offerparagraph3: "ප්‍රාදේශීය හවුල්කරුවන්: මලල දැමීමේ ව්‍යාපාර හා සේවා සපයන්නන් සමඟ හවුල් වී, අර්ථවත් සහ ප්‍රයෝජනවත් සහාය විකල්ප ලබා දේමු.",
    offerparagraph4: "ඩිජිටල් වේදිකාව: අපගේ වෙබ්අඩවියෙන් සහය ලබාදීම සහ ලැබීම පහසු කරමින්, සෙරිනත්වය හා අරමුණ හරහා මිනිසුන් අතර සම්බන්ධතාවයක් ඇති කරයි.",
    offerparagraph5: "ආරම්භ ongoing ක්‍රියාමාර්ග: අවබෝධතාවය වැඩි කිරීම් සිට සහය උපක්‍රම දක්වා, නව සමාජ අවශ්‍යතාට කරුණාව සහ සෙරිනත්වයෙන් ප්‍රතිචාර දක්වන්න අපි නිරන්තරව කටයුතු කරමින් සිටිමු.",
    obituaryparagraph1: "අපි ආධුනික සිත් ගත්, සිදුවෙමින් පවතින සමාජ අවශ්‍යතා වලට පිළිතුරු ලබාදිය හැකි, තිරසාර සහ විශ්වාසය ඇති වේදිකාවක් ගොඩනගීමට කැපවූ දායක සංවිධානයක් වෙමු. අපගේ ඉලක්කය වන්නේ: නවෝත්පාදනමය විසඳුම්, උචිත කුටිය සම්බන්ධතා සහ සමාජ නිරතතාවය භාවිතයෙන් අර්ථවත්, පහසුවෙන් ප්‍රවේශ විය හැකි සහ දිගුකාලීන බලපෑමක් ඇති කිරීමයි.මරණෝත්සව සඳහා අරමුදල් රැස් කිරීම, ප්‍රාදේශීය මල් සැරයන් සමඟ සහයෝගිතාව සහ භාවිතා කිරීමට පහසු වෙබ් වේදිකාවක් වැනි ක්‍රියාමාර්ග හරහා, අපි අවශ්‍යතාවයෙන් පීඩාවට පත්වූ පවුල්වලට සහය ලබාදීම, කරුණාව වර්ධනය කිරීම සහ සුභ කටයුතු සඳහා එකමුතු ක්‍රියාමාර්ගයන්ට ආරම්භයක් වීමට අපේක්ෂා කරමු.",
    missionparagraph: "නවෝත්පාදනමය, තිරසාර සහ සියලුදෙනාගේ සම්බන්ධතාවය ඇතුළත් දායක ක්‍රියාමාර්ගයන් හරහා සමාජ අවශ්‍යතා සපුරාලීම, විශ්වාසය ගොඩනඟීම, සහභාගිත්වය උත්සාහවන්ත කිරීම සහ දිගුකාලීන සමාජ බලපෑමක් නිර්මාණය කිරීම අපගේ මෙහෙවර වේ.",
    visionparagraph: "තාක්‍ෂණය, හවුල්කාරීත්වය සහ හදවතින් පිරුණු සහාය ඔස්සේ සමාජයන් සවිමත් කරන, විශේෂයෙන්ම ජීවිතයේ හැඟීම් ගැලෙවූ අවස්ථා වලදී, විශ්වාසය දිනූ දායකත්ව නායකයෙකු වීම අපගේ දැක්මයි.",
  },
};

    const t = translations[langKey];

    const stats: StatProps[] = [
        { count: "2", label: t.label1 }, 
        { count: "100", label: t.label2},
        { count: "50", label: t.label3 },
        { count: "20", label: t.label4},
    ];

    const Counter = ({ target }: { target: number }) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            let start = 0;
            const duration = 2000; 
            const stepTime = Math.abs(Math.floor(duration / target));

            const timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start >= target) clearInterval(timer);
            }, stepTime);

            return () => clearInterval(timer);
        }, [target]);

        return <motion.span>{count}+</motion.span>;
    };

    const offerings = [
        {
            description:t.offerparagraph2,
            imageSrc:
                "/images/samathi.png",
        },
        {
            description:t.offerparagraph3,
            imageSrc:
                "/images/wreath.png",
        },
        {
            description:t.offerparagraph4,
            imageSrc:
                "/images/digital.png",
        },
        {
            description:t.offerparagraph5,
            imageSrc:
                "/images/support.png",
        },
    ];

    const attendees = [
        { id: 1, name: 'Attendee 1', imageUrl: 'https://storage.googleapis.com/a1aa/image/WpYM3R-C69SiR3u0ZBVgoaVLPpaAzd4Mgx7zxGqR30M.jpg' },
        { id: 2, name: 'Attendee 2', imageUrl: 'https://storage.googleapis.com/a1aa/image/bcA1oIydlhkWJJ7Jlwm22KMwQiLVNZQinDmq-I6R6MA.jpg' },
        { id: 3, name: 'Attendee 3', imageUrl: 'https://storage.googleapis.com/a1aa/image/eWz3K9uN30e2uNXszdWk_d5aJkwnQSQu8Sm-Aswsv7o.jpg' },
        { id: 4, name: 'Attendee 4', imageUrl: 'https://storage.googleapis.com/a1aa/image/DQimsrnpYjVqF_WDtYqxHIsbmW0I2R6HrQw6RA5bs10.jpg' },
        { id: 5, name: 'Attendee 5', imageUrl: 'https://storage.googleapis.com/a1aa/image/b-2uUEe6r0ZYDFtA8csYUgtfY1F_DlQznQEAfczFTs4.jpg' },
    ];

    return (
        <div className="bg-white min-h-screen mt-8">
            <div className="space-y-10">
                <div className="px-4 md:px-8 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <Image
                                src="/images/first.jpg"
                                alt="About us"
                                width={500}
                                height={400}
                                className="w-[100%] h-auto mx-auto object-cover "
                            />
                        </div>
                        <div className="text-justify">
                            <div className="flex-shrink min-w-0">
                                <TitleWithUnderline text={t.aboutTitle} underlineWidth={64} />
                            </div>
                            <p className="mb-4">{t.aboutparagraph1}</p>
                            <p className="mb-4">{t.aboutparagraph2}</p>
                            <p className="mb-4">{t.aboutparagraph3}</p>
                        </div>
                    </div>
                </div>

                <Separator className="!w-full !mb-2" />

                <div className="px-4 md:px-8 lg:px-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        {stats.map((stat, index) => (
                            <div key={index}>
                                <h3 className="text-3xl md:text-5xl font-bold mb-2">
                                    {index === 0 && <span className="mr-4">{t.over}</span>}
                                    <Counter target={parseInt(stat.count, 10)} />
                                </h3>
                                <p>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator className="!w-full mb-8" />

                <div className="px-4 md:px-8 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="text-justify">
                            <div className="flex-shrink min-w-0">
                                <TitleWithUnderline text={t.howWeWork} underlineWidth={64} />
                            </div>
                            <p className="mb-4">{t.howdowework1}</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>{t.howdowework2}</li>
                                <li>{t.howdowework3}</li>
                                <li>{t.howdowework4}</li>
                                <li>{t.howdowework5}</li>
                            </ul>

                        </div>
                        <div className="flex items-center mx-auto mr-10">
                            <div className="relative h-[280px] md:h-[400px] pr-8">
                                <Image
                                    src="/images/workStyle.jpg"
                                    alt="Two boys smiling and hugging each other"
                                    width={400}
                                    height={400}
                                    objectFit="cover"
                                    className=" aspect-[1/1] transform translate-x-20 w-64 md:w-96"
                                />
                                <Image
                                    src="/images/workStyle2.jpg"
                                    alt="A woman recording a podcast with a microphone and headphones"
                                    width={300}
                                    height={300}
                                    className=" aspect-[1/1] w-48 md:w-72 p-4 bg-white absolute md:bottom-0 bottom-0  transform -translate-x-1/4 -translate-y-1/4   "
                                />

                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="!w-full !mb-2" />

                <div className="px-4 sm:px-8 lg:px-16">
                    <h2 className="text-[1.2rem] font-bold text-center text-[#0D1322] mb-8 flex flex-col items-center justify-center font-[Poppins]">
                        {t.offeringsTitle}
                        <div className="bg-[#880002] w-16 h-0.5 mt-2"></div>
                    </h2>

                    <div className="text-justify">
                        <p>{t.offerparagraph1}</p>
                        {offerings.map((offer, index) => (
                            <div key={index} className="flex md:items-center space-x-4 mb-6">
                                <div className="w-16 h-16 relative m-4 flex-shrink-0">
                                    <Image
                                        src={offer.imageSrc || "/images/Prapancham-logo.png"}
                                        alt={`Icon representing`}
                                        layout="fill"
                                        objectFit="cover"
                                        className=""
                                    />
                                </div>
                                <div>
                                    <p className="text-gray-600">{offer.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator className="!w-full !mb-2" />

                <div className="px-4 sm:px-8 lg:px-16">
                    <div className="text-center">
                        <h2 className="text-[1.2rem] font-bold text-center text-[#0D1322] mb-8 flex flex-col items-center justify-center font-[Poppins]">
                            {t.obituaryTitle}
                            <div className="bg-[#880002] w-16 h-0.5 mt-2"></div>
                        </h2>
                        <div className="flex justify-center items-center mt-2 space-x-2 ">
                            <div className="flex items-center mb-2">
                                {attendees.slice(0, 5).map((attendee) => (
                                    <img
                                        key={attendee.id}
                                        alt={`Attendee ${attendee.id}`}
                                        className="w-8 h-8 rounded-full border-2 border-white -ml-2"
                                        src={attendee.imageUrl}
                                    />
                                ))}
                            </div>
                            <span className="ml-2 text-gray-600">120+ {t.Subscribers}</span>
                        </div>
                        <div className="mt-4 ">
                            <p>
                                {t.obituaryparagraph1}
                            </p>
                        </div>
                    </div>
                </div>

                <Separator className="!w-full !mb-2" />

                <div className="px-4 md:px-8 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        <div className="flex items-center mx-auto">
                            <div className="relative w-full h-[280px] md:h-[400px]">
                                <Image
                                    src="/images/visionMission.jpg"
                                    alt="Two boys smiling and hugging each other"
                                    width={400}
                                    height={400}
                                    objectFit="cover"
                                    className="rounded aspect-[1/1] transform -translate-x-0 md:-translate-x-20 w-48 md:w-72"
                                />
                                <div className="absolute bottom-0 left-0 p-4 bg-white transform translate-x-20 translate-y-8">
                                    <Image
                                        src="/images/visionMission2.jpg"
                                        alt="A woman recording a podcast with a microphone and headphones"
                                        width={300}
                                        height={300}
                                        className="rounded aspect-[1/1]  w-48  md:w-72"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="text-justify">
                            <div className="flex-shrink min-w-0">
                                <TitleWithUnderline text={t.ourMission} underlineWidth={64} />
                            </div>
                            <p className="mb-4">{t.missionparagraph}</p>

                        </div>
                    </div>
                </div>

                <Separator className="!w-full !mb-2" />

                <div className="px-4 md:px-8 lg:px-16 pb-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="text-justify">
                            <div className="flex-shrink min-w-0">
                                <TitleWithUnderline text={t.ourVision} underlineWidth={64} />
                            </div>
                            <p className="mb-4">{t.visionparagraph}</p>
                        </div>
                        <div className="flex items-center mx-auto">
                            <div className="relative w-full h-[280px] md:h-[400px]">
                                <Image
                                    src="/images/visionMission.jpg"
                                    alt="Two boys smiling and hugging each other"
                                    width={400}
                                    height={400}
                                    objectFit="cover"
                                    className="rounded aspect-[1/1] transform -translate-x-0 md:-translate-x-20 w-48 md:w-72"
                                />
                                <div className="absolute bottom-0 left-0 p-4 bg-white transform translate-x-20 translate-y-8">
                                    <Image
                                        src="/images/visionMission2.jpg"
                                        alt="A woman recording a podcast with a microphone and headphones"
                                        width={300}
                                        height={300}
                                        className="rounded aspect-[1/1]  w-48  md:w-72"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Separator className="!w-full !mb-8" />
            </div>
        </div>
    );
};

export default About;
