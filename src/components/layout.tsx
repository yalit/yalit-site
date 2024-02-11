import { Link } from "gatsby";
import React, { ReactNode } from "react";
import { global_content_offset_y } from "../styles/layout.module.scss";
import { header, container, main, footer } from "../styles/layout.module.scss";
import { StaticImage } from "gatsby-plugin-image";

type NavLinkType = { display: ReactNode; link: string };
const navLinks: NavLinkType[] = [
  {
    display: (
      <StaticImage
        src="../images/layout/logo.png"
        alt="Logo Yalit"
        placeholder="blurred"
        layout="fixed"
        width={30}
        height={30}
      />
    ),
    link: "/",
  },
  { display: "About", link: "/about" },
  { display: "Blog", link: "/blog" },
  { display: "Projects", link: "/projects" },
  { display: "Photos", link: "/photos" },
  { display: "Contact", link: "/contact" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={container}>
      <header className={header}>
        <nav>
          <div className="flex-1"></div>
          <ul>
            {navLinks.map((navLink, index) => (
              <li key={index}>
                <Link to={navLink.link}>{navLink.display}</Link>
              </li>
            ))}
          </ul>
          <div className="flex-1"></div>
        </nav>
      </header>

      <div className={global_content_offset_y}></div>

      <main className={main}>{children}</main>

      <footer className={footer}>
        <nav>
          {navLinks.map((navLink, index) => (
            <Link key={index} to={navLink.link}>
              {navLink.display}
            </Link>
          ))}
        </nav>
        <div className="flex-1"></div>
        <div className="trademark">
          © {new Date().getFullYear()} Yalit Consultancy. All Rights Reserved,
          Built with Gatsby
        </div>
      </footer>
    </div>
  );
}
