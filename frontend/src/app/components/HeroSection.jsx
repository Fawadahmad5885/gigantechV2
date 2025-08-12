"use client";

import Link from "next/link";
import { Sparkles } from 'lucide-react';
import Image from "next/image";
import NeuralSphere from "./neural-sphere";
// import bg from "../.././../public/hero-section-bg.png"; // Removed GIF import

export default function HeroSection() {
return (
  <section className="relative h-[100vh] overflow-hidden rounded-b-3xl shadow-inner">
    {/* Gradient Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 opacity-40 z-0" />
    {/* Background Image */}
    <div className="absolute inset-0 w-full h-full pointer-events-none z-5 opacity-30">
      <Image
        src="/hero-section-bg2.png"
        alt="AI Background"
        fill
        className="object-cover object-center"
        quality={100}
      />
    </div>
    {/* Abstract Background Shapes */}
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50 z-10">
      <div className="absolute -top-10 -left-10 w-48 h-48 bg-white rounded-full mix-blend-multiply opacity-50 transform rotate-45"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white rounded-full mix-blend-multiply opacity-50 transform -rotate-30"></div>
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-white rounded-full mix-blend-multiply opacity-50"></div>
      <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-white rounded-lg mix-blend-multiply opacity-50 transform rotate-15"></div>
    </div>
    {/* Main Content Container */}
    <div className="container mx-auto flex flex-col md:flex-row items-center h-full pt-20 px-5 md:px-8 relative z-20">
      {/* Left Content - Text Section */}
      <div
        className="w-full md:w-2/3 flex flex-col justify-center"
        data-aos="fade-right"
        data-aos-anchor-placement="top-bottom"
        data-aos-duration="1000"
      >
        <p className="text-xl md:text-2xl text-gray-600 mb-4 animate-fade-in">
          Agile Software Development Company
        </p>
        <h1 className="text-4xl md:text-7xl font-medium text-custom-heading-blue mb-6 leading-tight animate-fade-in delay-100">
          Leading the <span className="text-custom-orange">AI</span>{" "}
          <span className="text-hero-revolution-blue">Revolution</span>
        </h1>
        <p className="text-2xl md:text-4xl text-gray-700 mb-10 animate-fade-in delay-200">
          Web, Mobile & Enterprise Solutions
        </p>
        <Link
          href="#"
          className="inline-flex items-center w-fit tracking-wide justify-center whitespace-nowrap rounded-full bg-primaryColor px-10 py-3 text-lg font-medium text-white shadow-lg transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-custom-orange focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 animate-fade-in delay-300"
        >
          Get Started
        </Link>
      </div>
      {/* Right Content - Rotating Sphere */}
      <div
        className="hidden md:flex md:w-1/2 h-full items-center justify-end"
        data-aos="fade-left"
        data-aos-duration="1000"
      >
        <div className="relative w-full h-full flex items-center justify-end">
          {/* Replaced Image with NeuralSphere component */}
          <NeuralSphere />
        </div>
      </div>
    </div>
  </section>
);
}
