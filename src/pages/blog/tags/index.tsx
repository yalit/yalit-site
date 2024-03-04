import React from "react";
import Layout from "../../../components/layout";
import "../../../styles/shared.scss";
import "../../../styles/blog.scss";
import { graphql } from "gatsby";
import { BlogPostNode } from "../index";
import usePostsFromAllFile from "../../../hooks/usePostsFromAllFile";
import BlogPostsList from "../../../components/blog/BlogPostsList";

type TaggedBlogPostsProps = {
  pageContext: {
    tag: string;
  };
  data: {
    allFile: {
      nodes: BlogPostNode[];
    };
  };
};

const TaggedBlogPosts = ({ pageContext, data }: TaggedBlogPostsProps) => {
  const posts = usePostsFromAllFile(data.allFile.nodes);
  return (
    <Layout>
      <div className="px-8">
        <div className="summary">
          <div className="title">
            <p>All articles for : {pageContext.tag}</p>
          </div>
        </div>
      </div>
      <BlogPostsList posts={posts} />
    </Layout>
  );
};

export default TaggedBlogPosts;

export const query = graphql`
  query ($tag: String) {
    allFile(
      limit: 2000
      filter: {
        sourceInstanceName: { eq: "blog" }
        extension: { eq: "md" }
        childMarkdownRemark: { frontmatter: { tags: { in: [$tag] } } }
      }
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
