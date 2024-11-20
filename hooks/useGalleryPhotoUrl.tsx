import { GalleryInterface, GalleryPhoto } from "@/model/gallery.interface";
import { join } from "path";

export default function useGalleryPhotoUrl() {
  const getGalleryPhotoUrl = (
    photo: GalleryPhoto,
    gallery: GalleryInterface,
  ): string => {
    return join("reveries", gallery.slug, photo.path);
  };

  return { getGalleryPhotoUrl };
}
