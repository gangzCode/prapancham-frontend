import React from "react";
import NewsCategorySection from "./NewsCategorySection";
import CountriesSection from "./CountriesSection";

// Mock data for news items
const newsCategory1 = [
  {
    id: 101,
    title:
      "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    category: "Category1",
    duration: "15 minutes video",
    editorName: "Editor's name",
  },
  {
    id: 102,
    title:
      "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl.",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144",
    category: "Category1",
    duration: "15 minutes video",
    editorName: "Editor's name",
  },
  {
    id: 103,
    title:
      "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl.",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144",
    category: "Category1",
    duration: "15 minutes video",
    editorName: "Editor's name",
  },
];

const newsCategory2 = [
  {
    id: 201,
    title:
      "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl.",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144",
    category: "Category2",
    duration: "15 minutes video",
    editorName: "Editor's name",
  },
  {
    id: 202,
    title:
      "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
    category: "Category2",
    duration: "15 minutes video",
    editorName: "Editor's name",
  },
  {
    id: 203,
    title:
      "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl.",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144",
    category: "Category2",
    duration: "15 minutes video",
    editorName: "Editor's name",
  },
];

const countries = [
  "Country",
  "Country",
  "Country",
  "Country",
  "Country",
  "Country",
];

const RelevantNewsSection: React.FC = () => {
  return (
    <div className="bg-gray-50 py-8">
      <div className="px-4 md:px-8 lg:px-16">
        {/* <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-2">
            Relevant News
          </h2>
          <div className="h-1 w-36 bg-accent"></div>
        </div> */}

        <NewsCategorySection
          title="Relevant News"
          news={newsCategory1}
          bannerImage="https://images.unsplash.com/photo-1607082350899-7e105aa886ae"
          bannerAlt="Super Sale"
        />

        <NewsCategorySection
          title="News category 2"
          news={newsCategory2}
          bannerImage="https://images.unsplash.com/photo-1627384113743-6bd5a479fffd"
          bannerAlt="Black Friday Sale"
        />

        <CountriesSection countries={countries} />
      </div>
    </div>
  );
};

export default RelevantNewsSection;
