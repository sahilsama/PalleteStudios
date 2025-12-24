"use client"

import { FormEvent, useState } from "react"
import { Search } from "lucide-react"
import { ArtworkGrid } from "@/components/ArtworkGrid"
import { ppEditorialNewUltralightItalic, inter } from "@/app/fonts"
import { artworks as initialArtworks, type Artwork } from "@/data/artworks"

const UPLOAD_PASSWORD = "pallete-22021412"

export function GalleryShell() {
  const [searchQuery, setSearchQuery] = useState("")
  const [items, setItems] = useState<Artwork[]>(initialArtworks)

  const [prompt, setPrompt] = useState("")
  const [model, setModel] = useState("FLUX")
  const [file, setFile] = useState<File | null>(null)
  const [password, setPassword] = useState("")
  const [hasUploadAccess, setHasUploadAccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!hasUploadAccess) {
      if (password !== UPLOAD_PASSWORD) {
        setError("Incorrect upload password.")
        return
      }
      setHasUploadAccess(true)
    }

    if (!prompt.trim() || !file) {
      setError("Please provide a prompt and upload an image or video.")
      return
    }

    const objectUrl = URL.createObjectURL(file)
    const isVideo = file.type.startsWith("video/")

    const title =
      prompt.trim().length > 60 ? `${prompt.trim().slice(0, 57)}...` : prompt.trim()

    const newArtwork: Artwork = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title,
      artist: "Pallete User",
      price: model,
      description: prompt.trim(),
      medium: model,
      ...(isVideo ? { video: objectUrl } : { image: objectUrl }),
    }

    setItems((prev) => [...prev, newArtwork])
    setPrompt("")
    setModel("FLUX")
    setFile(null)
    setError(null)
    e.currentTarget.reset()
  }

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

          <div className="w-full flex flex-col gap-6">
            <div className="w-full flex justify-center">
              <div className="w-full max-w-xl">
                <label className="block text-sm md:text-base uppercase tracking-[0.2em] text-white/40 mb-2 text-center">
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

            <form
              onSubmit={handleSubmit}
              className="w-full max-w-3xl mx-auto rounded-2xl border border-white/10 bg-black/40 px-4 py-5 md:px-6 md:py-6 flex flex-col gap-4 md:gap-5"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs text-white/60 mb-1">Prompt</label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-white/10 bg-[#181818] px-3 py-2 text-sm text-white/80 placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30"
                    placeholder="Describe the scene, style, and mood of your artwork…"
                  />
                </div>

                <div className="w-full md:w-60 flex flex-col gap-3">
                  <div>
                    <label className="block text-xs text-white/60 mb-1">Model</label>
                    <select
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#181818] px-3 py-2 text-sm text-white/80 focus:outline-none focus:ring-1 focus:ring-white/30"
                    >
                      <option value="FLUX">FLUX</option>
                      <option value="WAN">WAN</option>
                      <option value="MIDJOURNEY">MIDJOURNEY</option>
                      <option value="VEO 3">VEO 3</option>
                      <option value="NANO BANANA">Nano Banana</option>
                      <option value="HiggsField">HiggsField</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-white/60 mb-1">
                      Upload image or video
                    </label>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                      className="block w-full text-xs text-white/70 file:mr-3 file:rounded-md file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white hover:file:bg-white/20"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="w-full md:w-60">
                  <label className="block text-xs text-white/60 mb-1">
                    Upload password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#181818] px-3 py-2 text-sm text-white/80 placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30"
                    placeholder="Enter password to enable uploads"
                  />
                </div>
                <p className="flex-1 text-[11px] md:text-xs text-white/40 md:text-right">
                  Only users with the upload password can add new artworks. This is a simple
                  MVP gate, not full authentication.
                </p>
              </div>

              {error && <p className="text-xs text-red-400">{error}</p>}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center rounded-full bg-white text-black px-5 py-2 text-xs md:text-sm font-medium hover:bg-white/90 transition-colors"
                >
                  Add to gallery
                </button>
              </div>
            </form>
          </div>
        </header>

        <section className="space-y-12">
          {/* Photos Section */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold text-white/90 mb-6">
              Photos
            </h2>
            <ArtworkGrid artworks={items} filterType="image" searchQuery={searchQuery} />
          </section>

          {/* Videos Section */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold text-white/90 mb-6">
              Videos
            </h2>
            <ArtworkGrid artworks={items} filterType="video" searchQuery={searchQuery} />
          </section>
        </section>
      </main>
    </div>
  )
}

 
