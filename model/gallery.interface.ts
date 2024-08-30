export interface GalleryInterface {
    order: number,
    slug: string,
    title: string,
    subtitle: string,
    idea?: string,
    tags: string[],
    categories: string[],
    location: string,
    year: number,
    frontphoto: string,
    photos: GalleryPhoto[]
}

export interface GalleryPhoto {
    path: string,
    name?: string,
    subtitle: string
    width: number,
    height: number
}
