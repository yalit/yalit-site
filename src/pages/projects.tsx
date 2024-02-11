import React from "react";
import { Link, PageProps, graphql } from "gatsby";
import Layout from "../components/layout";
import { GatsbyImage } from "gatsby-plugin-image";

export default function Projects({ data }: PageProps) {
  return (
    <Layout>
      <div>Hello World</div>
      <Link to="/about">About</Link>
      {data.projects.nodes.map((project: any) => (
        <div key={project.id}>
          <h2>{project.frontmatter.title}</h2>
          <Link to={project.frontmatter.slug}>Read more</Link>
          {project.frontmatter.thumbnail && (
            <GatsbyImage
              image={
                project.frontmatter.thumbnail.childImageSharp.gatsbyImageData
              }
              alt={project.frontmatter.title}
            />
          )}
        </div>
      ))}
    </Layout>
  );
}

export const query = graphql`
  query IndexPageQuery {
    projects: allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          title
          slug
          thumbnail {
            childImageSharp {
              gatsbyImageData(width: 400, placeholder: BLURRED)
            }
          }
        }
        id
      }
    }
  }
`;
