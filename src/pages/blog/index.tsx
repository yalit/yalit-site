import Layout from "../../components/layout";
import React from "react";
import { summary } from "../../styles/shared.module.scss";
import { graphql } from "gatsby";
import "../../styles/blog.scss";

export default function BlogPost({ data }) {
  return (
    <Layout>
      <div className="px-8">
        <div className={summary}>
          <div className="title">
            <p>A place to share my thoughts</p>
            <p className="ml-8">Un endroit pour partager mes pensées</p>
          </div>
        </div>
        <div className="blog-posts">
          {data.allFile.nodes.map((node) => {
            const post = node.childMarkdownRemark.frontmatter;
            return (
              <a href={post.slug}>
                <div key={node.childMarkdownRemark.id} className="post">
                  <div className="post-date">
                    <p className="h-4 w-0.5 rounded-full bg-zinc-200"></p>
                    <p>{post.date}</p>
                  </div>
                  <div className="post-details">
                    <div className="title">{post.title}</div>
                    <div className="summary">{post.summary}</div>
                    <div className="read-more">Read more...</div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query BlogPage {
    allFile(
      filter: { sourceInstanceName: { eq: "blog" }, extension: { eq: "md" } }
      sort: { childMarkdownRemark: { frontmatter: { date: DESC } } }
    ) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            slug
            title
            summary
            date(formatString: "MMMM DD, YYYY")
          }
          id
        }
      }
    }
  }
`;
