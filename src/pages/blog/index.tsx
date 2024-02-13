import Layout from "../../components/layout";
import React from "react";
import { summary } from "../../styles/shared.module.scss";
import { graphql } from "gatsby";
import "../../styles/blog.scss";
import BlogPostsList from "../../components/blog/BlogPostsList";
import usePostsFromAllFile from "../../hooks/usePostsFromAllFile";

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
        <div className={summary}>
          <div className="title">
            <p>A place to share my thoughts</p>
            <p className="ml-8">Un endroit pour partager mes pensées</p>
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
