import { Link } from "gatsby";
import React, { ReactNode } from "react";
import { StaticImage } from "gatsby-plugin-image";
import "../styles/layout.scss";
import { reveriesBasePath } from "../pages/reveries";
import classnames from "../helpers/classnames";

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
  { display: "Software", link: "/software" },
  { display: "Blog", link: "/blog" },
  { display: "Projects", link: "/projects" },
  { display: "Rêveries", link: reveriesBasePath },
  { display: "Contact", link: "/contact" },
];

export default function Layout({
  children,
  containerClassName = "",
}: {
  children: React.ReactNode;
  containerClassName?: string;
}) {
  const containerClassNames = classnames("container", containerClassName);
  return (
    <div className={containerClassNames}>
      <header className="header">
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

      <div className="global_content_offset_y"></div>

      <main>{children}</main>

      <footer className="footer">
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
