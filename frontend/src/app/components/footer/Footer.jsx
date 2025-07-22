"use client";
import { MdLocationOn } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";
import { CONTACT_INFO } from "@/utils/SITE_INFO";
import { scroller } from "react-scroll";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {  getStrapiMedia } from "@/lib/api";

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
    <div className="bg-gray-100 shadow-lg">
      {/* Footer 1st section - Offices */}
      <div className="relative grid grid-cols-1 lg:grid-cols-3 first-footer-bg max-lg:px-8 py-8 lg:max-w-[940px] xl:max-w-[1200px] 2xl:max-w-[1346px] lg:mx-auto xl:py-8 xl:px-0 mx-auto">
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
      </div>

      {/* Footer 2nd section - Main content */}
      <div className="bg-primaryColor">
        <div className="grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-4 py-8 max-lg:px-8 lg:max-w-[940px] xl:max-w-[1200px] 2xl:max-w-[1346px] lg:mx-auto xl:py-8 xl:px-0 mx-auto bg-transparent">
          {/* Logo and description */}
          <div className="flex flex-col gap-4 mt-2">
              <Image
                src={getStrapiMedia(whiteLogo.url)}
                width={200}
                height={100}
                alt="EyraTech logo"
                className="max-w-[180px]"
              />
              <p className="text-white mt-4 font-light text-sm tracking-wide whitespace-pre-line">
                {description}
              </p>
          </div>

          {/* Useful Links */}
          <div>
            <p className="footer-items-heading mb-6 max-sm:mt-6">Useful Links</p>
            <ul>
              <li className="text-white tracking-wider mb-4 cursor-pointer text-sm">
                <button onClick={() => router.push("/about-us")}>
                  <span className="hover-effect">About</span>
                </button>
              </li>
              <li className="text-white tracking-wider mb-4 cursor-pointer text-sm">
                <button onClick={() => scrollToSection("why-choose-us")}>
                  <span className="hover-effect">Why Choose Us</span>
                </button>
              </li>
              <li className="text-white tracking-wider mb-4 cursor-pointer text-sm">
                <button onClick={() => scrollToSection("contact")}>
                  <span className="hover-effect">Contact</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <p className="footer-items-heading mb-6 max-sm:mt-6">Industries</p>
            <ul>
              {industries.map((industry, index) => (
                <li
                  onClick={() => handleNavigation("industries")}
                  key={index}
                  className="text-white tracking-wider mb-4 cursor-pointer text-sm"
                >
                  <span className="hover-effect">{industry.industryShortTitle}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="footer-items-heading mb-6 max-sm:mt-6">Services</p>
            <ul>
              {services.map((service, index) => (
                <li
                  onClick={() => handleNavigation("services")}
                  key={index}
                  className="text-white tracking-wider mb-4 cursor-pointer text-sm"
                >
                  <span className="hover-effect">{service.shortTitle}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer 3rd section - Copyright */}
      <div className="bg-primaryColor">
        <div className="bg-primaryColor mx-auto lg:max-w-[940px] xl:max-w-[1200px] 2xl:max-w-[1346px] lg:mx-auto max-lg:px-8">
          <div className="bg-white h-[0.25px]"></div>
          <div className="py-6 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-white text-sm tracking-wider">
              Copyright © {new Date().getFullYear()}, EyraTech. All rights reserved.
            </p>
            <div className="flex flex-row gap-4 items-center mt-4 sm:mt-0">
              <Link
                href={`mailto:${CONTACT_INFO.email}`}
                className="border-[1px] border-white p-2 rounded-full items-start group cursor-pointer transition-all ease-in-out duration-150 hover:bg-white justify-center flex"
              >
                <MdEmail className="text-white text-[20px] group-hover:text-primaryColor" />
              </Link>
              <Link
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="border-[1px] border-white p-2 rounded-full items-start group cursor-pointer transition-all ease-in-out duration-150 hover:bg-white justify-center flex"
              >
                <FaLinkedinIn className="text-white text-[20px] group-hover:text-primaryColor" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;