import GalleryList from "@/components/reveries/GalleryPageList";
import GalleryPageSingle from "@/components/reveries/GalleryPageSingle";
import { GalleryInterface } from "@/model/gallery.interface"
import StaticProps from "@/model/staticprops.interface";
import GalleryRepository from "@/repository/gallery.repository";

export const GALLERY_PAGE_TYPE_SINGLE = 'single_gallery'
export const GALLERY_PAGE_TYPE_LIST = 'list_gallery'

type GalleryPageProps =
    {
        type: typeof GALLERY_PAGE_TYPE_SINGLE,
        gallery: GalleryInterface
    } | {
        type: typeof GALLERY_PAGE_TYPE_LIST,
        galleries: GalleryInterface[],
        categories: string[]
    }

export default function GalleryPage(props: GalleryPageProps) {
    if (props.type === GALLERY_PAGE_TYPE_SINGLE) {
        return <GalleryPageSingle gallery={props.gallery} />
    } else if (props.type === GALLERY_PAGE_TYPE_LIST) {
        return <GalleryList galleries={props.galleries} categories={props.categories} />
    }
}


export function getStaticPaths() {
    const galleries = GalleryRepository.all()

    const paths: { params: { slug: string | string[] } }[] = []

    galleries.forEach((gallery: GalleryInterface) => {
        paths.push({ params: { slug: [...gallery.categories.map(c => c.toLowerCase()), gallery.slug] } })
        gallery.categories.forEach((_: string, idx: number) => {
            paths.push({ params: { slug: [...gallery.categories.slice(0, idx + 1).map(c => c.toLowerCase())] } })
        })
    })
    return {
        paths,
        fallback: false
    }
}


export function getStaticProps(context: { params: { slug: string[] } }): StaticProps<GalleryPageProps> {
    const gallery = GalleryRepository.gallery(context.params.slug[context.params.slug.length - 1])

    if (gallery) {
        return { props: { type: GALLERY_PAGE_TYPE_SINGLE, gallery } }
    }

    const galleries: GalleryInterface[] = GalleryRepository.getGalleriesFromCategories(context.params.slug)

    return { props: { type: GALLERY_PAGE_TYPE_LIST, galleries, categories: context.params.slug } }
}


