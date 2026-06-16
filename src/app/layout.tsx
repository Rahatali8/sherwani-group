import type { Metadata } from "next";
import { Anton, Inter, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Preloader from "@/components/providers/Preloader";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400", // Anton is a single-weight display font
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sherwani Group — Driven by Vision, Defined by Excellence",
  description:
    "Sherwani Group — a 40-year Pakistani conglomerate spanning automobiles, real estate, engineering, e-commerce and motorsports.",
  icons: {
    icon: "/images/textures/favicon.png",
    shortcut: "/images/textures/favicon.png",
    apple: "/images/textures/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${anton.variable} ${outfit.variable} antialiased`}
    >
      <body className="bg-bg text-text font-body">
        <SmoothScrollProvider>
          <Preloader />
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
