"use client";
import { motion } from "framer-motion";

const SkeletonCard = () => (
  <motion.div
    className="bg-muted rounded-lg p-6 space-y-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-muted-foreground/20 rounded-full animate-pulse" />
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-muted-foreground/20 rounded animate-pulse" />
        <div className="h-3 bg-muted-foreground/20 rounded w-3/4 animate-pulse" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-muted-foreground/20 rounded animate-pulse" />
      <div className="h-3 bg-muted-foreground/20 rounded w-5/6 animate-pulse" />
      <div className="h-3 bg-muted-foreground/20 rounded w-4/6 animate-pulse" />
    </div>
  </motion.div>
);

const SkeletonText = ({ lines = 3, className = "" }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <motion.div
        key={i}
        className={`h-4 bg-muted-foreground/20 rounded animate-pulse ${
          i === lines - 1 ? "w-3/4" : "w-full"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.1, duration: 0.5 }}
      />
    ))}
  </div>
);

const SkeletonButton = () => (
  <motion.div
    className="h-10 bg-muted-foreground/20 rounded animate-pulse w-24"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  />
);

const SkeletonGrid = ({ cols = 3, rows = 2 }) => (
  <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-4`}>
    {Array.from({ length: cols * rows }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

const SkeletonHeader = () => (
  <motion.div
    className="space-y-4 mb-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="h-8 bg-muted-foreground/20 rounded animate-pulse w-1/3" />
    <div className="h-4 bg-muted-foreground/20 rounded animate-pulse w-1/2" />
  </motion.div>
);

export { SkeletonCard, SkeletonText, SkeletonButton, SkeletonGrid, SkeletonHeader }; 