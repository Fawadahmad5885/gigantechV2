// "use client";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/api";

function IndustriesCard({ img, title, subtitle, desc }) {
  const imageUrl = img ? getStrapiMedia(img) : '/fallback-image.jpg';
  // const backgroundImageUrl = img.src || img;
  return (
    <div className="max-md:w-full flex flex-col items-center bg-white group hover:shadow-md transition-transform duration-500 rounded-md">
      <div className="p-4 rounded-[5px] flex flex-col items-center">
        <div>
          <div>
            {/* Image Container with Zoom Effect */}
            <div className="pb-[25px] flex w-full items-center">
              <div className="w-full overflow-hidden">
                <Image
                  src={imageUrl}
                  width={500}
                  height={300}
                  alt={title} 
                  style={{ objectFit: "cover" }}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105 rounded-md"
                />
              </div>
            </div>
            <div className="text-center font-poppins mb-5">
              {/* Heading */}
              <h4 className="text-gray-700 font-semibold text-center leading-10 font-poppins text-lg">
                {title}
              </h4>
              <h5 className="text-primaryColor italic font-medium text-left leading-10 poppins-font text-base">
                {subtitle}
              </h5>
              {/* Short Description */}
              <p className="card-description font-normal ">
                {desc}
              </p>
            </div>
          </div>
        </div>
     
      </div>
    </div>
  );
}

export default IndustriesCard;
