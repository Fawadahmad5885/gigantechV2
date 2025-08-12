import React from "react";
import ServicesCard from "./ServicesCard";
import Image from "next/image";
import { getStrapiMedia } from "../../../lib/api";
export default function Services({ headerData }) {
  const { title, description, backgroundImage } = headerData;
  const serviceCards = headerData?.serviceCard || [];

  return (
    <div className="h-auto relative py-[5%]" id="services">
      <div className="">
        <div className="px-5 font-poppins text-center">
          <h2 className="heading-text text-textColor">{title}</h2>
          <p className="section-description">{description}</p>
        </div>
        <div className="mt-10  container md:px-8   card-container ">
          {serviceCards.map((service) => (
            <ServicesCard key={service.id} service={service} />
          ))}
        </div>
      </div>
      <div className="absolute opacity-10 inset-0 z-[-1]">
        {/* ✅ Dynamic Background Image */}
        <Image
          src={getStrapiMedia(backgroundImage.url)}
          alt="Services background"
          fill
          className="object-contain object-left"
          priority
        />
      </div>
    </div>
  );
}
