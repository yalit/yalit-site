import React, { PropsWithChildren, ReactNode, useEffect, useState }  from "react"

interface LightboxProps extends PropsWithChildren {
    content?: ReactNode,
    className?: string
}

export default function Lightbox({children, content = null, className = ""}: LightboxProps) {
    const [enlighted, setEnlighted] = useState<boolean>(false)

    const switchOn = () => setEnlighted(true)
    const switchOff = () => setEnlighted(false)

    useEffect(() => {
        const closeOnEsc = (e: KeyboardEvent) => {
            if (e.key !== 'Escape') {
                return;
            }
            switchOff()
        }

        if (enlighted) {
            document.addEventListener('keyup', closeOnEsc)
        } else {
            document.removeEventListener("keyup", closeOnEsc)
        }

    }, [enlighted])
    return (
        <>
            <div onClick={switchOn} className={className}>
                {children}
            </div>
            {enlighted &&
                <div className="lightbox fixed inset-x-0 top-0 h-screen bg-black/80 flex justify-center items-center z-[1000]" onClick={switchOff}>
                    <div className="max-w-[80%] max-h-[80%] relative">
                        {content ? content : children}
                        <div className="absolute cursor-pointer text-white text-2xl -top-[2rem] right-0">X</div>
                    </div>
                </div>
            }
        </>
    )
}
