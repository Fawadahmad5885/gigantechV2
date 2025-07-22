"use client";
import React from "react";
import OurStory from "./OurStory";
import Contact from "../contact/Contact";
import PartnerChoice from "./PartnerChoice";
import { scroller } from "react-scroll";
import CustomButton from "./CustomButton";
 function AboutUsClient({ aboutHeroData, partnerChoiceData,aboutStory,contactSectionHeader,footerSteps,contactForm }) {

  const { heading, description, Button,styledText  } = aboutHeroData

  const scrollToSection = (sectionId) => {
    scroller.scrollTo(sectionId, {
      smooth: true,
      duration: 500,
      offset: -85,
    });
  };  
  
  return (
    <div className="relative">
      {/* content container  */}
      <div className="mt-[14vh] lg:mt-[16vh] mb-[5%] px-5 font-poppins  text-center flex flex-col gap-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl tracking-wide  text-center  text-textColor mb-4">
          {heading}
        </h1>
        <p className="text-lg tracking-wide text-justify text-textColor lg:w-4/5 mx-auto mb-4">
        {description}
        </p>
        <h2 className="text-xl md:text-2xl text-center lg:w-3/5 mx-auto font-semibold mb-4">
          {/* Use styledText data instead of hardcoded values */}
          {styledText?.preText && (
            <>
              {styledText.preText}{" "}
              {styledText?.highLighted && (
                <span className="text-primaryColor">
                  {styledText.highLighted}
                </span>
              )}
              <br />
              {styledText?.postText}
            </>
          )}
        </h2>
        {Button && (
      <CustomButton 
        onClick={() => scrollToSection(Button.url)} 
        className="bg-primaryColor mx-auto w-fit border-primaryColor text-white"
      >
        {Button.title}
      </CustomButton>
    )}      </div>
      {/* <OurClients /> */}
      <PartnerChoice sectionData = {partnerChoiceData}   />
      <OurStory storyContent = {aboutStory} />
      <Contact headerData = {contactSectionHeader} steps = {footerSteps} contactForm = {contactForm}   />
    </div>
  );
}

export default AboutUsClient;
