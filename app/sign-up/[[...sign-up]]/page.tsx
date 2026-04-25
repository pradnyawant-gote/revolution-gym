import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gym-dark flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(229,0,10,0.15)_0%,_transparent_50%)]" />
      <div className="relative z-10">
        <SignUp appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-gym-dark-card border border-white/10 rounded-2xl shadow-2xl",
            headerTitle: "text-white text-2xl font-black",
            headerSubtitle: "text-white/70",
            socialButtonsBlockButton: "bg-white/5 border-white/10 hover:bg-white/10 text-white",
            socialButtonsBlockButtonText: "text-white font-medium",
            dividerLine: "bg-white/10",
            dividerText: "text-white/50",
            formFieldLabel: "text-white/90",
            formFieldInput: "bg-gym-dark border-white/10 text-white placeholder:text-white/30",
            formButtonPrimary: "bg-gym-red hover:bg-gym-red/90 text-white font-bold",
            footerActionText: "text-white/70",
            footerActionLink: "text-gym-red hover:text-gym-red/90",
          }
        }} />
      </div>
    </div>
  );
}
