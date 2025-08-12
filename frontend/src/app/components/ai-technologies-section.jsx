"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Brain,
  Sparkles,
  Cpu,
  Eye,
  Cloud,
  Blocks,
  CheckCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback } from "react";

const images = {
  aiBg: "/assets/images/ai-technologies-images/ai-background.png",
  mlBg: "/assets/images/ai-technologies-images/machine-learning-bg.png",
  genaiBg: "/assets/images/ai-technologies-images/generative-ai-bg.png",
  cvBg: "/assets/images/ai-technologies-images/computer-vision-bg.png",
  iotBg: "/assets/images/ai-technologies-images/iot-bg.png",
  bcBg: "/assets/images/ai-technologies-images/blockchain-bg.png",
};
const icons = {
  aiIcon: "/assets/images/ai-technologies-images/ai-icon.png",
  mlIcon: "/assets/images/ai-technologies-images/ml-icon.png",
  genaiIcon: "/assets/images/ai-technologies-images/generative-ai-icon.png",
  cvIcon: "/assets/images/ai-technologies-images/computer-vision-icon.png",
  iotIcon: "/assets/images/ai-technologies-images/iot-icon.png",
  bcIcon: "/assets/images/ai-technologies-images/blockchain-icon.png",
};

const technologies = [
  {
    id: "artificial-intelligence",
    name: "Artificial Intelligence",
    icon: icons.aiIcon,
    image: images.aiBg,
    description:
      "Artificial Intelligence empowers systems to learn, reason, and make decisions—driving automation and smarter experiences across industries.",
    services: [
      "AI Strategy & Consulting",
      "Natural Language Processing (NLP)",
      "AI-Powered Automation",
    ],
  },
  {
    id: "machine-learning",
    name: "Machine Learning",
    icon: icons.mlIcon,
    image: images.mlBg,
    description:
      "Machine learning enables apps to learn from data and improve over time, delivering personalization and better user experiences.",
    services: [
      "Machine Learning Consulting",
      "Neural Network Development",
      "Machine Learning-as-a-Service",
    ],
  },
  {
    id: "generative-ai",
    name: "Generative AI",
    icon: icons.genaiIcon,
    image: images.genaiBg,
    description:
      "Generative AI creates new content—from text and images to audio and code—unlocking novel possibilities in creativity and automation.",
    services: [
      "Generative Model Development",
      "Content Generation Solutions",
      "AI‑driven Design & Art",
    ],
  },
  {
    id: "computer-vision",
    name: "Computer Vision",
    icon: icons.cvIcon,
    image: images.cvBg,
    description:
      "Computer Vision lets systems understand images and video, powering recognition, inspection, and real‑time visual analytics.",
    services: [
      "Image & Video Analysis",
      "Facial Recognition Systems",
      "Object Detection & Tracking",
    ],
  },
  {
    id: "iot",
    name: "IoT",
    icon: icons.iotIcon,
    image: images.iotBg,
    description:
      "IoT connects devices to collect and exchange data—enabling predictive maintenance, smart environments, and operational efficiency.",
    services: [
      "IoT Device Integration",
      "Smart Home & City Solutions",
      "Industrial IoT (IIoT)",
    ],
  },
  {
    id: "blockchain",
    name: "Blockchain",
    icon: icons.bcIcon,
    image: images.bcBg,
    description:
      "Blockchain provides secure, transparent, and decentralized ledgers—ideal for finance, supply chains, and verifiable data exchange.",
    services: [
      "Blockchain Development",
      "Smart Contract Auditing",
      "Decentralized Applications (dApps)",
    ],
  },
];

export default function AiTechnologiesSection() {
  const [activeTechId, setActiveTechId] = useState("machine-learning");
  const activeIndex = useMemo(
    () =>
      Math.max(
        0,
        technologies.findIndex((t) => t.id === activeTechId)
      ),
    [activeTechId]
  );
  const activeTech = technologies[activeIndex];

  // Keyboard navigation for accessibility (Left/Right arrows)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") {
        setActiveTechId(
          technologies[(activeIndex + 1) % technologies.length].id
        );
      } else if (e.key === "ArrowLeft") {
        setActiveTechId(
          technologies[
            (activeIndex - 1 + technologies.length) % technologies.length
          ].id
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex]);

  // Parallax + spotlight interactions
  const cardRef = useRef(null);
  const bgParallaxRef = useRef(null);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <h2 className="heading-text text-textColor ">
          Innovate and Scale with Next-Gen Tech Solutions
        </h2>
        <p className="section-description">
          Innovative technologies are shaping the future of app development.
          Explore the stack powering modern, intelligent products.
        </p>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="AI Technologies"
          className="flex flex-row justify-between border-b-2 mt-10 lg:grid-cols-6 gap-2  mb-10"
        >
          {technologies.map((tech) => {
            const isActive = tech.id === activeTechId;
            return (
              <button
                key={tech.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tech.id}`}
                onClick={() => setActiveTechId(tech.id)}
                className={`relative flex items-center justify-center   gap-2 md:gap-3 rounded-md p-3 md:p-4 font-poppins text-sm md:text-lg font-medium transition-all duration-300 
        ${isActive ? "bg-white services-card" : "text-gray-800 "}
      `}
              >
                <div className={`w-6 h-6 md:w-8 md:h-8 relative `}>
                  <Image
                    src={tech.icon}
                    alt={`${tech.name} icon`}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="whitespace-nowrap">{tech.name}</span>
              </button>
            );
          })}
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTech.id}
              ref={cardRef}
              role="tabpanel"
              id={`panel-${activeTech.id}`}
              aria-labelledby={activeTech.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-xl shadow-xl mx-auto min-h-[520px] md:min-h-[560px] text-left"
              style={{
                // Subtle mouse spotlight
                background:
                  "radial-gradient(220px circle at var(--spot-x) var(--spot-y), rgba(255,255,255,0.10), transparent 60%)",
              }}
            >
              {/* Background image with parallax and Ken Burns entrance */}
              <motion.div
                ref={bgParallaxRef}
                className="absolute inset-0 will-change-transform"
                initial={{ scale: 1.08, opacity: 0.85 }}
                animate={{ scale: 1.05, opacity: 0.95 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <Image
                  src={activeTech.image || "/placeholder.svg"}
                  alt={`${activeTech.name} background`}
                  fill
                  priority
                  className="object-cover object-center"
                />
              </motion.div>

              {/* Dark gradient overlays for readability */}
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-transparent" />

              {/* Content */}
              <div className="relative z-10 p-6 md:p-12 flex h-full transform-gpu will-change-transform">
                <div className="w-full md:w-1/2 self-center">
                  <motion.h3
                    className="text-3xl md:text-4xl font-bold text-white mb-4"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.35 }}
                  >
                    {activeTech.name}
                  </motion.h3>

                  <motion.p
                    className="text-white/90 text-base md:text-lg leading-relaxed mb-6"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.35 }}
                  >
                    {activeTech.description}
                  </motion.p>

                  <motion.ul
                    className="space-y-3 mb-8"
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: {
                        transition: {
                          staggerChildren: 0.05,
                          staggerDirection: -1,
                        },
                      },
                      show: { transition: { staggerChildren: 0.08 } },
                    }}
                  >
                    {activeTech.services.map((service, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center text-white text-base md:text-lg"
                        variants={{
                          hidden: { opacity: 0, x: -10 },
                          show: { opacity: 1, x: 0 },
                        }}
                      >
                        <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                        {service}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
