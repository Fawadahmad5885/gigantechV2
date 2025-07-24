"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa6";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { getStrapiMedia } from "@/lib/api";

function Technologies({ headerData, technologies }) {
  // Process technologies data to match old structure
  const techData = Array.isArray(technologies) ? technologies : [];  
  
  // Create categories by grouping technologies (similar to old getTechnologies)
  const techGroups = techData.reduce((groups, tech) => {
    const category = tech?.category || 'Uncategorized';
    if (!groups[category]) {
      groups[category] = {
        name: category,
        tools: []
      };
    }
    groups[category].tools.push({
      name: tech.name,
      image: getStrapiMedia(tech.logo?.url) || '/default-tech-image.png',
      tooltip: tech.tooltip || tech.name
    });
    return groups;
  }, {});

  const categories = Object.values(techGroups);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.name || '');
  
  // Set initial category if not set
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].name);
    }
  }, [categories]);

  const {title, description} = headerData
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  const handleSelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  // Get current tools for selected category (similar to old getTechCards)
  const currentTools = selectedCategory ? techGroups[selectedCategory]?.tools || [] : [];

  if (!techData.length) {
    return (
      <div className="h-auto technologies-bg-image py-[5%] bg-tertiaryColor">
        <div className="px-[20px] font-poppins text-center">
          <h2 className="heading-text z-10 text-textColor">{title}</h2>
          <p className="section-description">{description}</p>
        </div>
        <p className="text-center py-8">No technologies available at this time.</p>
      </div>
    );
  }

  return (
    <div className="h-auto technologies-bg-image py-[5%] bg-gray-100">
      <div className="px-[20px] font-poppins text-center">
        <h2 className="heading-text z-10 text-textColor">{title}</h2>
        <p className="section-description">{description}</p>
      </div>

      {/* Mobile Dropdown */}
      <div className="relative md:hidden max-md:px-[20px]">
        <button
          onClick={toggleDropdown}
          className="border p-2 flex mt-4 items-center justify-between pr-4 rounded w-full bg-white text-left"
        >
          <span>{selectedCategory || 'Select Category'}</span>
          <FaAngleDown className="text-[14px] text-[#696565]" />
        </button>
        {isDropdownOpen && (
          <ul className="absolute z-10 bg-white left-0 right-0 mx-[20px] border rounded shadow-md mt-2 max-h-60 overflow-y-auto">
            {categories.map((category) => (
              <li
                key={category.name}
                onClick={() => handleSelect(category.name)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {category.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Desktop Tabs */}
      <div className="hidden md:grid md:grid-cols-6 mt-6 p-[0.25rem] h-[2.5rem] md:max-w-[940px] lg:max-w-[940px] xl:max-w-[1346px] md:mx-auto">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`px-1 z-10 py-3 text-center text-lg font-medium cursor-pointer ${
              category.name === selectedCategory
                ? "text-black border-b-[2px] border-secondaryColor"
                : "text-black border-b-[2px]"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Technology Swiper */}
      {currentTools.length > 0 && (
        <div  className="component-width max-lg:px-6 flex mx-auto flex-col mt-8 md:mt-16">
          <Swiper
            key={selectedCategory}
            spaceBetween={10}
            slidesPerGroup={3}
            breakpoints={{
              0: { slidesPerView: 4 },
              512: { slidesPerView: 4 },
              768: { slidesPerView: 6 },
              1024: { slidesPerView: 8 },
              1280: { slidesPerView: 10 },
            }}
            modules={[Grid, Pagination]}
            grid={{ rows: 2, fill: "row" }}
            pagination={{ clickable: true, el: ".custom-swiper-pagination" }}
            className="w-full pb-4" data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      data-aos-duration="1000"
          >
            {currentTools.map((tool) => (
              <SwiperSlide key={tool.name}>
                <Tippy content={tool.tooltip}>
                  <div  className="flex flex-col items-center ">
                    <div className="flex items-center justify-center w-[80px] h-[80px] p-2 rounded-lg shadow-md bg-gradient-to-br from-primaryColor/20 to-tertiaryColor/10">
                      <Image
                        alt={tool.name}
                        width={80}
                        height={80}
                        src={tool.image}
                        className="object-contain"
                        onError={(e) => {
                          e.target.src = '/default-tech-image.png';
                        }}
                      />
                    </div>
                    <span className="text-[#3e3b3b] text-sm text-center h-[40px] flex items-center justify-center">
                      {tool.name}
                    </span>
                  </div>
                </Tippy>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="custom-swiper-pagination"></div>
        </div>
      )}
    </div>
  );
}

export default Technologies;