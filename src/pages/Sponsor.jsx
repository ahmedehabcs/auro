import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import MainPhotos from "../components/jsonFiles/SponsorMainPhotos.json";

const SponsorPage = () => {
  const navigate = useNavigate();
  const navToHome = () => navigate("/home");
  const [mainImages] = useState(MainPhotos);

  const CampaignCard = ({ campaign }) => {
    return (
      <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 h-full">
        <div className="p-4 flex items-center">
          <div className="w-12 h-12 rounded-lg bg-linear-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold mr-3">
            {campaign.avatarFallback}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{campaign.title.toUpperCase()}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
              <span>{campaign.sub.status}</span>
              <span className="mx-1">•</span>
              <span>{campaign.sub.objective}</span>
            </div>
          </div>
        </div>
        
        <div className="py-3 flex divide-x divide-gray-200">
          {campaign.metrics.map((metric, index) => (
            <div key={index} className="text-center flex-1 px-2">
              <div className="font-bold text-[#383838] text-lg">{metric.value}</div>
              <div className="text-xs text-gray-500 mt-1">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="min-h-screen w-full bg-linear-to-r from-purple-900 via-black to-purple-900 pt-10 px-4 sm:px-6 md:px-10 py-6">
      <div className="absolute top-6 left-6 flex items-center text-white text-lg font-semibold z-50">
        <FaHome
          onClick={navToHome}
          className="text-3xl hover:text-purple-300 cursor-pointer transition"
        />
        <BsArrowRight className="mx-2 text-xl" />
        <span className="text-xl">Sponsors</span>
      </div>
      
      <h2
        className="text-4xl sm:text-5xl font-bold text-white text-center mt-7 mb-10"
        style={{ fontFamily: '"UnifrakturCook", cursive' }}
      >
        Discover the Sponsors
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mainImages.map(campaign => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </section>
  );
};

export default SponsorPage;