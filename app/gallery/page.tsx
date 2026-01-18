import { GalleryShell } from "@/components/GalleryShell";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Gallery Collection",
  description: "Browse our complete collection of contemporary artwork",
}

export default function GalleryPage() {
  return(

    <>
  <GalleryShell />
  <Footer/>
  </> 
  )
} 