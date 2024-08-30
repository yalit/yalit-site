import { getFilesFromFolder } from "@/lib/getFiles";
import { GalleryInterface } from "@/model/gallery.interface";
import { readFileSync } from "fs";
import { join } from "path";
import { parse } from "yaml";
import sizeOf from 'image-size';

const GalleryRepository = {
    all: (): GalleryInterface[] => {
        const galleryFiles = getFilesFromFolder(join('reveries'), 'yaml')

        return galleryFiles.map(extractGalleryFromFile)
    },

    gallery: (slug: string): GalleryInterface => {
        const galleries = GalleryRepository.all()

        return galleries.filter((gallery: GalleryInterface) => gallery.slug === slug)[0]
    },

    getGalleriesFromCategories: (categories: string[]): GalleryInterface[] => {
        const galleries = GalleryRepository.all()

        return galleries.filter((gallery: GalleryInterface) => {
            let matched = true

            categories.forEach((category: string, idx: number) => {
                if (gallery.categories.length <= idx) {
                    matched = false;
                    return;
                }

                if (gallery.categories[idx].toLowerCase() !== category) {
                    matched = false
                    return;
                }
            })

            return matched
        })
    }
}

function extractGalleryFromFile(file: string): GalleryInterface {
    const data = parse(readFileSync(file, 'utf-8'))

    let gallery: GalleryInterface = { ...data }

    gallery.photos.forEach(photo => {
        const dimensions = sizeOf(join('public', 'images', 'reveries', gallery.slug, photo.path))
        photo.width = dimensions.width as number
        photo.height = dimensions.height as number
    })

    return gallery
}

export default GalleryRepository
