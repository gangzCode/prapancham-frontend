import React from "react";
import { Clock, Headphones, Youtube } from "lucide-react";
import RelevantNewsSection from "@/components/news-individual/RelevantNewsSection";
import { Separator } from "@/components/ui/separator";
import AdvertisementSidebar from "@/components/news-category/AdvertisementSidebar";

const NewsIndividual: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className=" flex flex-col justify-center px-4 md:px-8 lg:px-16  py-6 max-md:px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content Section */}
          <div className="md:col-span-2">
            {/* 1. Image with breaking news, minutes ago text, date */}
            <div className="mb-6">
              <img
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
                alt="Medical workers in PPE"
                className="w-full h-auto max-h-[450px] object-cover "
              />
              <div className="flex items-center gap-2 mt-4 justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-red-600 font-semibold text-sm uppercase">
                    Breaking News
                  </span>
                  <span className="text-gray-500 text-xs flex items-center">
                    • <Clock className="w-3 h-3 ml-1 mr-1" /> 2 minutes ago
                  </span>
                </div>
                <span className="text-sm text-gray-500">14th Feb 2025</span>
              </div>
            </div>

            {/* 2. Heading or title of the news */}
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
              Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus
              ac hendrerit nisl asdrfg tpose dfltgh convallis.
            </h1>

            {/* 3. First portion of the news body/content */}
            <div className="prose max-w-none mb-6">
              <p className="mb-4">
                Lorem ipsum dolor sit amet consectetur. Vestibulum ut sodales
                quisque nibh est. Diam natoque scelerisque netus tellus. Est mus
                potenti dictum augue. Fringilla scelerisque sed ultrices
                dignissim nisl integer adipiscing. Convallis facilisis
                adipiscing odio ac. Pharetra vitae ultricies sit vel. Massa
                purus nibh auctor eros sollicitudin sollicitudin pharetra
                tristique. Arcu accumsan consectetur lobortis ut vel
                pellentesque quis libero nullam.
              </p>
              <p className="mb-4">
                Sed in viverra risus eros non nisl adipiscing praesent. Amet vel
                turpis et dis eget. Vel lectus tincidunt et mattis etiam.
                Posuere massa et risus praesent vehicula viverra gravida arcu.
                Quam fermentum nisl nulla donec orci aliquam. Sagittis dignissim
                aliquet commodo eu sed. Aliquam nec purus pellentesque lorem
                suscipit. Nulla pellentesque quam nulla augue non nec purus.
                Egestas metus aut tincidunt. Auctor suctor diam nulla
                scelerisque arcu metus vitae eget. Non in in nec ipsum. Volutpat
                arcu aliquet nulla praesium tellus morbi ornare nullam velit. Id
                facilisis risus sit eros facilisis sapien in orci. Aliquam vel
                ipsum vulputate diam.
              </p>
            </div>

            {/* 4. Three images in a row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
              <img
                src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144"
                alt="Medical research"
                className="w-full h-[320px] object-cover "
              />
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef"
                alt="Healthcare workers"
                className="w-full h-[320px] object-cover "
              />
              <img
                src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144"
                alt="Medical facilities"
                className="w-full h-[320px] object-cover "
              />
            </div>

            {/* 5. Second portion of the news body/content */}
            <div className="prose max-w-none mb-6">
              <p className="mb-4">
                Ullamcorper fames diam eget nisl faucibus massa ante. Nec magna
                purus vitae adipiscing gravida in vulputate mauris. Volutpat
                integer aliquam mattis tincidunt dui sodales viverra. Vestibulum
                pellentesque dolor ipsum aliquam pretium morbi mauris. Erat
                pellentesque lectus nulla auctor. Faucibus malesuada vulputate
                quisque cras volutpat pretium. Augue tempus ut aliquam sem elit.
              </p>
              <p className="mb-4">
                Lorem ipsum dolor sit amet consectetur. Vestibulum ut sodales
                quisque nibh est. Diam natoque scelerisque netus tellus. Est mus
                potenti dictum augue. Fringilla scelerisque sed ultrices
                dignissim nisl integer adipiscing. Convallis facilisis
                adipiscing odio ac. Pharetra vitae ultricies sit vel. Massa
                purus nibh auctor eros sollicitudin sollicitudin pharetra
                tristique. Arcu accumsan consectetur lobortis ut vel
                pellentesque quis libero nullam.
              </p>
            </div>

            {/* 6. Two images in a row */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
              <img
                src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144"
                alt="Healthcare innovation"
                className="w-full h-[336px] object-cover "
              />
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef"
                alt="Medical technology"
                className="w-full h-[336px] object-cover "
              />
            </div> */}

            {/* Additional content for completeness */}
            {/* <div className="prose max-w-none">
              <p className="mb-4">
                Sed in viverra risus eros non nisl adipiscing praesent. Amet vel
                turpis et dis eget. Vel lectus tincidunt et mattis etiam.
                Posuere massa et risus praesent vehicula viverra gravida arcu.
                Quam fermentum nisl nulla donec orci aliquam. Sagittis dignissim
                aliquet commodo eu sed. Aliquam nec purus pellentesque lorem
                suscipit. Nulla pellentesque quam nulla augue non nec purus.
                Egestas metus aut tincidunt. Auctor auctor diam nulla
                scelerisque arcu metus vitae eget. Non in in nec ipsum. Volutpat
                arcu aliquet nulla praesium tellus morbi ornare nullam velit. Id
                facilisis risus sit eros facilisis sapien in orci. Aliquam vel
                ipsum vulputate diam.
              </p>
              <p className="mb-4">
                Sed in viverra risus eros non nisl elit adipiscing praesent. Amet vel turpis et dis eget.
                Vel lectus tincidunt et mattis etiam. Posuere massa et risus praesent vehicula
                viverra gravida arcu. Quam fermentum nisi nulla donec orci aliquam. Sagittis dignissim
                aliquet commodo eu sed. Aliquam nec purus pellentesque lorem augue. Nulla pellentesque
                nullam nulla augue nunc nec purus. Et enim mus ut tincidunt. Auctor auctor diam nulla
                scelerisque arcu metus vitae eget. Non in in nec ipsum. Volutpat arcu aliquet nulla pretium
                tellus morbi ornare nullam velit. Id facilisis risus sit eros facilisis sapien in orci.
                Aliquam vel ipsum vulputate diam.
              </p>
              <p className="mb-4">
                Ullamcorper fames diam eget nisl faucibus massa ante. Nec magna purus vitae adipiscing gravida in vulputate mauris.
                Volutpat integer aliquam mattis tincidunt dui sodales viverra. Vestibulum pellentesque dolor ipsum aliquam pretium
                morbi mauris. Erat pellentesque lectus nulla auctor. Faucibus malesuada vulputate quisque cras volutpat pretium.
                Augue tempus ut aliquam sem elit.morbi ornare nullam velit. Id facilisis risus sit eros facilisis sapien in orci.
                Aliquam vel ipsum vulputate diam.
                Ullamcorper fames diam eget nisl faucibus massa ante. Nec magna purus vitae adipiscing gravida in vulputate mauris.
                Volutpat integer aliquam mattis tincidunt dui sodales viverra. Vestibulum pellentesque
              </p>
            </div> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
              <img
                src="https://images.unsplash.com/photo-1607083206968-13611e3d76db"
                alt="Healthcare innovation"
                className="w-full h-[336px] object-cover "
              />
              <img
                src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae"
                alt="Medical technology"
                className="w-full h-[336px] object-cover "
              />
            </div>
          </div>

          {/* Sidebar - Ads and Contact Information */}
          <div className="md:col-span-1">
            <AdvertisementSidebar numberOfAds={6} />

          </div>
        </div>
      </div>

      {/* Add the Relevant News Section */}
      <RelevantNewsSection />
    </div>
  );
};

export default NewsIndividual;
