import React from "react"
import FAQuestion from "./icons/question"
import FAArobase from "./icons/arobase"

export const Icons = {
    'question': <FAQuestion />,
    'arobase': <FAArobase />
}

interface FontAwesomeProps {
    icon: keyof typeof Icons,
    className?: string
}

export default function FontAwesome({icon, className="h-5 w-5"}: FontAwesomeProps) {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className={className}>
        {Icons[icon]}
    </svg>
}
