import { Link, PageProps } from "gatsby";
import * as React from "react";
import Layout from "../components/layout";
import { summary } from "../styles/shared.module.scss";
import { banner, bannerImage } from "../styles/index.module.scss";
import LinkedinIcon from "../components/icons/linkedin";
import GithubIcon from "../components/icons/github";
import Icon500px from "../components/icons/500px";
import InstagramIcon from "../components/icons/instagram";
import { StaticImage } from "gatsby-plugin-image";
import classnames from "../helpers/classnames";

type BannerImageType = { src: string; alt: string };

const bannerImages: BannerImageType[] = [
  { src: "../images/index/coast.jpg", alt: "Coast with cliffs and nature" },
  { src: "../images/index/cow.jpg", alt: "Coast with cliffs and nature" },
  { src: "../images/index/source.jpg", alt: "Coast with cliffs and nature" },
  { src: "../images/index/wood_nb.jpg", alt: "Coast with cliffs and nature" },
  {
    src: "../images/index/tree_light.jpg",
    alt: "Coast with cliffs and nature",
  },
];

const IndexPage: React.FC<PageProps> = ({ data }) => {
  return (
    <Layout>
      <div className={summary}>
        <div className="title">
          <p>Developer</p>
          <p className="ml-10">Analyst</p>
          <p className="ml-20">Project manager</p>
          <p className="ml-32">Daydreams photographer</p>
          <StaticImage
            src="../images/index/me.jpg"
            alt="Me"
            width={100}
            height={100}
            className="me"
          />
        </div>
        <div className="description">
          <div>
            <p>
              I'm Yannick, a developer, analyst, and project manager. I have a
              passion for technology and I love to find solutions and build
              things. I have a strong background in software development,
              project management and business analysis. I have worked in various
              industries including finance, insurance, and healthcare. I thrive
              in a fast-paced environment and I am always looking for new
              challenges.
              <br />
              My favorite stack is <Link to="https://react.dev/">React</Link>
              &nbsp;and <Link to="https://www.symfony.com">Symfony</Link>, but I
              have experience with other technologies as well. I am always
              looking to learn new things and I am open to new opportunities.
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
              I'm also a passionate photographer. <br />I love to capture the
              beauty of the world and share it with others. I have a strong
              interest in nature, landscapes, and urban photography. <br />I
              love to explore new places and capture the beauty of the world.
              I'm always looking for new opportunities to collaborate with other
              photographers and artists.
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

      <div className={banner}>
        <StaticImage
          className={classnames(bannerImage, "-rotate-3")}
          src="../images/index/coast.jpg"
          alt="Coast with cliffs and nature"
        />
        <StaticImage
          className={classnames(bannerImage, "rotate-2")}
          src="../images/index/cow.jpg"
          alt="Coast with cliffs and nature"
        />
        <StaticImage
          className={classnames(bannerImage, "-rotate-1")}
          src="../images/index/source.jpg"
          alt="Coast with cliffs and nature"
        />
        <StaticImage
          className={classnames(bannerImage, "rotate-2")}
          src="../images/index/wood_nb.jpg"
          alt="Coast with cliffs and nature"
        />
        <StaticImage
          className={classnames(bannerImage, "-rotate-3")}
          src="../images/index/tree_light.jpg"
          alt="Coast with cliffs and nature"
        />
      </div>
    </Layout>
  );
};

export const Head: React.FC = () => <title>Home</title>;

export default IndexPage;
