import Layout from "../../components/layout";
import React from "react";
import { graphql } from "gatsby";
import BlogPostsList from "../../components/blog/BlogPostsList";
import usePostsFromAllFile from "../../hooks/usePostsFromAllFile";
import "../../styles/shared.scss";
import "../../styles/blog.scss";

export type BlogPostNode = {
  childMarkdownRemark: {
    id: string;
    frontmatter: {
      title: string;
      slug: string;
      summary: string;
      date: string;
    };
  };
};

type BlogPostsProps = {
  data: {
    allFile: {
      nodes: BlogPostNode[];
    };
  };
};

const BlogPosts = ({ data }: BlogPostsProps) => {
  const posts = usePostsFromAllFile(data.allFile.nodes);
  return (
    <Layout>
      <div className="px-8">
        <div className="summary">
          <div className="title">
            <p>Some notes and thoughts</p>
          </div>
          <div className="description">
            A place where I want to share some of my thoughts, ideas,
            experiences and also some technical bits. I hope you'll find
            something useful here.
          </div>
        </div>
        <BlogPostsList posts={posts} />
      </div>
    </Layout>
  );
};

export default BlogPosts;

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
