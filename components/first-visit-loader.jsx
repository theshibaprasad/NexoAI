"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

const FirstVisitLoader = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const hasVisited = localStorage.getItem("nexoai_has_visited");
      if (hasVisited) {
        setIsLoading(false);
        setShowLoader(false);
        document.body.classList.remove("loading");
        return;
      }
      document.body.classList.add("loading");
      const timer = setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem("nexoai_has_visited", "true");
        document.body.classList.remove("loading");
        // Wait for fade-out before removing loader from DOM
        setTimeout(() => setShowLoader(false), 600);
      }, 2200); // Show loader for 2.2 seconds
      return () => {
        clearTimeout(timer);
        document.body.classList.remove("loading");
      };
    }
  }, []);

  return (
    <>
      {showLoader && mounted && createPortal(
        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="first-visit-loader-portal fixed inset-0 bg-black flex items-center justify-center z-[9999]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              role="status"
              aria-busy="true"
            >
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                <motion.h1
                  className="text-white text-4xl md:text-6xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  Welcome to <span className="text-blue-600">NexoAI</span>
                </motion.h1>
                <motion.p
                  className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  AI-powered career development platform to help you build, grow, and succeed.
                </motion.p>
                <motion.div
                  className="flex justify-center space-x-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                >
                  <motion.div
                    className="w-4 h-4 bg-white rounded-full"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="w-4 h-4 bg-white rounded-full"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  />
                  <motion.div
                    className="w-4 h-4 bg-white rounded-full"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
      {children}
    </>
  );
};

export default FirstVisitLoader;