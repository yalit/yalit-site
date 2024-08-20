import classnames from "@/lib/classnames"
import CSS from "csstype"

type ImageProps = {
    src: string
    alt: string
    classname?: string
    imgClassname?: string
    legend?: string
    width?: number
    height?: number
}
export function Image({ src, alt, width = -1, height = -1, legend = "", classname = "", imgClassname = "" }: ImageProps) {
    const style: CSS.Properties = {}
    const imgProps: ImageProps = {
        src: "images/" + src,
        alt,
    }

    if (width >= 0) {
        style.width = width.toString()
        imgProps.width = width
    }

    if (height >= 0) {
        style.height = height.toString()
        imgProps.height = height
    }

    const imageClass = classnames("image-wrapper", classname)


    return (
        <div style={style} className={imageClass}>
            <img {...imgProps} style={{ objectFit: "cover", opacity: 1 }} className={imgClassname} />
        </div >
    );
}
