import GalleryList from "@/components/reveries/GalleryPageList";
import { GalleryInterface } from "@/model/gallery.interface";
import GalleryRepository from "@/repository/gallery.repository";

type ReveriesProps = {
    galleries: GalleryInterface[]
};

export default function Reveries({ galleries }: ReveriesProps) {
    return <GalleryList galleries={galleries} />
}


export function getStaticProps(): { props: ReveriesProps } {
    return { props: { galleries: GalleryRepository.all() } }
}
