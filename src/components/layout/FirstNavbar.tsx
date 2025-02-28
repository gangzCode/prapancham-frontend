import Image from "next/image";
import Link from "next/link";

const navItems = [
  { id: "news", label: "News", href: "/news" },
  { id: "obituary", label: "Obituary", href: "/obituary" },
  { id: "about", label: "About Us", href: "/about" },
  { id: "contact", label: "Contact Us", href: "/contact" },
];

const FirstNavbar: React.FC = () => {
  const formatDate = () => {
    const date = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = days[date.getDay()];
    const dateNum = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const ordinal = (n: number) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return `${day}, ${ordinal(dateNum)} ${month} ${year}`;
  };

  return (
    <header className="flex flex-wrap gap-4 sm:gap-6 md:gap-10 justify-between items-center px-4 sm:px-8 md:px-16 lg:px-32 mt-4 sm:mt-6 w-full text-sm sm:text-base">
      <h1 className="w-full sm:w-auto sm:min-w-[200px] md:min-w-[292px] order-1">
        <Image
          src="/images/prapancham-logo.svg"
          alt="Prapancham Logo"
          width={292}
          height={56}
          priority
          className="w-full max-w-[200px] sm:max-w-none mx-auto sm:mx-0"
        />
      </h1>
      <time className="w-full sm:w-auto text-center text-link order-2 sm:order-2 text-sm sm:text-base font-poppins">
        {formatDate()}
      </time>
      <nav className="w-full sm:w-auto flex flex-wrap sm:flex-nowrap gap-2 sm:gap-1 justify-center items-center text-center text-link order-3 mt-4 sm:mt-0">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex justify-center items-center rounded-md transition-all hover:text-link hover:text-link-hover hover:scale-110 font-poppins"
          >
            <span className="px-3 sm:px-4 py-2 sm:py-1">{item.label}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default FirstNavbar;
