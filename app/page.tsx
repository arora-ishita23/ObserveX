"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import HeroSection from "@/components/hero-section" 
import UploadSection from "@/components/upload-section"
import RealTimeSection from "@/components/realtime-section"
import GallerySection from "@/components/gallery-section"
import Footer from "@/components/footer"
import AboutUs from "@/components/about"
import JarvisVoiceAssistant from "@/components/JarvisVoiceAssistant"


gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  useEffect(() => {
    const tl = gsap.timeline()

    tl.from(".page-content", { opacity: 0, duration: 0.5, ease: "power2.out" })
      .from(".hero-content", { y: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.3")
      .from(".section-animate", {
        y: 100, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power2.out"
      }, "-=0.5")

    gsap.utils.toArray(".scroll-animate").forEach((element: any) => {
      gsap.fromTo(element, {
        y: 100, opacity: 0,
      }, {
        y: 0, opacity: 1, duration: 1, ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="page-content min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* <StarField /> */}
      <JarvisVoiceAssistant />
      <div className="relative z-10">
        <div className="hero-content"><HeroSection /></div>
        <div className="section-animate"><AboutUs /></div>
        <div className="section-animate"><RealTimeSection /></div>
        {/* <div className="section-animate"><GallerySection /></div> */}
        <div className="section-animate"><Footer /></div>
      </div>
    </div>
  )
}


// "use client";

// import { useEffect } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import HeroSection from "@/components/hero-section";
// import UploadSection from "@/components/upload-section";
// import RealTimeSection from "@/components/realtime-section";
// import GallerySection from "@/components/gallery-section";
// import Footer from "@/components/footer";
// import StarField from "@/components/star-field";
// import JarvisVoiceAssistant from "@/components/JarvisVoiceAssistant";
// import JarvisFloatingButton from "@/components/JarvisFloatingButton"
// import JarvisFloatingButton from "@/components/jarvis-floating-button"
// gsap.registerPlugin(ScrollTrigger);

// export default function HomePage() {
//   useEffect(() => {
//     // Page load animations
//     const tl = gsap.timeline();

//     tl.from(".page-content", {
//       opacity: 0,
//       duration: 0.5,
//       ease: "power2.out",
//     })
//       .from(
//         ".hero-content",
//         {
//           y: 50,
//           opacity: 0,
//           duration: 1,
//           ease: "power3.out",
//         },
//         "-=0.3"
//       )
//       .from(
//         ".section-animate",
//         {
//           y: 100,
//           opacity: 0,
//           duration: 0.8,
//           stagger: 0.2,
//           ease: "power2.out",
//         },
//         "-=0.5"
//       );

//     // Scroll-based animations
//     gsap.utils.toArray(".scroll-animate").forEach((element: any) => {
//       gsap.fromTo(
//         element,
//         {
//           y: 100,
//           opacity: 0,
//         },
//         {
//           y: 0,
//           opacity: 1,
//           duration: 1,
//           ease: "power2.out",
//           scrollTrigger: {
//             trigger: element,
//             start: "top 80%",
//             end: "bottom 20%",
//             toggleActions: "play none none reverse",
//           },
//         }
//       );
//     });

//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);

//   return (
//     <div className="page-content min-h-screen bg-black text-white overflow-x-hidden relative">
//       <StarField />

//       <div className="relative z-10">
//         <div className="hero-content">
//           <HeroSection />
//         </div>

//         <div className="section-animate">
//           <UploadSection />
//         </div>

//         <div className="section-animate">
//           <RealTimeSection />
//         </div>

//         <div className="section-animate">
//           <GallerySection />
//         </div>

//         <div className="section-animate">
//           <Footer />
//         </div>
//       </div>

//       <div className="fixed bottom-6 right-6 z-50">
//         <JarvisVoiceAssistant />
//       </div>
//     </div>
//   );
// }