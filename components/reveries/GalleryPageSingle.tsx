import splitPhotoListInColumns from "@/lib/photos";
import { getWindowSize, noWindowSize, WindowSize } from "@/lib/window";
import { GalleryInterface, GalleryPhoto } from "@/model/gallery.interface";
import { useEffect, useRef, useState } from "react";
import Lightbox from "../shared/lightbox";
import { join } from "path";

type GalleryPageSingleProps = { gallery: GalleryInterface }

export default function GalleryPageSingle({ gallery }: GalleryPageSingleProps) {
    const [windowSize, setWindowSize] = useState<WindowSize>(noWindowSize);
    const [photos, setPhotos] = useState<GalleryPhoto[][]>(splitPhotoListInColumns(gallery.photos, 3, 50));
    const photosRef = useRef<HTMLDivElement>(null)

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


    useEffect(() => {
        const columnWidth = photosRef.current?.getBoundingClientRect().width ?? 50

        if (windowSize.width >= 768 && windowSize.width < 1280) {
            if (photos.length === 2) {
                return;
            }
            setPhotos(splitPhotoListInColumns(gallery.photos, 2, columnWidth)); //if window size is less than 1280px, show photos in two columns
        } else if (windowSize.width >= 1280) {
            if (photos.length === 3) {
                return;
            }
            setPhotos(splitPhotoListInColumns(gallery.photos, 3, columnWidth)); //if window size is more than 1280px, show photos in 3 columns
        } else {
            if (photos.length === 1) {
                return;
            }
            setPhotos(splitPhotoListInColumns(gallery.photos, 1, columnWidth)); //otherwise, show photos in two columns
        }
    }, [windowSize, photosRef, photos.length, gallery.photos]);


    return (
        <div className="gallery-page">
            <div className="gallery-title">
                <div className="title">{gallery.title}</div>
                {gallery.subtitle && (
                    <div className="subtitle">{gallery.subtitle}</div>
                )}
            </div>
            <div className="gallery-info">
                <div className="infos idea">
                    <div className="info-title">Idea</div>
                    <div className="info-content">{gallery.idea}</div>
                </div>
                <div className="infos categories">
                    <div className="info-title">Categories</div>
                    <div className="info-content">
                        {gallery.categories.map((category, idx) => {
                            const style = { paddingLeft: `${idx * 10}px` }
                            const categories = gallery.categories.slice(0, idx + 1).map(c => c.toLowerCase())
                            return (
                                <div key={gallery.title + category} style={style}>
                                    <a href={"/reveries/" + categories.join('/')}>
                                        {category}
                                    </a>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="infos tags">
                    <div className="info-title">Tags</div>
                    <div className="info-content">
                        {gallery.tags.map((tag) => (
                            <div key={tag}>#{tag}</div>
                        ))}
                    </div>
                </div>
                {gallery.location && (
                    <div className="infos location">
                        <div className="info-title">Time & Place</div>
                        <div className="info-content">
                            {gallery.year && String(gallery.year) + " - "}
                            {gallery.location}
                        </div>
                    </div>
                )}
            </div>
            <div className="gallery-photos" ref={photosRef}>
                {photos.map((column: GalleryPhoto[], index) => {
                    return (
                        <div className="photos-column" key={"column-" + index}>
                            {column.map((photo: GalleryPhoto) => (
                                <div className="photo" key={photo.path}>
                                    <Lightbox img={join('reveries', gallery.slug, photo.path)} />
                                    <div className="photo-info">{photo.subtitle}</div>
                                </div>
                            ))}
                        </div>
                    )
                })}
            </div>
        </div >

    )
}

