"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TfiMenu } from "react-icons/tfi";
import { Box, Divider, Drawer, List, ListItem, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { MdEmail } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";
import { CONTACT_INFO } from "@/utils/SITE_INFO";
import Link from "next/link";
import { scroller } from "react-scroll";
import { getStrapiMedia } from "@/lib/api";

export default function Header({headerData}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    scroller.scrollTo(sectionId, {
      smooth: true,
      duration: 500,
      offset: -85,
    });
  };

  const handleNavigation = (item) => {
    const sectionId = item.SectionId;
    const type = item.linkType;

    if (type === "page") {
      router.push(`/${sectionId}`);
    } else {
      const currentPath = window.location.pathname;
      if (currentPath !== "/") {
        router.push("/");
        setTimeout(() => scrollToSection(sectionId), 500);
      } else {
        scrollToSection(sectionId);
      }
    }
  };
  const logoUrl = headerData?.logo?.url ? getStrapiMedia(headerData.logo.url) : null;
  const drawer = (
    <Box sx={{ padding: "0 10px", marginLeft: "10px" }}>
      <Typography
        variant="h6"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px 0px",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {logoUrl && (
          <Image
            src={logoUrl}
            alt="Logo"
            width={120}
            height={30}
            style={{ objectFit: "contain" }}
            onClick={() => router.push("/")}
          />
        )}
        <TfiMenu onClick={() => setMobileOpen(false)} className="text-xl" />
      </Typography>
      <Divider />
      <List className="border-b">
        {headerData?.navItems?.map((item) => (
          <ListItem key={item.id} disablePadding>
            <button
              className="my-2 text-primaryColor text-lg tracking-wider font-medium"
              onClick={() => {
                setMobileOpen(false);
                handleNavigation(item);
              }}
            >
              <p>{item.Label}</p>
            </button>
          </ListItem>
        ))}
      </List>

      <div className="flex flex-row gap-4 py-[12px] items-center">
        <Link
          href={`mailto:${CONTACT_INFO.email}`}
          className="shadow-md p-2 rounded-full"
        >
          <MdEmail className="text-primaryColor text-[20px]" />
        </Link>
        <Link
          href={CONTACT_INFO.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="shadow-md p-2 rounded-full"
        >
          <FaLinkedinIn className="text-primaryColor text-[20px]" />
        </Link>
      </div>
    </Box>
  );

  return (
    <header
      className={`z-50 fixed w-full top-0 left-0 transition-all duration-300 text-black bg-white ${
        isScrolled ? "bg-opacity-100" : "bg-opacity-100"
      }`}
      style={{ boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)" }}
    >
      {/* Mobile Header */}
      <div className="w-full py-4 px-5 mx-auto flex justify-between items-center relative lg:hidden">
        {logoUrl && (
          <Image
            src={logoUrl}
            alt="Logo"
            width={120}
            height={30}
            onClick={() => router.push("/")}
            style={{ objectFit: "contain" }}
          />
        )}
        <TfiMenu
          title="Menu"
          onClick={() => setMobileOpen(true)}
          className="text-xl text-black cursor-pointer"
        />
      </div>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        anchor="right"
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": { width: "75%" },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop Header */}
      <div className="component-width lg:mx-auto relative hidden lg:flex w-full py-6">
        <div className="flex w-full flex-row justify-between p-2">
          {logoUrl && (
           <Image
              src={logoUrl}
              quality={100}
              fill
              onClick={() => window.location.replace("/")}
              alt="EyraTech Logo"
              style={{ objectFit: "contain" }}
              className="h-[40px] p-2  cursor-pointer max-w-fit z-50"
            />
          )}
          <nav className="flex-grow flex justify-end items-center">
            <ul className="flex gap-10 font-poppins text-lg text-black">
              {headerData?.navItems?.map((item) => (
                <li
                  key={item.id}
                  className="capgemini-nav-item hover:text-primaryColor cursor-pointer"
                  onClick={() => handleNavigation(item)}
                >
                  {item.Label}
                  <span className="block h-[2px] bg-secondaryColor mt-[1px] w-1/2"></span>
                </li>
                
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}