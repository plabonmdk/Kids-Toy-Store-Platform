import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How do I make my first toy collection?",
    answer:
      "Start by picking your favorite types of toys — like cars, dolls, or puzzles. Collect a few at a time and keep them in a special toy box!",
  },
  {
    question: "How can I play safely with toys?",
    answer:
      "Play on a soft surface and keep your play area tidy. Never put small toys in your mouth and always share space kindly with others.",
  },
  {
    question: "How do I keep my toys clean and neat?",
    answer:
      "Use a soft cloth to wipe your toys every week. Store them in colorful boxes or baskets to keep everything tidy and easy to find.",
  },
  {
    question: "Can I share my toys with friends?",
    answer:
      "Yes! Sharing toys is a great way to have fun together. Just make sure everyone takes care of them and returns them after playing.",
  },
  {
    question: "How do I create my own toy game?",
    answer:
      "Use your imagination! You can make your own toy race, pretend play, or even a treasure hunt using your favorite toys.",
  },
];

const KidsFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto py-12 px-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center text-purple-600 mb-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
      >
        Fun FAQ for Kids 
      </motion.h1>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className={`border border-purple-300 rounded-2xl overflow-hidden shadow-sm ${
              openIndex === index ? "bg-purple-50 shadow-md" : "bg-white"
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left px-5 py-4 text-lg font-semibold text-purple-700 hover:text-purple-800 focus:outline-none"
            >
              {faq.question}
              {openIndex === index ? (
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronUp className="text-purple-500" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ rotate: 180 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown className="text-purple-500" />
                </motion.div>
              )}
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0, y: -10 }}
                  animate={{ height: "auto", opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="px-5 pb-4 text-purple-700"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default KidsFAQ;
