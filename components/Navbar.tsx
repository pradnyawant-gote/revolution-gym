"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Programs", href: "#programs" },
  { name: "Trainers", href: "#trainers" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gym-dark/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-gym-red/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-8 h-8 bg-gym-red rounded-sm flex items-center justify-center font-black text-white text-sm group-hover:scale-110 transition-transform duration-300">
                R
              </div>
              <div className="absolute inset-0 bg-gym-red rounded-sm blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            </div>
            <span className="text-lg lg:text-xl font-black tracking-wider text-white">
              REVOLUTION{" "}
              <span className="text-gym-red">GYM</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gym-red group-hover:w-3/4 transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {isSignedIn ? (
              <>
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    className="text-white/70 hover:text-white hover:bg-white/5 text-sm"
                  >
                    Dashboard
                  </Button>
                </Link>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9 border-2 border-gym-red",
                    },
                  }}
                />
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button
                    variant="ghost"
                    className="text-white/70 hover:text-white hover:bg-white/5 text-sm cursor-pointer"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="bg-gym-red hover:bg-gym-red/90 text-white font-semibold px-6 text-sm hover:scale-105 transition-all duration-200 cursor-pointer">
                    Join Now
                  </Button>
                </SignUpButton>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                className="p-2 text-white hover:text-gym-red transition-colors"
                aria-label="Open menu"
              >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] bg-gym-dark border-l border-white/10 p-0"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-white/10">
                    <span className="text-xl font-black tracking-wider text-white">
                      REVOLUTION{" "}
                      <span className="text-gym-red">GYM</span>
                    </span>
                  </div>
                  <div className="flex flex-col p-6 gap-2">
                    {navLinks.map((link, i) => (
                      <motion.div
                        key={link.name}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-3 px-4 text-lg font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-auto p-6 border-t border-white/10 flex flex-col gap-3">
                    {isSignedIn ? (
                      <div className="flex items-center gap-3">
                        <UserButton />
                        <Link href="/dashboard">
                          <Button className="bg-gym-red hover:bg-gym-red/90 text-white w-full">
                            Dashboard
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <>
                        <SignInButton mode="modal">
                          <Button
                            variant="outline"
                            className="w-full border-white/20 text-white hover:bg-white/5 cursor-pointer"
                          >
                            Sign In
                          </Button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                          <Button className="w-full bg-gym-red hover:bg-gym-red/90 text-white font-semibold cursor-pointer">
                            Join Now
                          </Button>
                        </SignUpButton>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
