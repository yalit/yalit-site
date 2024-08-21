import { join } from "path";
import { AppImage, AppImageProps } from "../appImage";

export default function BlogImage(props: AppImageProps) {
    const blogImageProps = {
        ...props,
        src: join("blog", props.src)
    }

    return <AppImage {...blogImageProps} />
}
