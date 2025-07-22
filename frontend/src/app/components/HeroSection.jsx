"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CustomButton from "./about-page-components/CustomButton";
import { getStrapiMedia } from "@/lib/api";

function HeroSection({ items }) {
  const router = useRouter();
  const handleButtonClick = (url) => {
    if (url.startsWith("http")) {
      // Open external links in new tab
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      // Handle internal navigation
      router.push(url);
    }
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 8000,
    pauseOnHover: true,
    dotsClass: "slick-dots custom-dots",
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <Slider {...settings} className="w-full h-full">
        {items.map((slide, index) => (
          <div key={index} className="w-full h-screen">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 w-full h-full">
                {slide.video ? (
                  <video
                    className="object-cover w-full h-full"
                    src={getStrapiMedia(slide.video.url)}
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-label={`Video slide ${index + 1}`}
                  ></video>
                ) : (
                  slide.image && (
                    <Image
                      src={getStrapiMedia(slide.image.url)}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  )
                )}
                <div className="absolute inset-0 bg-black bg-opacity-30" />
              </div>

              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col justify-center component-width mx-auto items-start text-white max-lg:px-6 lg:mt-24">
                <div className=" text-start font-poppins">
                  <h1 className="text-[44px] align-text-top lg:text-[72px] lg:w-[70%]  !leading-tight mb-[8px] md:text-6xl font-normal">
                    {slide.title}
                  </h1>
                  <p className="text-[16px] leading-[20px] mt-4 mb-[70px] font-light md:text-2xl">
                    {slide.subtitle}
                  </p>
                  {slide.Button && (
                    <CustomButton
                      onClick={() => handleButtonClick(slide.Button.url)}
                      className="bg-white border-white text-[#262B3F] hover:bg-gray-100 transition-colors"
                    >
                      {slide.Button.title}
                    </CustomButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Tailwind custom styles */}
      <style jsx global>{`
        .slick-dots {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex !important;
          justify-content: center;
          align-items: center;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .slick-dots li {
          margin: 0 5px;
        }

        .slick-dots li button:before {
          font-size: 10px;
          color: #ffffff;
          opacity: 0.5;
          transition: opacity 0.3s ease-in-out;
        }

        .slick-dots li.slick-active button:before {
          opacity: 1;
          color: #ffffff;
        }
      `}</style>
    </div>
  );
}

export default HeroSection;
