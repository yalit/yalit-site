import { join } from "path";
import { AppImage, AppImageProps } from "../appImage";

export default function ProjectImage(props: AppImageProps) {
    const blogImageProps = {
        ...props,
        src: join("projects", props.src)
    }

    return <AppImage {...blogImageProps} />
}
