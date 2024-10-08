import React, { ReactNode } from "react"
import { AppImage } from "../appImage";
import Link from "next/link";

interface NavirationProps {
    type: "top" | "bottom"
}

type NavLinkType = { display: ReactNode; link: string };


export function Navigation({ type }: NavirationProps) {
    const navLinks: NavLinkType[] = [
        { display: "Me", link: "/me" },
        { display: "Blog", link: "/blog" },
        { display: "Projects", link: "/projects" },
        { display: "Rêveries", link: "/reveries" },
        { display: "Contact", link: "/contact" },
    ];
    return (
        <nav className="flex justify-between items-center py-4">
            <div className="flex-1"></div>
            <ul className="flex space-x-4 items-center text-sm rounded-full bg-white/90 px-5 py-1 font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur">
                <li>
                    <Link href="/">
                        <AppImage
                            src="layout/logo.png"
                            alt="Logo Yalit"
                            width={30}
                            height={30}
                        />
                    </Link>
                </li>
                {navLinks.map((navLink, index) => (
                    <li key={index}>
                        <Link href={navLink.link} className="font-medium">{navLink.display}</Link>
                    </li>
                ))}
            </ul>
            <div className="flex-1"></div>
        </nav>
    )
}
