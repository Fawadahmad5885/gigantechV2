import React from "react";
import Image from "next/image";
import { getStrapiMedia } from "../../../lib/api";

function PartnerChoice(sectionData) {
  const { heading, partnerChoiceCard } = sectionData.sectionData || {};

  return (
    <div className="bg-gray-100 py-[5%]  w-full " id="why-choose-us">
      <div>
        <h2 className="heading-text max-md:px-5  text-center text-textColor">
          {heading}
        </h2>
        {/* Cards container with 20px gap */}
        <div className="card-container component-width  mt-8">
          {partnerChoiceCard?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col bg-white p-10 gap-4 border-gray-300 border-[1px] flex-1 min-w-[280px]"
            >
              {/* Image with title */}
              <div className="flex flex-row items-center gap-4 mb-4">
                <Image
                  width={60}
                  height={60}
                  objectFit="contain"
                  src={getStrapiMedia(item.image?.url)}
                  alt={item.title}
                />
                <h3 className="font-poppins text-lg font-medium  ">
                  {item.title}
                </h3>
              </div>
              {/* Red line with description */}
              <div
                className="border-l-[2px]  border-primaryColor pl-4  
              "
              >
                <p className="text-gray-700 font-poppins text-justify text-base ">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PartnerChoice;
