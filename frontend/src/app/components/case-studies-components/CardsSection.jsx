"use client";
import React, { useEffect, useState } from "react";
import CaseStudyCard from "./CaseStudyCard";
import { ArrowRight } from "lucide-react";

const CardsSection = ({ cards }) => {
  const [showAll, setShowAll] = useState(false);
  const [initialDisplayCount, setInitialDisplayCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setInitialDisplayCount(6);
      } else {
        setInitialDisplayCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sort cards by order field in ascending order
  const sortedCards = [...(cards || [])].sort((a, b) => {
    // Handle cases where order might be undefined (fallback to 0)
    const orderA = a.order ?? 0;
    const orderB = b.order ?? 0;
    return orderA - orderB;
  });

  const caseStudiesToDisplay = showAll
    ? sortedCards
    : sortedCards.slice(0, initialDisplayCount);

  return (
    <div className="h-auto py-[5%] bg-gray-100" id="industries">
      <div className="component-width mx-auto">
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2  max-lg:px-5 gap-6 items-stretch">
          {caseStudiesToDisplay.map((item) => (
            <div
              key={item.slug}
              className={item.order === 1 ? "md:col-span-2  h-auto" : "h-full"}
            >
              <CaseStudyCard
                isFeatured={item.order === 1}
                img={item.image?.formats?.medium?.url}
                title={item.title}
                category={item.category}
                desc={item.description}
                CardButton={item.CardButton}
                slug={item.slug}
              />
            </div>
          ))}
        </div>
        {!showAll && cards.length > initialDisplayCount && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center px-8 py-3 text-textColor hover:text-secondaryColor text-lg font-medium rounded-lg transition-colors duration-300 group"
            >
              <span>View All </span>
              <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default CardsSection;
