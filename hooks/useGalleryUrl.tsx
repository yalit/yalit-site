import { GalleryInterface } from "@/model/gallery.interface"
import { join } from "path"

export default function useGalleryUrl() {
    const generate = (gallery: GalleryInterface): string => join("/", "reveries", join(...gallery.categories.map(c => c.toLowerCase())), gallery.slug)

    return { generate }
}
