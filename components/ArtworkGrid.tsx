"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import type { Artwork } from "@/data/artworks"
import { ArtworkModal } from "./ArtworkModal"
import { Play } from "lucide-react"

export function ArtworkGrid({
  artworks,
  filterType,
  searchQuery,
}: {
  artworks: Artwork[]
  filterType?: "video" | "image"
  searchQuery?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter artworks based on media type first
  const typeFilteredArtworks = filterType
    ? artworks.filter((artwork) => {
        if (filterType === "video") return artwork.video
        if (filterType === "image") return artwork.image
        return true
      })
    : artworks

  // Apply search filter (case-insensitive) across metadata fields
  const normalizedQuery = searchQuery?.trim().toLowerCase()

  const filteredArtworks =
    normalizedQuery && normalizedQuery.length > 0
      ? typeFilteredArtworks.filter((artwork) => {
          const fields = [
            artwork.title,
            artwork.artist,
            artwork.price,
            artwork.medium,
            artwork.description,
          ]

          return fields.some((field) =>
            field?.toLowerCase().includes(normalizedQuery)
          )
        })
      : typeFilteredArtworks

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const handleArtworkClick = (artwork: Artwork) => {
    setSelectedArtwork(artwork)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedArtwork(null)
  }

  const renderMedia = (artwork: Artwork) => {
    if (artwork.video) {
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <video
            src={artwork.video}
            className="w-full h-full object-cover"
            muted
            loop
            onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
            onMouseLeave={(e) => (e.target as HTMLVideoElement).pause()}
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
              <Play className="w-6 h-6 text-white" fill="white" />
            </div>
          </div>
        </div>
      )
    }

    if (artwork.image) {
      return (
        <Image
          src={artwork.image}
          alt={artwork.title}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
      )
    }

    // Fallback placeholder
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        <div className="text-muted-foreground text-sm">No media</div>
      </div>
    )
  }

  return (
    <>
      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {filteredArtworks.map((artwork) => (
          <motion.div
            key={artwork.id}
            variants={item}
            onClick={() => handleArtworkClick(artwork)}
            className="cursor-pointer group block overflow-hidden rounded-lg"
          >
            <div className="group">
              {/* Image container with only top rounded corners */}
              <div className="relative aspect-square overflow-hidden rounded-t-xl">
                {renderMedia(artwork)}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* Info container with only bottom rounded corners */}
              <div className="p-4 border-2 border-white/20 border-t-0 rounded-b-xl">
                <h3 className="font-medium text-white">Title - {artwork.title}</h3>
                <p className="text-sm text-white/70">Artist - {artwork.artist}</p>
                <p className="mt-2 text-sm font-medium text-white/90">
                  Model - {artwork.price}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredArtworks.length === 0 && (
        <div className="mt-6 rounded-xl border border-dashed border-white/15 bg-black/30 px-6 py-8 text-center text-sm text-white/50">
          No results found. Try adjusting your search terms.
        </div>
      )}

      <ArtworkModal
        artwork={selectedArtwork}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
} 