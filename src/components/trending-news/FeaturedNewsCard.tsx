"use client";

interface FeaturedNewsCardProps {
  imageUrl: string;
  title: string;
  description: string;
  editorName: string;
  category: string;
  duration: string;
}

export const FeaturedNewsCard: React.FC<FeaturedNewsCardProps> = ({
  imageUrl,
  title,
  description,
  editorName,
  category,
  duration,
}) => {
  return (
<<<<<<< HEAD
    <article className="self-stretch p-3 sm:p-2 bg-white shadow-[0px_0px_12px_rgba(0,0,0,0.06)] w-full min-w-full md:min-w-full lg:min-w-full xl:min-w-60 md:max-w-full lg:max-w-full xl:max-w-[578px] overflow-hidden">
      <div className="relative w-full text-white overflow-hidden">
        <div
          className="relative aspect-[4/3] sm:aspect-[16/10] bg-cover bg-center h-[380px] w-full"
=======
    <article className="p-3 sm:p-2 bg-white shadow-[0px_0px_12px_rgba(0,0,0,0.06)] w-full h-[520px] flex flex-col min-w-full md:min-w-full lg:min-w-full xl:min-w-60 md:max-w-full lg:max-w-full xl:max-w-[578px] overflow-hidden">
      <div className="relative w-full h-full text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center w-full h-full"
>>>>>>> 688f1f4 (Merge branch 'feature/home')
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.5)_50%,rgba(0,0,0,0.5)_100%)]" />
          <div className="absolute bottom-0 left-0 right-0 z-10 px-6 py-8">
            <h2 className="text-heading-lg text-white max-w-[90%]">{title}</h2>
            <p className="mt-4 text-body-base line-clamp-2 text-white">
              {description}
              <span className="font-bold text-white ml-1 hover:underline cursor-pointer">
                Read more
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center text-sm mt-2">
        <div className="flex gap-2 items-center">
          <div className="flex shrink-0 w-4 h-4 text-neutral-500" />
          <span className="text-neutral-500 text-body-sm">{editorName}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-secondary text-body-sm">{category}</span>
          <span className="text-neutral-500 text-body-sm">{duration}</span>
        </div>
      </div>
    </article>
  );
};
