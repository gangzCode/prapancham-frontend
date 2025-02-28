import Image from "next/image";

interface AdvertisementBannerProps {
  images: string[];
  className?: string;
}

const AdvertisementBanner: React.FC<AdvertisementBannerProps> = ({
  images,
  className = "",
}) => {
  return (
    <section
      className={`flex flex-col justify-center px-32 py-6 w-full rounded-lg max-md:px-5 max-md:max-w-full ${className}`}
    >
      <div className="flex flex-wrap gap-3 justify-center items-center w-full max-md:max-w-full">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Advertisement ${index + 1}`}
            width={284}
            height={143}
            className="object-contain flex-1 shrink self-stretch my-auto aspect-[1.98] basis-0 min-w-60 w-[284px]"
          />
        ))}
      </div>
    </section>
  );
};

export default AdvertisementBanner;
