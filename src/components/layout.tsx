import React from "react";
import "../styles/layout.scss";
import classnames from "../helpers/classnames";
import { Navigation } from "./shared/Navigation";

export default function Layout({
    children,
    containerClassName = "",
}: {
        children: React.ReactNode;
        containerClassName?: string;
    }) {
    const containerClassNames = classnames("container-perso", containerClassName);
    return (
        <div className={containerClassNames}>
            <header className="header">
                <Navigation type="top"/>
            </header>

            <main className="pt-[var(--content-offset)]">{children}</main>

        <footer className="flex flex-col md:flex-row justify-start md:justify-between items-center flex-wrap border-t border-zinc-100 mt-10 pb-16 pt-10 md:px-4 lg:px-8">
                <Navigation type="bottom" />
                <div className="flex-1"></div>
                <div className="text-zinc-800 text-xs italic">
                    © {new Date().getFullYear()} Yalit Consultancy. All Rights Reserved,
                    Built with Gatsby
                </div>
            </footer>
        </div>
    );
}
