import { BlogPost } from "../components/blog/BlogPostsList";
import { BlogPostNode } from "../pages/blog/index";

export default function usePostsFromAllFile(posts: BlogPostNode[]): BlogPost[] {
  return posts.map((node) => {
    return {
      id: node.childMarkdownRemark.id,
      title: node.childMarkdownRemark.frontmatter.title,
      date: node.childMarkdownRemark.frontmatter.date,
      summary: node.childMarkdownRemark.frontmatter.summary,
      slug: node.childMarkdownRemark.frontmatter.slug,
    };
  });
}
