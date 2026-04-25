"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { enrollInProgram } from "@/app/actions/enroll";

export default function EnrollButton({ programName }: { programName: string }) {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    setLoading(true);
    try {
      const result = await enrollInProgram(programName);
      if (result.success) {
        toast.success(`Enrolled in ${programName}! 🔥`, {
          description: "Head to your dashboard to see your programs.",
        });
      } else {
        toast.error(result.error || "Something went wrong.");
      }
    } catch {
      toast.error("Failed to enroll. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleEnroll}
      disabled={loading}
      className="inline-flex items-center gap-1.5 text-gym-red hover:text-white font-semibold text-sm transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed group/btn"
    >
      {loading ? (
        <>
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
          </svg>
          Enrolling...
        </>
      ) : (
        <>
          {isSignedIn ? "Enroll Now" : "Sign In to Enroll"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24"
            strokeWidth={2} stroke="currentColor"
            className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </>
      )}
    </button>
  );
}
