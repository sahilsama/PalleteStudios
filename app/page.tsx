"use client"

import { useState } from "react"
import { ppEditorialNewUltralightItalic, inter } from "./fonts"
import Link from "next/link";
import { VenetianMask} from "lucide-react";

export default function Home() {
  const [headerSize] = useState(1.2) // 120% is the default size
  const [textSize] = useState(0.8) // 80% is the default size

  return (
    <div
      className={`h-screen bg-[#141414] flex items-center justify-center p-8 ${ppEditorialNewUltralightItalic.variable} ${inter.variable}`}
    >


      <div className="w-full h-full flex flex-col md:flex-row items-stretch gap-8 md:gap-8">
        {/* Left Content */}
        <section className="w-full md:w-[260px] flex-shrink-0 flex flex-col justify-center h-full">
          <div className="flex flex-col">
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
            <div
              className={`flex flex-col gap-12 text-white/50 text-sm font-light max-w-[300px]`}
              style={{ fontSize: `${0.875 * textSize}rem` }}
            >
              <div className="space-y-6">
                <div className="h-px bg-white/10 w-full" />
                <p>
                  Explore our curated collection of creative prompts for various design and animation projects. Each
                  card contains detailed prompts and examples to inspire your next creative endeavor. Hover over any
                  card to reveal the prompt behind the visual.
                </p>
                <p>
                  From motion graphics to web design, these prompts cover a wide range of creative disciplines and
                  techniques, perfect for designers, animators, and creative professionals.
                </p>
                <p>Here are some of our favorite prompts and examples.</p>
                <div className="h-px bg-white/10 w-full" />
              </div>
            </div>
            <div className="mt-8 flex gap-3">
                  <a
                    href="/gallery"
                    className="px-10 py-3 rounded-xl bg-[#141414] border text-white/80 text-sm font-light backdrop-blur hover:bg-white/20 transition flex items-center justify-center"
                  >
                    Explore
                  </a>
                  <a
                    href="/docs"
                    className="px-8 py-3 rounded-xl bg-[#141414] border text-white/80 text-sm font-light backdrop-blur hover:bg-white/15 transition flex items-center justify-center"
                  >
                    Docs
                  </a>
            </div>
          </div>
        </section>

        {/* Right Content */}
        {/* Right Content */}
        <div className="w-full md:flex-grow relative h-full min-h-[60vh]">
          <div className="absolute inset-0 overflow-hidden bg-black rounded-xl">
            <video
              src="/assets/videos/pallete.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-black/10 to-black/60" />
          </div>
        </div>

      </div>
    </div>
  )
}
