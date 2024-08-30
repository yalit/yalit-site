import { join } from "path";
import { AppImage, AppImageProps } from "../appImage";

//TODO : refactor with only slug and photoname as params (+ alt and classname)
export default function BlogImage(props: AppImageProps) {
    const blogImageProps = {
        ...props,
        src: join("blog", props.src)
    }

    return <AppImage {...blogImageProps} />
}
