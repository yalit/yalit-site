import { GalleryPhoto } from "@/model/gallery.interface"
import { useEffect, useState } from "react"
import GalleryImage from "./galleryImage"
import { join } from "path"
import Lightbox from "../shared/lightbox"
import { getWindowSize, noWindowSize, WindowSize } from "@/lib/window"

type LightboxGalleryProps = { slug: string, photos: GalleryPhoto[] }

export default function LightboxGallery({ slug, photos }: LightboxGalleryProps) {
    const [columns, setColumns] = useState<GalleryPhoto[][]>([])
    const [displayedPhoto, setDisplayedPhoto] = useState<GalleryPhoto | null>(null)
    const [windowSize, setWindowSize] = useState<WindowSize>(noWindowSize);

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        handleWindowResize();

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);


    return (
        <>{photos.map((photo: GalleryPhoto) => (
            <div key={photo.path} className="photo" onClick={() => setDisplayedPhoto(photo)}>
                <Lightbox img={""} enlighted={photo === displayedPhoto}>
                    <GalleryImage src={join(slug, photo.path)} alt={photo.subtitle} />
                </Lightbox>
                <div className="photo-info">{photo.subtitle}</div>
            </div>
        ))}
        </>
    )
}


