"use client";

import { motion, type Variants } from "framer-motion";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

export default function HeroSection() {
  const handleScrollToFrames = () => {
    const el = document.getElementById("frame-scroll");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gym-dark" />
      <div className="absolute inset-0 bg-gradient-to-br from-gym-red/10 via-transparent to-gym-orange/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(229,0,10,0.15)_0%,_transparent_70%)]" />

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gym-red/20 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gym-orange/15 rounded-full blur-[100px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gym-red/30 bg-gym-red/10 text-gym-red text-xs sm:text-sm font-semibold tracking-widest uppercase">
            <span className="w-2 h-2 bg-gym-red rounded-full animate-pulse" />
            Nagpur&apos;s #1 Fitness Destination
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-6"
        >
          <span className="block text-white">BRING THE</span>
          <span className="block bg-gradient-to-r from-gym-red via-gym-orange to-gym-red bg-clip-text text-transparent">
            REVOLUTION
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Get Fit, Get Furious Nagpur&apos;s Most Intense Gym.
          <br className="hidden sm:block" />
          Transform your body. Ignite your spirit. Join the movement.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <SignInButton mode="modal">
            <Button
              size="lg"
              className="bg-gym-red hover:bg-gym-red/90 text-white font-bold px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg rounded-xl hover:scale-105 transition-all duration-300 shadow-2xl shadow-gym-red/25 cursor-pointer w-full sm:w-auto"
            >
              Start Your Journey
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Button>
          </SignInButton>
          <Button
            variant="outline"
            size="lg"
            onClick={handleScrollToFrames}
            className="border-white/20 text-white hover:bg-white/5 hover:border-white/40 font-semibold px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg rounded-xl hover:scale-105 transition-all duration-300 cursor-pointer w-full sm:w-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
              />
            </svg>
            Watch the Story
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-white/30 text-xs tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
          animate={{ borderColor: ["rgba(255,255,255,0.2)", "rgba(229,0,10,0.5)", "rgba(255,255,255,0.2)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-gym-red rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gym-dark to-transparent" />
    </section>
  );
}
