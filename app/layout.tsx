import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Revolution Gym — Get Fit, Get Furious | Nagpur",
  description:
    "Nagpur's most intense gym. Transform your body and mind with world-class trainers, cutting-edge equipment, and an unrelenting community. Join the Revolution.",
  keywords: [
    "gym",
    "fitness",
    "Nagpur",
    "strength training",
    "crossfit",
    "boxing",
    "personal training",
    "Revolution Gym",
  ],
  openGraph: {
    title: "Revolution Gym — Get Fit, Get Furious",
    description:
      "Nagpur's most intense gym. Transform your body and mind.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#E5000A",
        }
      }}
    >
      <html lang="en" className={`${inter.variable} antialiased dark`}>
        <body className="min-h-screen bg-gym-dark text-white overflow-x-hidden">
          {children}
          <Toaster richColors position="bottom-right" theme="dark" />
        </body>
      </html>
    </ClerkProvider>
  );
}
