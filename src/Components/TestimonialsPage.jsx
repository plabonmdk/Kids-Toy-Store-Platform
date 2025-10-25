import React from "react";
import { motion } from "framer-motion";

// You can replace these with actual images of parents or avatars
import parent1 from "../assets/riya.png";
import parent2 from "../assets/utshob.png";
import parent3 from "../assets/niloy.png";

const testimonials = [
  {
    text: "My daughter absolutely loves her new teddy bear! The colors are so cute, and it feels soft. She sleeps with it every night!",
    name: "Riya Rani",
    child: "Lily (Age 15)",
    image: parent1,
  },
  {
    text: "These toy cars are amazing! My son spends hours playing and creating his own racetrack. Great quality and safe materials!",
    name: "Utshob Sarker",
    child: "Noah (Age 17)",
    image: parent2,
  },
  {
    text: "The wooden puzzle set was perfect for learning shapes and colors. It’s fun and educational — we love ToyTopia toys!",
    name: "Niloy Sarker",
    child: "Emma (Age 14)",
    image: parent3,
  },
];

const TestimonialsPage = () => {
  return (
    <div className=" bg-white flex flex-col items-center py-12 px-4 md:py-16 md:px-8">
      <h1 className="text-2xl text-fuchsia-700 sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center">
        What Parents Say
      </h1>
      <p className="text-gray-600 text-center mb-10 sm:mb-12 max-w-xl sm:max-w-2xl px-2 sm:px-0 text-sm sm:text-base md:text-lg">
        Happy families around the world love our fun and safe toy collections!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 w-full max-w-6xl">
        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(0,0,0,0.2)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white p-6 sm:p-8 rounded-3xl shadow-md flex flex-col justify-between hover:shadow-xl cursor-pointer"
          >
            <div className="flex items-center mb-4 sm:mb-6">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover mr-4 border-2 border-indigo-100"
              />
              <div>
                <h3 className="font-semibold text-[1rem] sm:text-[1.05rem] md:text-[1.1rem]">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-[0.8rem] sm:text-[0.9rem] md:text-[1rem]">
                  {item.child}
                </p>
              </div>
            </div>
            <p className="text-gray-800 text-[0.9rem] sm:text-[1rem] md:text-[1.05rem] lg:text-[1.1rem]">
              &ldquo;{item.text}&rdquo;
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsPage;
