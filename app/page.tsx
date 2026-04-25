"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ProgramsSection from "@/components/ProgramsSection";
import PricingSection from "@/components/PricingSection";
import TrainersSection from "@/components/TrainersSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const FrameScrollSection = dynamic(
  () => import("@/components/FrameScrollSection"),
  { ssr: false }
);

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FrameScrollSection
        framesPath="/frames/ezgif-frame-"
        totalFrames={40}
        frameExtension=".jpg"
      />
      <StatsSection />
      <ProgramsSection />
      <PricingSection />
      <TrainersSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
