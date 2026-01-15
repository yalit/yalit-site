import classnames from "@/lib/classnames"
import CSS from "csstype"
import {useState} from "react";

export type AppImageProps = {
    src: string
    alt: string
    classname?: string
    imgClassname?: string
    width?: number
    height?: number
}

export function AppImage({src, alt, width = -1, height = -1, classname = "", imgClassname = ""}: AppImageProps) {
    const style: CSS.Properties = {}
    const imgProps: AppImageProps = {
        src: "/images/" + src,
        alt,
    }
    const [displayLarge, setDisplayLarge] = useState<boolean>(false)

    const toggleDisplayLarge = () => {
        setDisplayLarge(!displayLarge)
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
        <>
            <div style={style} className={imageClass} onClick={toggleDisplayLarge}>
                <img {...imgProps} style={{objectFit: "cover", opacity: 1}} className={imgClassname} alt={alt}/>
            </div>
            {displayLarge && (
                <div className="fixed inset-0 z-[10000] overflow-hidden flex justify-center items-center h-full">
                    <div className="fixed inset-0" onClick={toggleDisplayLarge}></div>
                    <img className="max-w-[80vw] max-h-[80vh]" {...imgProps} />
                </div>
            )}
        </>
    );
}
