import { PageProps } from "gatsby";
import * as React from "react";
import Layout from "../components/layout";
import LinkedinIcon from "../components/icons/linkedin";
import GithubIcon from "../components/icons/github";
import Icon500px from "../components/icons/500px";
import InstagramIcon from "../components/icons/instagram";
import { StaticImage } from "gatsby-plugin-image";
import classnames from "../helpers/classnames";
import "../styles/shared.scss";
import "../styles/technical.scss";

const TechnicalPage: React.FC<PageProps> = ({ data }) => {
  return (
    <Layout>
      <div className="px-8">
        <div className="summary">
          <div className="title">
            <p>Developer</p>
            <p className="ml-10">Analyst</p>
            <p className="ml-20">Project manager</p>
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
                I'm Yannick, a <span className="font-bold">developer</span>,{" "}
                <span className="font-bold">analyst</span>, and{" "}
                <span className="font-bold">project manager</span>. I have a
                passion for technology and I love to find solutions and build
                things. I have a strong background in software development,
                project management and business analysis. I have worked in
                various industries including finance, insurance, and healthcare.
                I thrive in a fast-paced environment and I am always looking for
                new challenges.
                <br />
                My favorite stack is <a href="https://react.dev/">React</a>
                &nbsp;and <a href="https://www.symfony.com">Symfony</a>, and I
                have experience with other technologies as well (Svelte,
                Wordpress, Drupal ...). I am always looking to learn new things
                and I am open to new opportunities.
              </p>
              <StaticImage
                className="rounded_img rotate-2"
                src="../images/index/code.jpg"
                alt="Computer with code and a notebook"
                width={600}
                height={600}
              />
            </div>
          </div>
          <div className="socials">
            <a
              href="https://www.linkedin.com/in/yannickalsberge"
              target="_blank"
            >
              <LinkedinIcon />
            </a>
            <a href="https://github.com/yalit" target="_blank">
              <GithubIcon />
            </a>
            <a href="https://500px.com/p/rever1es" target="_blank">
              <Icon500px />
            </a>
            <a
              href="https://www.instagram.com/reveries_photos/"
              target="_blank"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>

        <div className="banner">
          <StaticImage
            className={classnames("bannerImage", "-rotate-3")}
            src="../images/index/coast.jpg"
            alt="Coast with cliffs and nature"
          />
          <StaticImage
            className={classnames("bannerImage", "rotate-2")}
            src="../images/index/cow.jpg"
            alt="Cow portrait"
          />
          <StaticImage
            className={classnames("bannerImage", "-rotate-1")}
            src="../images/index/source.jpg"
            alt="bublling source of water"
          />
          <StaticImage
            className={classnames("bannerImage", "rotate-2")}
            src="../images/index/wood_nb.jpg"
            alt="road bewteen trees in black and white"
          />
          <StaticImage
            className={classnames("bannerImage", "-rotate-3")}
            src="../images/index/tree_light.jpg"
            alt="sun light through trees"
          />
        </div>
      </div>
    </Layout>
  );
};

export const Head: React.FC = () => (
  <title>Technical - Coder / Analyst / Project Manager</title>
);

export default TechnicalPage;
