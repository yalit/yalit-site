import { Link, withPrefix } from "gatsby";
import React from "react";

export type BlogPost = {
  date: string;
  title: string;
  summary: string;
  slug: string;
  id: string;
};

type BlogPostsListProps = {
  posts: BlogPost[];
};

export default function BlogPostsList({ posts }: BlogPostsListProps) {
  return (
    <div className="blog-posts mx-auto w-full max-w-3xl md:max-w-5xl md:p-8 text-sm">
      {posts.map((post) => {
        return (
          <Link to={"/blog/" + post.slug}>
            <div key={post.id} className="post">
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
          </Link>
        );
      })}
    </div>
  );
}
