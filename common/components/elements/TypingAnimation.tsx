"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";
import { useEffect, useState } from "react";

interface TypingAnimationProps extends MotionProps {
  texts: string[]; // Ubah jadi array teks biar bisa looping
  className?: string;
  duration?: number;
  delay?: number;
  as?: React.ElementType;
  loopDelay?: number;
}

export function TypingAnimation({
  texts,
  className,
  duration = 100,
  delay = 500,
  as: Component = "div",
  loopDelay = 2000,
  ...props
}: TypingAnimationProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let i = 0;
    let typingInterval: NodeJS.Timeout;

    const typeText = () => {
      const currentText = texts[textIndex];

      if (!isDeleting) {
        // Efek mengetik
        typingInterval = setInterval(() => {
          if (i < currentText.length) {
            setDisplayedText(currentText.substring(0, i + 1));
            i++;
          } else {
            clearInterval(typingInterval);
            setTimeout(() => setIsDeleting(true), loopDelay); // Tunggu sebelum mulai hapus
          }
        }, duration);
      } else {
        // Efek menghapus dari belakang
        typingInterval = setInterval(() => {
          if (i >= 4) {
            // Biarkan "I'm " tetap ada
            setDisplayedText(currentText.substring(0, i));
            i--;
          } else {
            clearInterval(typingInterval);
            setIsDeleting(false);
            setTextIndex((prevIndex) => (prevIndex + 1) % texts.length); // Ganti ke teks berikutnya
          }
        }, duration / 2);
      }
    };

    typeText();
    return () => clearInterval(typingInterval);
  }, [textIndex, isDeleting, texts, duration, loopDelay]);

  return (
    <motion.div
      className={cn(
        "text-4xl font-bold leading-[5rem] tracking-[-0.02em]",
        className,
      )}
      {...props}
    >
      {displayedText}
    </motion.div>
  );
}
