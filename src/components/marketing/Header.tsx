import React from "react";
import Image from "next/image";
import Link from "next/link";
import ShinyText from "@/components/marketing/ShinyText";
import CTA from "@/components/marketing/components/CTA";

const Header = () => {
  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 bg-transparent sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/images/logo.png"
              alt="Lern Logo"
              width={32}
              height={32}
              className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-2xl font-bold text-white hover:text-muted-light">Lern</span>
            <sup className="px-3 text-xs font-semibold border border-accent hover:border-accent-light text-accent rounded-full bg-gradient-to-r from-accent/10 to-accent-light/10 shadow-[0_0_8px_rgba(255,255,255,0.2)] transition-all duration-300 scale-75">
              Beta
            </sup>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/features"
              className="text-gray-300 hover:text-muted-dark transition-colors duration-200"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-gray-300 hover:text-muted-dark transition-colors duration-200"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-muted-dark transition-colors duration-200"
            >
              About
            </Link>
          </div>

          <CTA />
        </div>
      </div>
    </nav>
  );
};

export default Header;
