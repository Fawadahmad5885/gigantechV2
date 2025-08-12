"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import Contact from "../contact/Contact";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { scroller } from "react-scroll";
import CustomButton from "../about-page-components/CustomButton";
import NewsCard from "./NewsCard";
import { getStrapiMedia } from "../../../lib/api";
import Image from "next/image";

const NewsClient = ({
  headerData,
  newsData,
  contactSectionHeader,
  footerSteps,
  contactForm,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const newsRef = useRef(null);

  // Scroll to top of news section when page changes
  useEffect(() => {
    if (newsRef.current) {
      newsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPage]);
  console.log("Header Data", headerData);

  // Calculate pagination data
  const { paginatedData, totalPages, hasNextPage, hasPrevPage } =
    useMemo(() => {
      const sortedNews = (newsData || []).sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = sortedNews.slice(startIndex, endIndex) || [];
      const totalPages = Math.ceil((sortedNews?.length || 0) / itemsPerPage);

      return {
        paginatedData,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
      };
    }, [newsData, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (hasPrevPage) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
    }
  };

  const handleNext = () => {
    if (hasNextPage) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
    }
  };

  const { title, description, image } = headerData;
  const imageUrl = getStrapiMedia(image?.url);

  const scrollToSection = (sectionId) => {
    scroller.scrollTo(sectionId, {
      smooth: true,
      duration: 500,
      offset: -10,
    });
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show smart pagination with ellipsis
      if (currentPage <= 3) {
        // Show first 3 pages, ellipsis, and last page
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show first page, ellipsis, and last 3 pages
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Show first page, ellipsis, current page with neighbors, ellipsis, last page
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  return (
    <div className="bg-gray-100 ">
      {/* Hero Section for News Page */}
      <div className="relative w-full h-[100vh] min-h-[340px] bg-cover bg-center bg-no-repeat">
        <Image
          src={imageUrl}
          alt={title || "Case Study Background"}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col justify-center component-width mx-auto items-start text-white max-lg:px-6 lg:mt-24">
          <div className="text-start font-poppins">
            <h1 className="text-[44px] align-text-top lg:text-[72px] lg:w-[70%] !leading-tight mb-[8px] md:text-6xl font-normal">
              {title || "News Blogs & Events"}
            </h1>
            <p className="text-[16px] leading-[20px] mt-4 mb-[70px] font-light md:text-2xl">
              {description || "Discover our case studies"}
            </p>
            <CustomButton
              className=" border  border-white text-white hover:bg-gray-100 hover:text-textColor duration-300   transition-colors"
              onClick={() => scrollToSection("news-and-blogs-list")}
            >
              {"Learn More"}
            </CustomButton>
          </div>
        </div>
      </div>

      {/* News Section with Pagination */}
      <div id="news-and-blogs-list" ref={newsRef} className="py-16">
        <div className="component-width mx-auto max-lg:px-5  ">
          {/* News Cards */}
          <div className="grid grid-cols-1 mt-10 mx-auto component-width  md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {paginatedData.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className=" flex flex-col items-center space-y-4">
              {/* Pagination Info */}
              <div className="text-sm text-gray-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, newsData?.length || 0)} of{" "}
                {newsData?.length || 0} articles
              </div>

              {/* Pagination Buttons */}
              <div className="flex items-center space-x-1">
                {/* Previous Button */}
                <button
                  onClick={handlePrevious}
                  disabled={!hasPrevPage}
                  className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    hasPrevPage
                      ? "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 hover:border-gray-400"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                  }`}
                >
                  <ChevronLeft className="w-3 h-3 mr-1" />
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex items-center mx-2">
                  {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                      {page === "..." ? (
                        <span className="px-2 py-1 text-gray-400 text-sm">
                          ...
                        </span>
                      ) : (
                        <button
                          onClick={() => handlePageChange(page)}
                          className={`min-w-[32px] h-8 rounded-md text-sm font-medium transition-all duration-200 mx-0.5 ${
                            currentPage === page
                              ? "bg-secondaryColor text-white"
                              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          {page}
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  disabled={!hasNextPage}
                  className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    hasNextPage
                      ? "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 hover:border-gray-400"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                  }`}
                >
                  Next
                  <ChevronRight className="w-3 h-3 ml-1" />
                </button>
              </div>

              {/* Quick Navigation */}
              {totalPages > 10 && (
                <div className="flex items-center space-x-3 text-sm">
                  <span className="text-gray-500">Quick jump:</span>
                  <button
                    onClick={() => handlePageChange(1)}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    First
                  </button>
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Last
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="bg-white">
        <Contact
          id="contact"
          headerData={contactSectionHeader}
          steps={footerSteps}
          contactForm={contactForm}
        />
      </div>
    </div>
  );
};

export default NewsClient;
