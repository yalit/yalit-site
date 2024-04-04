import Layout from "../../components/layout";
import React from "react";
import { graphql } from "gatsby";
import BlogPostsList from "../../components/blog/BlogPostsList";
import usePostsFromAllFile from "../../hooks/usePostsFromAllFile";
import "../../styles/shared.scss";
import "../../styles/blog.scss";

export type BlogPostNode = {
  id: string;
  frontmatter: {
    title: string;
    slug: string;
    summary: string;
    date: string;
  };
};

type BlogPostsProps = {
  data: {
    allMdx: {
      nodes: BlogPostNode[];
    };
  };
};

const BlogPosts = ({ data }: BlogPostsProps) => {
  const posts = usePostsFromAllFile(data.allMdx.nodes);
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
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
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
`;
