import useGalleryUrl from "@/hooks/useGalleryUrl";
import { GalleryInterface } from "@/model/gallery.interface";
import GalleryImage from "./galleryImage";
import { join } from "path";

type GalleryListProps = { galleries: GalleryInterface[], categories?: string[] }

export default function GalleryList({ galleries, categories = [] }: GalleryListProps) {
    const { generate } = useGalleryUrl()
    return (
        <>
            <div className="page-title text-center text-4xl font-bold mt-[-50px] mb-4">Rêveries</div>
            {categories.length > 0 && (
                <div className="page-sub-title text-center text-2xl font-bold mb-8">Catégories : {categories.map(c => c.slice(0, 1).toUpperCase() + c.slice(1)).join(' / ')}</div>
            )}
            <div className="galleries">
                {galleries.map((gallery: GalleryInterface) => (
                    <a href={generate(gallery)} key={gallery.slug} >
                        <div className="gallery">
                            <GalleryImage src={join(gallery.slug, gallery.frontphoto)} alt={""} classname="ratio-1/1" />
                            <div className="overlay">
                                <div className="title">{gallery.title}</div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </>
    )
}
