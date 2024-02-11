import { Link, PageProps } from "gatsby";
import * as React from "react";
import Layout from "../components/layout";
import { global_content_offset_y } from "../styles/layout.module.scss";
import { summary } from "../styles/index.module.scss";
import LinkedinIcon from "../components/icons/linkedin";
import GithubIcon from "../components/icons/github";
import Icon500px from "../components/icons/500px";
import InstagramIcon from "../components/icons/instagram";
import { StaticImage } from "gatsby-plugin-image";

const IndexPage: React.FC<PageProps> = ({ data }) => {
  return (
    <Layout>
      <div className={global_content_offset_y}></div>
      <div className={summary}>
        <div className="title">
          <p>Application developer, analyst, and project manager.</p>
          <p className="ml-40">Daydreams photographer</p>
        </div>
        <div className="description">
          <div>
            <p>
              I'm Yannick, an application engineer, analyst, and project
              manager. I have a passion for technology and I love to engineer
              and build things. I have a strong background in software
              development, project management and business analysis. I have
              worked in various industries including finance, insurance, and
              healthcare. I thrive in a fast-paced environment and I am always
              looking for new challenges.
            </p>
            <StaticImage
              className="rounded_img rotate-2"
              src="../images/index/code.jpg"
              alt="Computer with code and a notebook"
              width={600}
              height={600}
            />
          </div>
          <div>
            <p>
              I'm also a passionate photographer. I love to capture the beauty
              of the world and share it with others. I have a strong interest in
              nature, landscapes, and urban photography. I love to explore new
              places and capture the beauty of the world. I'm always looking for
              new opportunities to collaborate with other photographers and
              artists.
            </p>
            <StaticImage
              className="rounded_img -rotate-2"
              src="../images/index/sunset.jpg"
              alt="Computer with code and a notebook"
              width={600}
              height={600}
            />
          </div>
        </div>
        <div className="socials">
          <Link
            to="https://www.linkedin.com/in/yannickalsberge"
            target="_blank"
          >
            <LinkedinIcon />
          </Link>
          <Link to="https://github.com/yalit" target="_blank">
            <GithubIcon />
          </Link>
          <Link to="https://500px.com/p/rever1es" target="_blank">
            <Icon500px />
          </Link>
          <Link to="https://www.instagram.com/reveries_photos/" target="_blank">
            <InstagramIcon />
          </Link>
        </div>
      </div>

      <div className="banner"></div>
    </Layout>
  );
};

export const Head: React.FC = () => <title>Home</title>;

export default IndexPage;
