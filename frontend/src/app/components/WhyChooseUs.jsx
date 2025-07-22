"use client";
import React from "react";
import Image from "next/image";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import { getStrapiMedia } from "@/lib/api";
function WhyChooseUs({ aboutData }) {
  const { title, description, aboutImage } = aboutData;

  const router = useRouter();
  return (
    <div className="h-auto py-[5%]" id="why-choose-us">
      <div className="max-md:px-[20px] ">
        <div className="md:px-[20px]  z-20 text-center">
          {/* Container */}
          <div className="flex flex-col gap-14 md:flex-row md:max-w-[1020px]  lg:max-w-[1020px] mx-auto ">
            {/* Image container */}
            <div className="items-center w-full  overflow-hidden md:flex-1 flex">
              <Image
                src={getStrapiMedia(aboutImage.url)}
                width={1200}
                height={1200}
                alt="EyraTech platform card background image representing innovation and technology solutions."
                quality={100}
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                className="w-full h-full rounded-lg"
              />
            </div>
            {/* Content Container */}
            <div className="flex-1 flex flex-col items-start">
              <h1 className="heading-text lg:leading-[48px] text-textColor text-left mt-0">
                {title}
              </h1>
              <p className="text-textColor my-[15px] text-justify text-lg">
                {description}
              </p>
              <button
                className="group py-3 px-6 bg-gray-300 text-primaryColor rounded-md tracking-wider relative overflow-hidden max-sm:bg-primaryColor"
                onClick={() => router.push("/about-us")}
              >
                <span className="absolute inset-[-1px] bg-primaryColor transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
                <span className="relative group-hover:text-white max-sm:text-white text-black flex items-center gap-2 transition-colors duration-300">
                  {"Learn More"}
                  <LiaLongArrowAltRightSolid className="text-2xl" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
