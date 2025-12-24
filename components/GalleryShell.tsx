"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { ArtworkGrid } from "@/components/ArtworkGrid"
import { ppEditorialNewUltralightItalic, inter } from "@/app/fonts"

export function GalleryShell() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div
      className={`min-h-screen bg-[#141414] flex flex-col items-center p-6 md:p-16 lg:p-20 pt-16 md:pt-20 ${ppEditorialNewUltralightItalic.variable} ${inter.variable}`}
    >
      <main className="w-full max-w-7xl text-white/80 space-y-10 md:space-y-12">
        <header className="flex flex-col items-center text-center gap-6">
          <div className="w-full">
            <h1
              className={`pt-4 md:pt-8 ${ppEditorialNewUltralightItalic.className} text-3xl md:text-4xl lg:text-5xl font-light italic text-white/90 tracking-tighter leading-[130%] mb-3 md:mb-4`}
            >
              Gallery Collection
            </h1>
          </div>

          <div className="w-full flex justify-center md:justify-start">
            <div className="w-full flex justify-center">
              <div className="w-full max-w-xl">
                <label className="block text-xl uppercase tracking-[0.2em] text-white/40 mb-2 text-center">
                  Find your palette
                </label>
                <div className="relative">
                  <div className="flex items-center gap-3 rounded-full bg-[#1b1b1b] border border-white/10 px-4 py-2.5 shadow-[0_0_0_1px_rgba(0,0,0,0.7)]">
                    <Search className="w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by title, artist, model, or medium…"
                      className="w-full bg-transparent border-none outline-none text-sm md:text-base text-white/80 placeholder:text-white/40"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="space-y-12">
          {/* Photos Section */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold text-white/90 mb-6">
              Photos
            </h2>
            <ArtworkGrid filterType="image" searchQuery={searchQuery} />
          </section>

          {/* Videos Section */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold text-white/90 mb-6">
              Videos
            </h2>
            <ArtworkGrid filterType="video" searchQuery={searchQuery} />
          </section>
        </section>
      </main>
    </div>
  )
}


