"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import GallerySection from "@/components/gallery-section"
import Footer from "@/components/footer"
import StarField from "@/components/star-field"

gsap.registerPlugin(ScrollTrigger)

export default function GalleryPage() {
  useEffect(() => {
    // Page load animation
    const tl = gsap.timeline()

    tl.from(".page-content", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    })
      .from(
        ".hero-content",
        {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.3",
      )
      .from(
        ".section-animate",
        {
          y: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.5",
      )

    // Scroll-based animations
    gsap.utils.toArray(".scroll-animate").forEach((element: any) => {
      gsap.fromTo(
        element,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="page-content min-h-screen bg-black text-white overflow-x-hidden relative">
      <StarField />

      <div className="relative z-10">
        <div className="hero-content">
          <div className="text-center py-20">
            <h1 className="text-6xl font-bold text-white font-orbitron mb-6">
              GALLERY <span className="text-cyan-400">ANALYSIS</span>
            </h1>
            <p className="text-xl text-gray-300 font-rajdhani max-w-2xl mx-auto">
              Analyze multiple images with our advanced AI detection system. 
              Select individual images or analyze all at once.
            </p>
          </div>
        </div>

        <div className="section-animate">
          <GallerySection />
        </div>

        <div className="section-animate">
          <Footer />
        </div>
      </div>
    </div>
  )
} 