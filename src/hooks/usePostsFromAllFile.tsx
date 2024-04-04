import { BlogPost } from "../components/blog/BlogPostsList";
import { BlogPostNode } from "../pages/blog/index";

export default function usePostsFromAllMdx(posts: BlogPostNode[]): BlogPost[] {
  return posts.map((node) => {
    return {
      id: node.id,
      title: node.frontmatter.title,
      date: node.frontmatter.date,
      summary: node.frontmatter.summary,
      slug: node.frontmatter.slug,
    };
  });
}
