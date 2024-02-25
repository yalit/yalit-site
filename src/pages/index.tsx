import React from "react";
import "../styles/index.scss";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

export default function IndexPage() {
  return (
    <>
      <div className="four-images">
        <StaticImage
          src="../images/index/code.jpg"
          alt="Computer with notebook"
          width={1200}
          className="top left"
          data-title="Developer"
          placeholder="blurred"
        />
        <StaticImage
          src="../images/index/sunset.jpg"
          alt="Sunset image with a person watching"
          width={1200}
          className="top left"
          data-title="Developer"
          placeholder="blurred"
        />
      </div>
      <div className="four-titles">
        <Link to="/software">Software Craftsman</Link>
        <Link to="/reveries">Photography (Rêveries)</Link>
      </div>
    </>
  );
}

export const Head: React.FC = () => <title>Home</title>;
