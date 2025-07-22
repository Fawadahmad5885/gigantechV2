import React from "react";

const OurStory = ({storyContent}) => {

  const {heading, subheading, firstParagraph, secondParagraph} = storyContent
  
  return (
    <div className="bg-primaryColor p-8 lg:p-16  ">
      <div className="bg-transparent flex flex-col gap-6  lg:gap-12  w-full lg:max-w-[940px] xl:max-w-[1200px]  2xl:max-w-[1346px] lg:mx-auto  ">
        <h2 className="heading-text text-center !text-white">
          {heading}
        </h2>
        <p className="text-lg text-center font-poppins tracking-wider font-semibold text-white">
          {subheading}
        </p>
        <p className="text-left text-white tracking-wider text-lg font-poppins  ">
          {firstParagraph}
        </p>
        <p className="text-left text-white tracking-wider text-lg font-poppins">
          {secondParagraph}
        </p>
      </div>
    </div>
  );
};

export default OurStory;
