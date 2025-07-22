import { getStrapiMedia } from "@/lib/api";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CaseStudyCard = ({
  isFeatured,
  img,
  title,
  category,
  desc,
  CardButton,
  slug,
}) => {
  const imageUrl = img ? getStrapiMedia(img) : "/fallback-image.jpg";

  return (
    <Link
      key={slug}
      href={`/case-studies/${slug}`}
      className={`flex flex-col bg-white max-sm:bg-gray-100 group shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] hover:shadow-none  transition-[box-shadow,transform] duration-500 ease-in-out rounded-md ${
        isFeatured ? "md:flex-row h-full" : "h-full"
      }`}
    >
      <div className={`overflow-hidden ${isFeatured ? "md:w-1/2" : "w-full"}`}>
        <Image
          src={imageUrl}
          width={isFeatured ? 800 : 500}
          height={isFeatured ? 400 : 300}
          alt={title}
          style={{ objectFit: "cover" }}
          className={`w-full h-full group-hover:scale-105 transition-transform duration-300  ${
            isFeatured
              ? "rounded-t-md md:rounded-l-md md:rounded-tr-none"
              : "rounded-t-md"
          }`}
        />
      </div>
      <div
        className={`flex max-sm:bg-gray-100 flex-col ${
          isFeatured ? "md:w-1/2 p-6 md:p-8" : "p-6"
        } flex-grow`}
      >
        <div className="flex flex-row justify-between items-center">

           <p
          className={`text-primaryColor medium text-left ${
            isFeatured ? "mb-4 text-lg" : "mb-2 text-base"
          } poppins-font`}
          >
          {category}
        </p>
          </div>
        <h3
          className={`text-gray-700 font-semibold text-left mb-4 font-poppins ${
            isFeatured ? "text-xl md:text-2xl" : "text-lg"
          }`}
        >
          {title}
        </h3>
     
        <p
          className={`text-gray-700 text-left text-sm md:text-base lg:text-lg  font-normal mb-4 ${
            isFeatured ? "" : "flex-grow"
          }`}
        >
          {desc}
        </p>

        <div
          className="inline-flex items-center   text-gray-900  group-hover:text-primaryColor   rounded-lg transition-colors duration-300 group"
        >
          <span>Read more</span>
          <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
};

export default CaseStudyCard;
