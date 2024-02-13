import React from "react";
import Layout from "../../components/layout";
import { graphql } from "gatsby";
import { GatsbyImage, IGatsbyImageData, getImage } from "gatsby-plugin-image";

import "../../styles/blog.scss";

type BlogPostDetails = {
  id: string;
  title: string;
  date: string;
  tags: string[];
  html: string;
  excerpt: string;
  img_hero: IGatsbyImageData;
  img_hero_alt: string;
  img_hero_credit: string;
};

export default function BlogPost({ data }) {
  const blog: BlogPostDetails = {
    id: data.markdownRemark.id,
    html: data.markdownRemark.html,
    ...data.markdownRemark.frontmatter,
    img_hero: getImage(data.markdownRemark.frontmatter.img_hero),
  };

  console.log(data);

  return (
    <Layout>
      <div className="img-hero">
        <GatsbyImage image={blog.img_hero} alt={blog.img_hero_alt} />
        <p className="img-credit">Crédit: {blog.img_hero_credit}</p>
      </div>
      <div className="post-container">
        <div className="date">
          <span class="h-4 w-0.5 rounded-full bg-zinc-200"></span>
          <div className="ml-3">{blog.date}</div>
        </div>
        {blog.tags && blog.tags.length > 0 && (
          <div className="tags">
            <span className="h-4 w-0.5 mr-2 rounded-full bg-zinc-200"></span>
            {blog.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="title">{blog.title}</div>
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
