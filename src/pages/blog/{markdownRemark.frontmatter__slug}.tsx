import React from "react";
import Layout from "../../components/layout";
import { graphql } from "gatsby";
import { GatsbyImage, IGatsbyImageData, getImage } from "gatsby-plugin-image";
import { postContainer } from "../../styles/blog.module.scss";
import { summary } from "../../styles/shared.module.scss";
type BlogPostDetails = {
  id: string;
  title: string;
  date: string;
  tags: string[];
  html: string;
  excerpt: string;
  img_hero: IGatsbyImageData;
  img_hero_alt: string;
  img_hero_title: string;
};

export default function BlogPost({ data }) {
  const blog: BlogPostDetails = {
    id: data.markdownRemark.id,
    html: data.markdownRemark.html,
    ...data.markdownRemark.frontmatter,
    img_hero: getImage(data.markdownRemark.frontmatter.img_hero),
  };

  return (
    <Layout>
      <div className={postContainer}>
        <div className="date">
          <span class="h-4 w-0.5 rounded-full bg-zinc-200"></span>
          <div className="ml-3">{blog.date}</div>
        </div>
        <div className="tags">
          <span class="h-4 w-0.5 mr-2 rounded-full bg-zinc-200"></span>
          {blog.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="title">{blog.title}</div>
        <GatsbyImage
          image={blog.img_hero}
          alt={blog.img_hero_alt}
          className="mb-5"
        />
        <div dangerouslySetInnerHTML={{ __html: blog.html }} />
      </div>
    </Layout>
  );
}

export const query = graphql`
  query ($id: String) {
    markdownRemark(id: { eq: $id }) {
      html
      id
      frontmatter {
        date(formatString: "D-MMM-YYYY")
        slug
        tags
        title
        img_hero {
          childImageSharp {
            gatsbyImageData(width: 1280, placeholder: BLURRED)
          }
        }
        img_hero_alt
        img_hero_credit
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        id
        frontmatter {
          date
        }
      }
    }
  }
`;
