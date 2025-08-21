"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AboutUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<HTMLParagraphElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRefs.current, {
        opacity: 0,
        y: 40,
        duration: 1.5,
        stagger: 0.3,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white flex flex-col justify-center items-center px-6 py-16 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20 blur-3xl"></div>

      {/* Content */}
      <div className="max-w-5xl text-center relative z-10">
        <h2 className="text-5xl md:text-7xl font-bold font-orbitron bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-8">
          About ObserveX
        </h2>

        <p
          ref={(el) => el && textRefs.current.push(el)}
          className="text-xl text-gray-300 leading-relaxed mb-6 font-rajdhani"
        >
          ObserveX is an advanced AI-powered detection system designed to analyze and identify spacecraft components with
          unmatched precision.
        </p>

        <p
          ref={(el) => el && textRefs.current.push(el)}
          className="text-xl text-gray-300 leading-relaxed mb-6 font-rajdhani"
        >
          By combining neural network inference, computer vision, and real-time processing, ObserveX ensures fast,
          reliable, and scalable detection for aerospace safety and innovation.
        </p>

        <p
          ref={(el) => el && textRefs.current.push(el)}
          className="text-xl text-gray-300 leading-relaxed font-rajdhani"
        >
          Our mission is to redefine detection systems by delivering accuracy, speed, and a seamless AI experience for
          next-generation space exploration.
        </p>
      </div>
    </section>
  );
}
