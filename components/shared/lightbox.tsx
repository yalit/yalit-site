import { PropsWithChildren, useEffect, useState } from "react"
import { AppImage } from "../appImage"

interface LightboxProps extends PropsWithChildren {
    img: string,
    className?: string,
    enlighted?: boolean | null,
}

export default function Lightbox({ img, className = "", enlighted = null }: LightboxProps) {
    const [elemEnlighted, setElemEnlighted] = useState<boolean>(false)

    const switchOn = () => setElemEnlighted(enlighted === null ? true : enlighted)
    const switchOff = () => setElemEnlighted(enlighted === null ? false : enlighted)

    useEffect(() => {
        const closeOnEsc = (e: KeyboardEvent) => {
            if (e.key !== 'Escape') {
                return;
            }
            switchOff()
        }

        if (elemEnlighted) {
            document.addEventListener('keyup', closeOnEsc)
        } else {
            document.removeEventListener("keyup", closeOnEsc)
        }

    }, [elemEnlighted])
    return (
        <>
            <div onClick={switchOn} className={className}>
                <AppImage src={img} alt="" />
            </div>
            {elemEnlighted &&
                <div className="lightbox fixed inset-x-0 top-0 h-screen w-screen bg-black/80 flex justify-center items-center z-[1000]" onClick={switchOff}>
                    <div className="w-[80%] h-[80%] relative">
                        <AppImage src={img} alt="" classname="flex justify-center items-center" />
                        <div className="absolute cursor-pointer text-white text-2xl -top-[2rem] right-0">X</div>
                    </div>
                </div>
            }
        </>
    )
}
