import { join } from "path";
import { AppImage, AppImageProps } from "../appImage";

//TODO : refactor with only gallery name and photoname as params (+ alt and classname)
export default function GalleryImage(props: AppImageProps) {
    const blogImageProps = {
        ...props,
        src: join("reveries", props.src)
    }

    return <AppImage {...blogImageProps} />
}
