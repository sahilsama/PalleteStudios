"use client"
import { useState, useEffect } from "react"
import { ppEditorialNewUltralightItalic, inter } from "./fonts"
import { BlurFade } from "@/components/ui/blur-fade"
// import Link from "next/link";
// import { VenetianMask} from "lucide-react";

const images = [
  "/assets/images/landscape.jpg",
  "/assets/images/intro2.jpg",
  "/assets/images/intro3.png",
  "/assets/images/intro4.jpg",
  "/assets/images/headshot.jpg",
  "/assets/images/redbgheadshot.jpg",
  "/assets/images/yellowbgheadshot.jpg",

];
export default function Home() {
  const [headerSize] = useState(1.2) // 120% is the default size
  const [textSize] = useState(0.8) // 80% is the default size
  const [currInd, setcurrInd] = useState(0)

  useEffect(() => {
  const interval = setInterval(() => {
    setcurrInd((prev) => (prev + 1) % images.length)
  }, 4000) // 4 seconds
  return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`h-screen bg-[black] flex items-center justify-center p-8 ${ppEditorialNewUltralightItalic.variable} ${inter.variable}`}
    >


      <div className="w-full h-full flex flex-col md:flex-row items-stretch gap-8 md:gap-8">
        {/* Left Content */}
        <section className="w-full md:w-[600px] flex-shrink-0 flex flex-col justify-center h-full">
          <div className="flex flex-col p-10 py-10 border">
          <BlurFade delay={0.25} inView>
            <h1
              className={`${ppEditorialNewUltralightItalic.className} text-4xl md:text-6xl font-light italic text-white/80 tracking-tighter leading-[130%]`}
              style={{ fontSize: `${4 * headerSize}rem` }}
            >
              Prompt
              <br />
              Library
              <br />
              Collection
            </h1>
          </BlurFade>
            <div
              className={`flex flex-col gap-12 text-white/50 text-sm font-light max-w-[300px]`}
              style={{ fontSize: `${0.875 * textSize}rem` }}
            >
              <div className="space-y-6">
                <div className="h-px bg-white/10 w-full" />
                <BlurFade delay={0.25} inView>
                <p>
                  Explore our curated collection of creative prompts for various design and animation projects. Each
                  card contains detailed prompts and examples to inspire your next creative endeavor. Hover over any
                  card to reveal the prompt behind the visual.
                </p>
                </BlurFade>
                <BlurFade delay={0.50} inView>
                <p>
                From 4k headshots to AI Brand Designs, these prompts cover a wide range of creative disciplines and
                techniques, perfect for designers, animators, and creative professionals.
                </p>
                </BlurFade>
               
                <div className="h-px bg-white/10 w-full" />
                <p>Click on Explore for some of our favorite prompts and examples.</p>
                
              </div>
            </div>
            <BlurFade delay={0.60} inView>
            <div className="mt-8 flex gap-3">
                  <a
                    href="/gallery"
                    className="px-10 py-3 rounded-xl border text-white/80 text-sm font-light backdrop-blur hover:bg-white/20 transition flex items-center justify-center"
                  >
                    Explore
                  </a>
                  <a
                    href="/docs"
                    className="px-8 py-3 rounded-xl border text-white/80 text-sm font-light backdrop-blur hover:bg-white/15 transition flex items-center justify-center"
                  >
                    Docs
                  </a>
            </div>
            </BlurFade>
          </div>
        </section>

        {/* Right Content */}
        {/* Right Content */}
        <div className="w-full md:flex-grow relative h-full min-h-[60vh]">
          <div className="absolute inset-0 overflow-hidden bg-black rounded-xl">
            {images.map((img, index) => (
              <img
                  key={index}
                  src={img}
                  alt="intro"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                    index === currInd ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-black/10 to-black/60" />
          </div>
        </div>

      </div>
    </div>
  )
}
