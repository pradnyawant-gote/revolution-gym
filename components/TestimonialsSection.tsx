"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Vikram Jadhav",
    duration: "Member for 2 years",
    stars: 5,
    quote: "Revolution Gym completely changed my life. I lost 25kg in 8 months and gained confidence I never knew I had. The trainers push you beyond limits you didn't know existed.",
  },
  {
    name: "Ananya Kulkarni",
    duration: "Member for 1 year",
    stars: 5,
    quote: "The energy here is unmatched. From the CrossFit sessions to the yoga classes, everything is world-class. Best gym in Nagpur, hands down.",
  },
  {
    name: "Rohit Wankhede",
    duration: "Member for 3 years",
    stars: 5,
    quote: "I've been to gyms across India, and nothing comes close to Revolution. The community, the equipment, the coaching — it's all elite level.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gym-orange">
          <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-gym-dark-lighter">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,107,0,0.04)_0%,_transparent_50%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gym-red text-sm font-bold tracking-[0.3em] uppercase">Testimonials</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mt-4 tracking-tight">REAL RESULTS</h2>
          <p className="text-white/50 mt-4 max-w-2xl mx-auto text-lg">
            Don&apos;t take our word for it — hear from Nagpur&apos;s strongest community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative h-full p-8 rounded-2xl bg-gym-dark-card border border-white/5 hover:border-gym-red/20 transition-all duration-500">
                <div className="absolute top-6 right-6 text-6xl font-black text-white/[0.03] select-none">&ldquo;</div>
                <Stars count={t.stars} />
                <p className="text-white/70 mt-4 leading-relaxed text-sm">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 pt-4 border-t border-white/5">
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-white/40 text-sm">{t.duration}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
