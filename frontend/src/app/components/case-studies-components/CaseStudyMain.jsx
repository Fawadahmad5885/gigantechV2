// app/components/case-studies-components/CaseStudyMain.jsx
"use client";
import ReactMarkdown from "react-markdown";
import { scroller } from "react-scroll";
import Image from "next/image";
import CaseStudyCarousel from "@/app/components/case-studies-components/CaseStudyCarsousel";
import Contact from "@/app/components/contact/Contact";
import CustomButton from "@/app/components/about-page-components/CustomButton";
import { getStrapiMedia } from "../../../lib/api";
export default function CaseStudyMain({
  caseStudy,
  contactSectionHeader,
  contactForm,
}) {
  const {
    title,
    category,
    region,
    content,
    caseStudyStatus,
    technologies,
    description,
    image,
    aboutClient,
    caseStudyCarousel,
  } = caseStudy;

  const scrollToSection = (sectionId) => {
    scroller.scrollTo(sectionId, {
      smooth: true,
      duration: 500,
      offset: -85,
    });
  };

  const imageUrl = image?.data?.attributes?.url
    ? getStrapiMedia(image.data.attributes.url)
    : image?.url
    ? getStrapiMedia(image.url)
    : "/fallback-image.jpg";

  return (
    <div className="">
      <div className="relative w-full h-[100vh] min-h-[340px] bg-cover bg-center bg-no-repeat">
        {/* Background Image */}
        <Image
          src={imageUrl || "/placeholder.svg?height=1080&width=1920"}
          alt={title || "Case Study Background"}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Alternative gradient overlay - uncomment to use instead */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div> */}

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center component-width mx-auto items-start text-white max-lg:px-6 lg:mt-24 z-10">
          <div className="text-start font-poppins">
            <h1 className="text-[44px] align-text-top lg:text-[72px] lg:w-[70%] !leading-tight mb-[8px] md:text-6xl font-normal drop-shadow-lg">
              {title || "Case Studies"}
            </h1>
            <div className="text-[16px] pose leading-[20px] mt-4 mb-[70px] font-light md:text-2xl drop-shadow-md">
              <ReactMarkdown>
                {description || "Discover our case studies"}
              </ReactMarkdown>
            </div>
            <CustomButton
              className=" border  border-white text-white hover:bg-gray-100 hover:text-textColor duration-300   transition-colors"
              onClick={() => scrollToSection?.("contact")}
            >
              {"Get Started"}
            </CustomButton>
          </div>
        </div>
      </div>
      <div>
        {/* Descripition */}
        <div className="bg-gray-100">
          <div className="flex flex-col justify-center component-width mx-auto items-start max-lg:px-6 py-14">
            <div className="grid grid-cols-3  md:flex md:gap-20 flex-row md:justify-start w-full items-center ">
              {/* Industry */}
              <div className="flex flex-col gap-1 lg:gap-3 w-fit">
                <h1 className="text-gray-700 text-left text-sm md:text-base lg:text-lg">
                  Industry
                </h1>
                <p className="font-medium text-xl lg:text-2xl xl:text-xl text-secondaryColor ">
                  {category}
                </p>
              </div>

              {/* Region */}
              <div className="flex flex-col gap-1 lg:gap-3 w-fit">
                <h1 className="text-gray-700 text-left text-sm md:text-base lg:text-lg ">
                  Region
                </h1>
                <p className="font-medium text-xl lg:text-2xl xl:text-xl text-secondaryColor">
                  {region}
                </p>
              </div>

              {/* Status */}
              <div className="flex flex-col gap-1 lg:gap-3 w-fit">
                <h1 className="text-gray-700 text-left text-sm md:text-base lg:text-lg">
                  Status
                </h1>
                <p className="font-medium text-xl lg:text-2xl xl:text-xl text-secondaryColor">
                  {caseStudyStatus}
                </p>
              </div>

              {/* Technologies */}
              <div className="flex flex-col gap-1 lg:gap-3 w-fit max-md:mt-8">
                <h1 className="text-gray-700 text-left text-sm md:text-base lg:text-lg     ">
                  Technologies
                </h1>
                <p className="font-medium text-xl lg:text-2xl xl:text-xl text-secondaryColor ">
                  {technologies}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Descripition */}
        <div className="">
          <div className="flex flex-col justify-center component-width mx-auto items-start max-lg:px-6 pt-12">
            <h1 className="font-semibold text-xl lg:text-2xl xl:text-2xl text-secondaryColor">
              Client
            </h1>
            <p className=" prose md:w-1/2  w-full lg:w-1/3 text-gray-700 text-left text-sm md:text-base lg:text-lg whitespace-pre-wrap  mt-4 ">
              <i>{aboutClient}</i>
            </p>
          </div>
        </div>
        {/* Sections */}
        <div className="bg-gray-100 p-6 rounded-lg  my-6  component-width mx-auto">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
        {/* Carsousel */}
        <div className="bg-gray-100 pt-24 ">
          <div className="flex flex-col justify-center component-width mx-auto  items-start max-lg:px-6 overflow-x-hidden pb-24">
            {caseStudyCarousel && (
              <CaseStudyCarousel items={caseStudyCarousel} />
            )}
          </div>
        </div>
      </div>

      <Contact
        id="contact"
        headerData={contactSectionHeader}
        contactForm={contactForm}
      />
    </div>
  );
}
