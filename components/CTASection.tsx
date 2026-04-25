"use client";

import { motion } from "framer-motion";
import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gym-red/20 via-gym-dark to-gym-orange/10" />
      <div className="absolute inset-0 bg-gym-dark/80" />

      {/* Animated glow orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-gym-red/20 rounded-full blur-[150px]"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-72 h-72 bg-gym-orange/15 rounded-full blur-[120px]"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="text-gym-red text-sm font-bold tracking-[0.3em] uppercase">
            The Time Is Now
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mt-4 tracking-tight leading-tight">
            READY TO START YOUR{" "}
            <span className="bg-gradient-to-r from-gym-red to-gym-orange bg-clip-text text-transparent">
              REVOLUTION
            </span>
            ?
          </h2>
          <p className="text-white/50 mt-6 text-lg max-w-2xl mx-auto">
            Join hundreds of members who transformed their lives at Revolution Gym.
            Your journey begins with a single step.
          </p>
          <div className="mt-10">
            <SignUpButton mode="modal">
              <Button
                size="lg"
                className="bg-gym-red hover:bg-gym-red/90 text-white font-black px-12 py-7 text-lg rounded-xl hover:scale-105 transition-all duration-300 shadow-2xl shadow-gym-red/30 cursor-pointer"
              >
                Join Revolution Gym Today
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Button>
            </SignUpButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
