// components/case-studies-components/CaseStudiesClient.js
'use client';

import Image from "next/image";
import { scroller } from 'react-scroll';
import CustomButton from "../about-page-components/CustomButton";
import CardsSection from "./CardsSection";
import Contact from "../contact/Contact";
import { getStrapiMedia } from "@/lib/api";

export default function CaseStudiesClient({ 
  heroSectionData, 
  contactSectionHeader, 
  contactForm, 
  caseStudiesCards 
}) {
  const { title, description, image, Button } = heroSectionData
  const imageUrl = getStrapiMedia(image?.url);

  const scrollToSection = (sectionId) => {
    scroller.scrollTo(sectionId, {
      smooth: true,
      duration: 500,
      offset: -85,
    });
  };

  return (
    <div className="lg:pt-[90px]">
      <div className="relative w-full h-[70vh] min-h-[340px] bg-cover bg-center bg-no-repeat">
        <Image
          src={imageUrl}
          alt={title || "Case Study Background"}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 flex flex-col justify-center component-width mx-auto items-start text-white max-lg:px-6 lg:mt-24">
          <div className="text-start font-poppins">
            <h1 className="text-[44px] align-text-top lg:text-[72px] lg:w-[70%] !leading-tight mb-[8px] md:text-6xl font-normal">
              {title || "Case Studies"}
            </h1>
            <p className="text-[16px] leading-[20px] mt-4 mb-[70px] font-light md:text-2xl">
              {description || "Discover our case studies"}
            </p>
            {Button && (
              <CustomButton 
                className="bg-white border-white text-[#262B3F] hover:bg-gray-100 transition-colors"
                onClick={() => scrollToSection('contact')}
              >
                {Button.title}
              </CustomButton>
            )}
          </div>
        </div>
      </div>
      <div>
        <CardsSection cards={caseStudiesCards} />
        <Contact
          id="contact"
          headerData={contactSectionHeader}
          contactForm={contactForm}
        />
      </div>
    </div>
  );
}