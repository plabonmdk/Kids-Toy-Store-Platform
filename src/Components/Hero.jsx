import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router";

import heroImg1 from "../assets/Untitled design (1).png";
import heroImg2 from "../assets/Untitled design (2).png";
import heroImg3 from "../assets/Untitled design (3).png";
import heroImg4 from "../assets/Untitled design (4).png";
import heroImg5 from "../assets/Untitled design (5).png";
import heroImg6 from "../assets/Untitled design.png";

const Hero = () => {
 
  const slides = [
    { img: heroImg1, title: "Toy Car Adventure", desc: "Zoom into fun with our mini cars." },
    { img: heroImg2, title: "Building Blocks", desc: "Stack, build, and create endless possibilities." },
    { img: heroImg3, title: "Cuddly Plushies", desc: "Soft friends for little hearts." },
    { img: heroImg4, title: "Puzzle Time", desc: "Challenge your mind while having fun." },
    { img: heroImg5, title: "Action Figures", desc: "Bring your favorite heroes to life." },
    { img: heroImg6, title: "Outdoor Fun", desc: "Play outside and explore imagination." },
  ];

  const [current, setCurrent] = useState(0);

  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full mt-16 h-[60vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
      {/* Background images */}
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide.img}
          alt={`Slide ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

      {/* Text content */}
      <div className="relative z-10 max-w-6xl mx-auto h-full flex items-center px-6 md:px-12">
        <div className="text-center md:text-left w-full md:w-2/3 lg:w-1/2">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            {slides[current].title}
          </h1>

          <p className="mt-4 text-white/85 text-sm sm:text-base md:text-lg">
            {slides[current].desc}
          </p>

          <div className="mt-6 flex justify-center md:justify-start gap-3">
            <Link
              to="/"
              className="px-5 py-2 bg-white text-black rounded-md shadow-sm font-medium"
            >
              Browse Collection
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        aria-label="Previous"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/30 backdrop-blur flex items-center justify-center hover:bg-white/50 transition"
      >
        <FaChevronLeft className="text-white" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/30 backdrop-blur flex items-center justify-center hover:bg-white/50 transition"
      >
        <FaChevronRight className="text-white" />
      </button>
    </section>
  );
};

export default Hero;
