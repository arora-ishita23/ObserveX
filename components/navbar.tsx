"use client";

import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-8/12">
      <div className="relative flex items-center justify-between px-8 py-3 bg-black/80 border border-border rounded-full shadow-lg shadow-black/50 backdrop-blur-md">

        {/* Logo on the Left */}
        <a href="/" className="flex items-center absolute left-4 top-1/2 transform -translate-y-1/2">
          <Image
            src="/logo.jpg" // Ensure this filename matches your file in public folder
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
            priority
          />
        </a>

        {/* Logo/Brand in the center */}
        <a href="/" className="flex items-center mx-auto">
          <span className="text-neon-cyan font-bold text-lg tracking-wide glow">
            observeX
          </span>
        </a>

        {/* Navigation Links on the Right */}
        <div className="flex space-x-8 absolute right-4">
          <a href="/" className="text-white font-bold hover:text-neon-cyan transition-colors">
            Home
          </a>
          <a href="#footer" className="text-white font-bold hover:text-neon-cyan transition-colors">
            Gallery
          </a>
          <a href="/about" className="text-white font-bold hover:text-neon-cyan transition-colors">
            About
          </a>
        </div>
      </div>

      <style jsx>{`
        .glow {
          text-shadow: 0 0 8px #00f5ff, 0 0 16px #00f5ff;
        }
      `}</style>
    </nav>
  );
}