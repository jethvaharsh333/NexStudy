"use client";

import NexStudy from "@/public/logo.svg";
import MenuIcon from "@/public/assets/menu.svg";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import MobileSidebar from "./mobile-sidebar";

import { cn } from "@/lib/utils"
import NavLink from "./nav-link";

export const Header = ({ onHeightChange }: { onHeightChange: (height: number) => void }) => {
  const router = useRouter();
  const navbarRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { scrollY } = useScroll();

  useEffect(() => {
    if (navbarRef.current) {
      onHeightChange(navbarRef.current.offsetHeight);
      console.log(navbarRef.current.id);
    }
  }, [onHeightChange]);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - lastScrollY;

      if (current < 650) {
        setVisible(true);
      } else if (direction > 0) {
        setVisible(false); // Hide on scroll down
      } else {
        setVisible(true); // Show on scroll up
      }

      setLastScrollY(current);
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={navbarRef}
        initial={{ opacity: 1, y: 0 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
        }}
        className="py-4 w-full fixed top-0 backdrop-blur-sm z-50 bg-white/5 shadow-sm"
      >
        <div className="container mx-auto pe-10 flex items-center justify-between">
          <a href="#">
            <NexStudy className="w-40 h-10"/>
          </a>
          <div className="md:hidden flex items-center">
            <MobileSidebar />
          </div>
          <nav className="hidden md:flex gap-6 text-black/60 items-center">
            <NavLink/>
          </nav>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};  