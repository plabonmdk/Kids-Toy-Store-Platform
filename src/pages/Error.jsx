import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import ErrorImage from '../assets/error.png';

const Error = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-cyan-200">
            {/* Animated image */}
            <motion.img
                src={ErrorImage}
                alt="Error"
                className="w-64 md:w-96 rounded-4xl lg:w-120 mb-6"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            />

            {/* Animated heading */}
            <motion.h1
                className="text-3xl md:text-5xl font-bold text-red-500 mb-2"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                Oops! Page not found
            </motion.h1>

            <motion.p
                className="text-gray-700 text-center max-w-md mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                The page you are looking for doesn't exist or an error occurred.
            </motion.p>

            {/* Go Home button */}
            <motion.button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Go Home
            </motion.button>
        </div>
    );
};

export default Error;
