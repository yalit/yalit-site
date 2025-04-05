import {AppProps} from "next/app";
import '../styles/globals.css'
import classnames from "@/lib/classnames";
import {Navigation} from "@/components/shared/Navigation";
import Head from "next/head";

export default function Layout({Component, pageProps}: AppProps) {
    const containerClassNames = classnames("container-perso");

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <div className={containerClassNames}>
                <header className="header">
                    <Navigation type="top"/>
                </header>

                <main className="pt-[20px] md:pt-[80px] flex-1">
                    <Component {...pageProps} />
                </main>

                <footer
                    className="flex flex-col md:flex-row justify-start md:justify-between items-center flex-wrap border-t border-zinc-100 px-5 lg:px-8 pb-2">
                    <Navigation type="bottom"/>
                    <div className="flex-1"></div>
                    <div className="text-zinc-800 text-xs italic text-center">
                        © {new Date().getFullYear()} Yalit Consultancy. All Rights Reserved,
                        Statically built with Next.js
                    </div>
                </footer>
            </div>
        </>
    )
}
