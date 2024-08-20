import { AppProps } from "next/app";
import '../styles/globals.css'
import classnames from "@/lib/classnames";
import { Navigation } from "@/components/shared/Navigation";

export default function Layout({ Component, pageProps }: AppProps) {
    const containerClassNames = classnames("container-perso");

    return (
        <div className={containerClassNames}>
            <header className="header">
                <Navigation type="top" />
            </header>

            <main className="pt-[var(--content-offset)]">
                <Component {...pageProps} />
            </main>

            <footer className="flex flex-col md:flex-row justify-start md:justify-between items-center flex-wrap border-t border-zinc-100 mt-10 pb-16 pt-10 md:px-4 lg:px-8">
                <Navigation type="bottom" />
                <div className="flex-1"></div>
                <div className="text-zinc-800 text-xs italic">
                    © {new Date().getFullYear()} Yalit Consultancy. All Rights Reserved,
                    Statically built with Next.js
                </div>
            </footer>
        </div>

    )
}
