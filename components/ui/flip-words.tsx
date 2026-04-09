"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

interface SelectionHandleProps {
  position: string;
}

const SelectionHandle = ({ position }: SelectionHandleProps) => {
  return (
    <div
      className={`absolute w-3 h-3 bg-white border border-white rounded-[2px] ${position}`}
    ></div>
  );
};

interface FlipWordsProps {
  words: string[];
  duration?: number;
  className?: string;
}

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: FlipWordsProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(intervalId);
  }, [words, duration]);

  const wordContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 10,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "tween" as const,
        ease: [0.25, 0.1, 0.25, 1],
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      filter: "blur(8px)",
      transition: {
        type: "tween" as const,
        ease: [0.4, 0, 0.6, 1],
        duration: 0.4,
      },
    },
  };

  const currentWord = words[index];

  return (
    <div
      className={`inline-block align-middle overflow-hidden h-[1.2em] leading-none ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentWord}
          variants={wordContainerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="inline-block whitespace-nowrap"
        >
          {currentWord.split("").map((char, i) => {
            const displayChar = char === " " ? "\u00A0" : char
            return (
              <motion.span
                key={`${char}-${i}-${i}`}
                variants={letterVariants}
                className="inline-block"
              >
                {displayChar}
              </motion.span>
            )
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export function RoleFlip() {
  const phrases = [
    "DEVELOPMENT STUDIO",
    "BOUTIQUE STUDIO",
    "SOFTWARE STUDIO",
  ];

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Phudu:wght@700&display=swap');
          .font-phudu { font-family: 'Phudu', cursive; }
        `}
      </style>
      <span className="relative inline-block align-middle origin-left scale-90 md:scale-95">
        <span className="font-phudu uppercase text-white text-[0.85em] sm:text-[0.9em]">
          <FlipWords words={phrases} duration={3000} />
        </span>
        <span className="absolute inset-0 border border-white rounded-md pointer-events-none" />
        <SelectionHandle position="-top-2 -left-2" />
        <SelectionHandle position="-top-2 -right-2" />
        <SelectionHandle position="-bottom-2 -left-2" />
        <SelectionHandle position="-bottom-2 -right-2" />
      </span>
    </>
  );
}
