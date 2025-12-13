import classnames from "@/lib/classnames";
import {AppImage} from "@/components/appImage";
import {PropsWithChildren} from "react";

type CartoonRomProps = PropsWithChildren & {
    images: string[],
    title: string,
    id: string
}

export default function CartoonRow({id, title, images, children}: CartoonRomProps) {
    const block_classes = classnames(
        "grid grid-cols-3 gap-3 w-full bg-white mt-5",
    )

    console.log(images)
    return (
        <div>
            <h3 id={id}>{title}</h3>
            <div className={block_classes}>
                {images.map((image, index) => {
                    return <AppImage src={image} alt={""} />
                })}
            </div>
            <div className="italic p-2 text-center">{children}</div>
        </div>
    );
}

