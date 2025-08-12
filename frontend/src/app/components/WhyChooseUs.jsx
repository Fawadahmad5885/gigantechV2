"use client";
import React from "react";
import Image from "next/image";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import { getStrapiMedia } from "../../lib/api";
function WhyChooseUs({ aboutData }) {
  const { title, description, aboutImage } = aboutData;

  const router = useRouter();
  return (
    <div
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      data-aos-duration="1000"
      className="h-auto py-[5%]"
      id="why-choose-us"
    >
      <div className="max-md:px-[20px] ">
        <div className=" z-20 text-center">
          {/* Container */}
          <div className="flex flex-col gap-14 md:flex-row container md:px-8   mx-auto ">
            {/* Image container */}
            <div className="items-center w-full  overflow-hidden md:flex-1 flex">
              <Image
                src={getStrapiMedia(aboutImage.url)}
                width={1200}
                height={1200}
                alt="Smach Stack platform card background image representing innovation and technology solutions."
                quality={100}
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                className="w-full h-full object-fit rounded-lg"
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
                className=" text-secondaryColor  border-secondaryColor  hover:bg-secondaryColor hover:text-white transition-all duration-300 flex items-center gap-2 disabled:opacity-50 px-10 py-4 text-[14px] leading-[16px] rounded-md tracking-wider border"
                onClick={() => router.push("/about-us")}
              >
                {"Learn More"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
