"use client";
import { MdLocationOn } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";
import { CONTACT_INFO } from "../../../utils/SITE_INFO";
import { scroller } from "react-scroll";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {  getStrapiMedia } from "../../../lib/api";

function Footer({ footerData, services, industries }) {

  const officesCards = footerData?.officesCard || [];
  const {description, whiteLogo} = footerData
  const router = useRouter();


  const scrollToSection = (sectionId) => {
    scroller.scrollTo(sectionId, {
      smooth: true,
      duration: 500,
      offset: -85,
    });
  };

  const handleNavigation = (item) => {
    const sectionId = item.toLowerCase().replace(" ", "-");
    const currentPath = window.location.pathname;

    if (currentPath !== "/") {
      router.push("/");
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 500);
    } else {
      scrollToSection(sectionId);
    }
  };


  return (
    <div className=" shadow-lg">
      {/* Footer 1st section - Offices */}
      {/* <div className="relative grid grid-cols-1 lg:grid-cols-2 first-footer-bg max-lg:px-5 py-8 component-width  lg:mx-auto xl:py-8 xl:px-0 mx-auto">
        {officesCards.map((office) => (
          <div key={`${office.id}-${office.heading}`} className="flex flex-col max-md:mb-8">
            <div className="flex flex-row items-center gap-2">
              {office.flagImage?.url && (
                <Image
                  src={getStrapiMedia(office.flagImage.url)}
                  width={100}
                  height={100}
                  alt={`${office.title}`}
                  className="w-8 rounded-sm shadow-sm"
                />
              )}
              <p className="text-textColor font-semibold text-lg">
                {office.heading}
              </p>
            </div>
            <div>
              <p className="text-primaryColor ml-10">{office.subHeading}</p>
            </div>
            <div className="flex flex-row items-center text-textColor ml-2 hover:text-primaryColor cursor-pointer mt-2">
              <MdLocationOn className="text-lg" />
              <p className="text-sm ml-[14px]">{office.location}</p>
            </div>
            <div className="pl-4 mt-4 mx-2 shadow-md z-10 rounded-xl">
              {office.mapUrl && (
                <iframe
                  src={office.mapUrl}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </div>
          </div>
        ))}
      </div> */}

      {/* Footer 2nd section - Main content */}
      <div className="bg-white">
        <div className="grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-5 py-8 max-lg:px-5 container md:px-8  lg:mx-auto xl:py-8  mx-auto bg-transparent">
          {/* Logo and description */}
          <div className="flex flex-col justify-start  gap-4 mt-2">
              <Image
                src="/header-logo.png"
                quality={100}
                width={240}
                height={100}
                onClick={() => router.push("/")}
                alt="Logo"
                style={{ objectFit: "contain" }}
                className="max-md:w-40  object-contain"
              />
              <p className="text-textColor mt-4 font-light text-sm tracking-wide whitespace-pre-line">
                {description}
              </p>
          </div>

          {/* Useful Links */}
          <div>
            <p className="footer-items-heading text-primaryColor mb-6 max-sm:mt-6">Useful Links</p>
            <ul>
              <li className="text-textColor tracking-wider mb-4 cursor-pointer text-base">
                <button onClick={() => router.push("/about-us")}>
                  <span className="hover:text-primaryColor duration-150">About</span>
                </button>
              </li>
              <li className="text-textColor tracking-wider mb-4 cursor-pointer text-base">
                <button onClick={() => scrollToSection("why-choose-us")}>
                  <span className="hover:text-primaryColor duration-150">Why Choose Us</span>
                </button>
              </li>
              <li className="text-textColor tracking-wider mb-4 cursor-pointer text-base">
                <button onClick={() => scrollToSection("contact")}>
                  <span className="hover:text-primaryColor duration-150">Contact</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <p className="footer-items-heading text-primaryColor mb-6 max-sm:mt-6">Insights</p>
            <ul>
              <li className="text-textColor tracking-wider mb-4 cursor-pointer text-base">
                <button onClick={() => router.push("/case-studies")}>
                  <span className="hover:text-primaryColor duration-150">Case Studies</span>
                </button>
              </li>
              <li className="text-textColor tracking-wider mb-4 cursor-pointer text-base">
                <button onClick={() => scrollToSection("why-choose-us")}>
                  <span className="hover:text-primaryColor duration-150">Blogs & Events</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <p className="footer-items-heading text-primaryColor  mb-6 max-sm:mt-6">Industries</p>
            <ul>
              {industries.map((industry, index) => (
                <li
                  onClick={() => handleNavigation("industries")}
                  key={index}
                  className="text-textColor tracking-wider mb-4 cursor-pointer text-base"
                >
                  <span className="hover:text-primaryColor duration-150">{industry.industryShortTitle}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="footer-items-heading text-primaryColor mb-6 max-sm:mt-6">Services</p>
            <ul>
              {services.map((service, index) => (
                <li
                  onClick={() => handleNavigation("services")}
                  key={index}
                  className="text-textColor tracking-wider mb-4 cursor-pointer text-base"
                >
                  <span className="hover:text-primaryColor duration-150">{service.shortTitle}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer 3rd section - Copyright */}
      <div className="bg-slate-50">
        <div className=" mx-auto container md:px-8 lg:mx-auto max-lg:px-8">
          <div className="bg-primaryColor h-[0.25px]"></div>
          <div className="py-6 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-primaryColor text-sm tracking-wider">
              Copyright © {new Date().getFullYear()}, Gigantech. All rights reserved.
            </p>
            <div className="flex flex-row gap-4 items-center mt-4 sm:mt-0">
              <Link
                href={`mailto:${CONTACT_INFO.email}`}
                className="border-[1px] border-primaryColor p-2 rounded-full items-start group cursor-pointer transition-all ease-in-out duration-150 hover:bg-primaryColor justify-center flex"
              >
                <MdEmail className="text-primaryColor text-[20px] group-hover:text-white" />
              </Link>
              <Link
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="border-[1px] border-primaryColor p-2 rounded-full items-start group cursor-pointer transition-all ease-in-out duration-150 hover:bg-primaryColor justify-center flex"
              >
                <FaLinkedinIn className="text-primaryColor text-[20px] group-hover:text-white" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;