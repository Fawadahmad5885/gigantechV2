"use client"
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getStrapiMedia } from "@/lib/api";
export default function CaseStudies({headerData,cards}) {
  const [showAll, setShowAll] = useState(false);
    const [initialDisplayCount, setInitialDisplayCount] = useState(3);

    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth >= 768) {
            setInitialDisplayCount(4);
          } else {
            setInitialDisplayCount(2);
          }
        };
    
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);

      const sortedCards = [...(cards || [])].sort((a, b) => {
    // Handle cases where order might be undefined (fallback to 0)
    const orderA = a.order ?? 0;
    const orderB = b.order ?? 0;
    return orderA - orderB;
  });

  const caseStudiesToDisplay = showAll
    ? sortedCards
    : sortedCards.slice(0, initialDisplayCount);

const { title, description, } = headerData
  return (
    <section className=" py-[5%] mx-auto max-lg:px-6">
      <div className=" mx-auto">
        {/* Header Section - Left Aligned */}
        <div className=" mb-12">
          <h2 className="heading-text text-center  mb-4">
          {title} 
          </h2>
          <p className="section-description text-center  text-gray-600 ">
           {description}
          </p>
        </div>

        {/* Cards Grid - 2x2 Layout */}
        <div className="grid grid-cols-1 component-width mx-auto lg:grid-cols-2 gap-6 mb-4  lg:mb-12">
          {caseStudiesToDisplay.map((item,index) => (
            <div
              data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      data-aos-duration="1000"
            style={{ boxShadow: '1px 1px 5px 0px #6b6b6b50' }}
              key={index}
              className="bg-gray-100   rounded-lg overflow-hidden cursor-pointer transition-all duration-500 group"
            >
              {/* Horizontal Card Layout */}
              <Link href={`/case-studies/${item.slug}`} className="flex flex-col border-black sm:flex-row h-full">
                {/* Image Section with Scale Animation */}
                <div className="sm:w-2/5 flex-shrink-0 ">
                  <div className="relative h-48 sm:h-full   overflow-hidden border border-gray-200">
                    <Image
                      src={getStrapiMedia(item.image?.formats?.medium?.url)}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="sm:w-3/5 max-lg:p-6  p-5  flex flex-col justify-between">
                  <div>
                    <div className="mb-3">
                      <h3 className="font-poppins text-lg text-textColor font-medium mb-2 group-hover:text-primaryColor transition-colors duration-300 line-clamp-2">
                        {item.title}
                      </h3>
                      <span className="inline-block text-base  text-primaryColor rounded-full ">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-textColor  leading-relaxed mb-4 line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Learn More Button - Right Aligned with Amazing Animation */}
                  <div className="mt-auto flex justify-end">
                    <div
                      className="inline-flex items-center   text-textColor mt-2   group-hover:text-primaryColor   rounded-lg transition-colors duration-300 group"
                    >
                      <span className="text-base">Read more</span>
                      <ArrowRight className="w-5 h-5 ml-2 text-textColor group-hover:text-primaryColor  transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {!showAll && cards.length > initialDisplayCount && (
          <div className="text-center mt-8">
            <Link
              href="/case-studies"
              className="inline-flex items-center px-8 py-3 text-textColor hover:text-primaryColor text-lg font-medium rounded-lg transition-colors duration-300 group"
            >
              <span>View All </span>
              <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
