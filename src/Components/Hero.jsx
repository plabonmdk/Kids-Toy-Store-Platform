import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import heroImg1 from "../assets/Untitled design (1).png";
import heroImg2 from "../assets/Untitled design (2).png";
import heroImg3 from "../assets/Untitled design (3).png";
import heroImg4 from "../assets/Untitled design (4).png";
import heroImg5 from "../assets/Untitled design (5).png";
import heroImg6 from "../assets/Untitled design.png";
import { Link } from "react-router";

const Hero = () => {
  const images = [heroImg1, heroImg2, heroImg3, heroImg4, heroImg5, heroImg6];
  const [current, setCurrent] = useState(0);

  // Auto change background every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95,
      zIndex: 0,
    }),
  };

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
      {/* Background image */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto h-full flex items-center px-6 md:px-12">
        <div className="text-center md:text-left w-full md:w-2/3 lg:w-1/2">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            WHERE DREAMS
            <span className="block">COME TRUE</span>
          </h1>

          <p className="mt-4 text-white/85 text-sm sm:text-base md:text-lg">
            Playful exploration and delightful moments — perfect for little
            learners and big imaginations.
          </p>

          <div className="mt-6 flex justify-center md:justify-start gap-3">
            <Link to="/" className="px-5 py-2 bg-white text-black rounded-md shadow-sm font-medium">
              Browse Collection
            </Link>
            
          </div>
        </div>
      </div>

      {/* Navigation */}
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
