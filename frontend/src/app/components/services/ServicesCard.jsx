"use client";
import { getStrapiMedia } from "@/lib/api";
// will change it later to server side
import Image from "next/image";
import { useRouter } from "next/navigation";

function ServicesCard({ service }) {
  const imageUrl = getStrapiMedia(service.image?.url);
  // const router = useRouter()
  return (
    <div
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom" 
      data-aos-duration="1000"
      className="group rounded-2xl p-[30px] flex flex-row-reverse bg-white services-card hover:scale-105 transition-all duration-300 ease-in-out "
    >
      {/* Container for icon */}
      <div className="md:w-[120px] md:h-[120px] w-[70px] h-[70px] flex items-start justify-center ml-1 md:p-7 p-4 bg-gray-100 shadow-sm rounded-full">
        <Image
          alt={service.title || "Service image"}
          width={100}
          height={100}
          src={imageUrl}
          className="object-cover"
          // onError={(e) => {
          //   e.target.src = '/fallback-image.jpg';
          // }}
        />
      </div>

      {/* Container for contents */}
      <div className="flex flex-col mr-auto  gap-4 pb-4 w-4/6">
        <h2 className="text-start font-poppins text-lg font-medium group-hover:text-secondaryColor">
          {service.title}
        </h2>
        <p className="card-description font-normal">{service.description}</p>
      </div>
    </div>
  );
}

export default ServicesCard;
