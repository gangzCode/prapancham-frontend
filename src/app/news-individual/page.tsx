import React from "react";
import { Clock, Headphones, Youtube } from "lucide-react";
import RelevantNewsSection from "@/components/news-individual/RelevantNewsSection";

const NewsIndividual: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Section */}
          <div className="w-full lg:w-2/3">
            {/* 1. Image with breaking news, minutes ago text, date */}
            <div className="mb-6">
              <img
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
                alt="Medical workers in PPE"
                className="w-full h-auto object-cover rounded-sm"
              />
              <div className="flex items-center gap-2 mt-2">
                <span className="text-red-600 font-semibold text-sm uppercase">
                  Breaking News
                </span>
                <span className="text-gray-500 text-xs flex items-center">
                  • <Clock className="w-3 h-3 ml-1 mr-1" /> 2 minutes ago
                </span>
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
                className="w-full h-[320px] object-cover rounded-sm"
              />
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef"
                alt="Healthcare workers"
                className="w-full h-[320px] object-cover rounded-sm"
              />
              <img
                src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144"
                alt="Medical facilities"
                className="w-full h-[320px] object-cover rounded-sm"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
              <img
                src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144"
                alt="Healthcare innovation"
                className="w-full h-[336px] object-cover rounded-sm"
              />
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef"
                alt="Medical technology"
                className="w-full h-[336px] object-cover rounded-sm"
              />
            </div>

            {/* Additional content for completeness */}
            <div className="prose max-w-none">
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
                Ullamcorper fames diam eget nisl faucibus massa ante. Nec magna
                purus vitae adipiscing gravida in vulputate mauris. Volutpat
                integer aliquam mattis tincidunt dui sodales viverra. Vestibulum
                pellentesque dolor ipsum aliquam pretium morbi mauris. Erat
                pellentesque lectus nulla auctor. Faucibus malesuada vulputate
                quisque cras volutpat pretium. Augue tempus ut aliquam sem elit.
              </p>
            </div>
          </div>

          {/* Sidebar - Ads and Contact Information */}
          <div className="w-full lg:w-1/3 space-y-6">
            {/* Contact Sections */}
            <div className="bg-white rounded-md shadow-sm border border-gray-100">
              <div className="bg-white p-4 text-center">
                <h3 className="text-primary font-bold">
                  Contact Us For Advertisements
                </h3>
                <div className="mt-3 mb-2">
                  <button className="w-full bg-[#0A3F51] text-white py-3 rounded-md hover:bg-[#0A3F51]/90 transition-colors">
                    +94 77 002 33 23
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-sm border border-gray-100">
              <div className="bg-white p-4 text-center">
                <h3 className="text-primary font-bold">
                  Contact Us For Obituary News
                </h3>
                <div className="mt-3 mb-2">
                  <button className="w-full bg-[#0A3F51] text-white py-3 rounded-md hover:bg-[#0A3F51]/90 transition-colors">
                    +94 77 002 33 23
                  </button>
                </div>
              </div>
            </div>

            {/* Advertisement Banners */}
            <div className="space-y-4">
              <div className="bg-blue-500 rounded-md overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1607083206968-13611e3d76db"
                  alt="Super Sale"
                  className="w-full h-auto"
                />
              </div>

              <div className="bg-red-500 rounded-md overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5"
                  alt="Black Friday"
                  className="w-full h-auto"
                />
              </div>

              <div className="bg-yellow-500 rounded-md overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae"
                  alt="Super Sale"
                  className="w-full h-auto"
                />
              </div>

              <div className="bg-green-500 rounded-md overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1589254065878-42c9da997008"
                  alt="Website Creation"
                  className="w-full h-auto"
                />
              </div>

              <div className="bg-black rounded-md overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1627384113743-6bd5a479fffd"
                  alt="Black Friday Sale"
                  className="w-full h-auto"
                />
              </div>

              <div className="bg-orange-500 rounded-md overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae"
                  alt="Super Sale"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Contact Details Section */}
            <div className="bg-white rounded-md shadow-sm border border-gray-100">
              <div className="bg-white p-4 text-center">
                <h3 className="text-primary font-bold mb-4">
                  For More Details Contact Us
                </h3>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((item, index) => (
                    <button
                      key={index}
                      className="w-full bg-[#0A3F51] text-white py-3 rounded-md hover:bg-[#0A3F51]/90 transition-colors"
                    >
                      +94 77 002 33 23
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="space-y-3">
              <a
                href="#"
                className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Headphones className="w-5 h-5 text-gray-700" />
                <span className="text-primary">Listen To Our Podcast Now</span>
              </a>

              <a
                href="#"
                className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Youtube className="w-5 h-5 text-red-600" />
                <span className="text-primary">Visit our YouTube Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Add the Relevant News Section */}
      <RelevantNewsSection />
    </div>
  );
};

export default NewsIndividual;
