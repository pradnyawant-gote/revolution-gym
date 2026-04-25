"use client";

import { motion, type Variants } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import EnrollButton from "@/components/EnrollButton";

interface Program {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const programs: Program[] = [
  {
    name: "Strength Training",
    description: "Build raw power with progressive overload programs designed by certified strength coaches.",
    color: "from-red-500/20 to-red-900/10",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
        <path d="M6.5 17.5L17.5 6.5" />
        <path d="M4 15l1.5-1.5" />
        <path d="M5.5 13.5l5 5" />
        <path d="M9 20l1.5-1.5" />
        <path d="M15 4l1.5-1.5" />
        <path d="M13.5 5.5l5 5" />
        <path d="M20 9l1.5-1.5" />
        <rect width="4" height="12" x="1.5" y="10.5" rx="2" transform="rotate(-45 3.5 16.5)" />
        <rect width="4" height="12" x="18.5" y="-6.5" rx="2" transform="rotate(-45 20.5 0.5)" />
      </svg>
    ),
  },
  {
    name: "CrossFit",
    description: "High-intensity functional movements that push your limits every single day.",
    color: "from-orange-500/20 to-orange-900/10",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
        <path d="M12 2v6" />
        <path d="M8.5 4h7" />
        <circle cx="12" cy="15" r="7" />
        <path d="M12 11v4" />
      </svg>
    ),
  },
  {
    name: "Yoga & Flexibility",
    description: "Restore balance and enhance mobility with guided yoga sessions for all levels.",
    color: "from-emerald-500/20 to-emerald-900/10",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
        <path d="M12 22c-4-4-6-8-6-12a6 6 0 0 1 12 0c0 4-2 8-6 12z" />
        <path d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        <path d="M12 10v4" />
        <path d="M8 14h8" />
      </svg>
    ),
  },
  {
    name: "Boxing",
    description: "Learn technique, build endurance, and unleash your fighting spirit in the ring.",
    color: "from-red-600/20 to-red-950/10",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
        <path d="M17 6h-6a4 4 0 0 0-4 4v5a2 2 0 0 0 2 2h8a4 4 0 0 0 4-4V8a2 2 0 0 0-2-2z" />
        <path d="M7 17v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2" />
        <path d="M3 10h4" />
      </svg>
    ),
  },
  {
    name: "Cardio Blast",
    description: "Torch calories and boost your cardiovascular fitness with explosive cardio sessions.",
    color: "from-yellow-500/20 to-yellow-900/10",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
        <path d="M12 2v2" />
        <path d="M22 12h-2" />
        <path d="M12 22v-2" />
        <path d="M2 12h2" />
      </svg>
    ),
  },
  {
    name: "Personal Training",
    description: "One-on-one coaching tailored to your goals with dedicated expert trainers.",
    color: "from-purple-500/20 to-purple-900/10",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
        <circle cx="12" cy="8" r="4" />
        <path d="M6 20c0-4 4-5 6-5s6 1 6 5" />
        <path d="M19 8l-3 3" />
        <path d="M22 11l-3-3" />
      </svg>
    ),
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function ProgramsSection() {
  return (
    <section id="programs" className="relative py-24 sm:py-32 bg-gym-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gym-red text-sm font-bold tracking-[0.3em] uppercase">
            What We Offer
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mt-4 tracking-tight">
            OUR PROGRAMS
          </h2>
          <p className="text-white/50 mt-4 max-w-2xl mx-auto text-lg">
            From raw strength to zen flexibility — find the program that fuels your revolution.
          </p>
        </motion.div>

        {/* Program Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {programs.map((program) => (
            <motion.div key={program.name} variants={cardVariants}>
              <Card className="bg-gym-dark-card border-white/5 hover:border-gym-red/30 transition-all duration-500 group overflow-hidden h-full">
                <CardHeader className="pb-4">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${program.color} text-white mb-2 group-hover:scale-110 transition-transform duration-300`}>
                    {program.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-gym-red transition-colors duration-300">
                    {program.name}
                  </h3>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-white/50 text-sm leading-relaxed">
                    {program.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <EnrollButton programName={program.name} />
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
