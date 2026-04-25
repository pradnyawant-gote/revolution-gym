"use client";

import { motion } from "framer-motion";
import { PricingTable } from "@clerk/nextjs";

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32 bg-gym-dark-lighter">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(229,0,10,0.06)_0%,_transparent_50%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gym-red text-sm font-bold tracking-[0.3em] uppercase">Membership Plans</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mt-4 tracking-tight">CHOOSE YOUR PATH</h2>
          <p className="text-white/50 mt-4 max-w-2xl mx-auto text-lg">
            Invest in yourself. Every plan includes access to Nagpur&apos;s most powerful fitness community.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full flex justify-center pricing-table-wrapper [&_*]:!text-black [&_button_*]:!text-white"
        >
          <PricingTable
            appearance={{
              variables: {
                colorText: "#000000",
                colorTextSecondary: "#4b5563", // gray-600
                colorBackground: "#ffffff",
              },
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
