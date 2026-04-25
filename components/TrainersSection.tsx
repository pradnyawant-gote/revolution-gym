"use client";

import { motion, type Variants } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const trainers = [
  {
    name: "Arjun Mehta",
    specialty: "Strength & Conditioning",
    experience: "8 Years",
    initials: "AM",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop",
    color: "from-red-500 to-red-700",
    bio: "Former national-level powerlifter. Specializes in building raw strength.",
  },
  {
    name: "Priya Sharma",
    specialty: "Yoga & Flexibility",
    experience: "6 Years",
    initials: "PS",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
    color: "from-emerald-500 to-emerald-700",
    bio: "Certified Hatha yoga instructor with expertise in rehabilitation.",
  },
  {
    name: "Rahul Deshmukh",
    specialty: "CrossFit & HIIT",
    experience: "7 Years",
    initials: "RD",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    color: "from-orange-500 to-orange-700",
    bio: "CrossFit Level 2 trainer. Helped 200+ athletes hit their goals.",
  },
  {
    name: "Sneha Patel",
    specialty: "Boxing & MMA",
    experience: "5 Years",
    initials: "SP",
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=800&auto=format&fit=crop",
    color: "from-purple-500 to-purple-700",
    bio: "Professional MMA fighter. Focuses on technique and explosive power.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function TrainersSection() {
  return (
    <section id="trainers" className="relative py-24 sm:py-32 bg-gym-dark-card border-y border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(229,0,10,0.05)_0%,_transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gym-red text-sm font-bold tracking-[0.3em] uppercase">
            Expert Coaching
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mt-4 tracking-tight">
            MEET THE TRAINERS
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {trainers.map((trainer) => (
            <motion.div key={trainer.name} variants={cardVariants}>
              <div className="group relative p-6 rounded-2xl bg-gym-dark border border-white/5 hover:border-gym-red/30 transition-all duration-500 text-center overflow-hidden h-full flex flex-col">
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${trainer.color} opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative mx-auto mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-br ${trainer.color} blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full`} />
                  <Avatar className="w-24 h-24 border-2 border-white/10 group-hover:border-gym-red/50 transition-colors duration-300 relative z-10">
                    <AvatarImage src={trainer.image} className="object-cover" />
                    <AvatarFallback className="bg-gym-dark-card text-white font-bold text-xl">
                      {trainer.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-gym-red transition-colors duration-300">
                  {trainer.name}
                </h3>
                <p className="text-gym-red text-sm font-semibold tracking-wider uppercase mb-4">
                  {trainer.specialty}
                </p>
                <p className="text-white/50 text-sm leading-relaxed mb-6 flex-grow">
                  {trainer.bio}
                </p>
                <div className="mt-auto pt-4 border-t border-white/5">
                  <span className="text-white/40 text-xs font-medium uppercase tracking-widest">
                    Experience: <span className="text-white/80">{trainer.experience}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
