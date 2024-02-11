import { Link } from "gatsby";
import React from "react";
import { header, container, main, footer } from "../styles/layout.module.scss";
import { StaticImage } from "gatsby-plugin-image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={container}>
      <header className={header}>
        <nav>
          <div className="flex-1"></div>
          <ul>
            <li>
              <Link to="/">
                <StaticImage
                  src="../images/layout/logo.png"
                  alt="Logo Yalit"
                  placeholder="blurred"
                  layout="fixed"
                  width={30}
                  height={30}
                />
              </Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/photos">Photos</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <div className="flex-1"></div>
        </nav>
      </header>
      <main className={main}>{children}</main>
      <footer className={footer}>
        <div className="flex-1"></div>
        <div className="trademark">
          © {new Date().getFullYear()} Yalit Consultancy. All Rights Reserved,
          Built with Gatsby
        </div>
      </footer>
    </div>
  );
}
