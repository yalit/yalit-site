import { PostInformationInterface } from "@/model/post.interface";
import Link from "next/link";
import { join } from "path";

type BlogPostsListProps = {
    posts: PostInformationInterface[];
};

export default function BlogPostsList({ posts }: BlogPostsListProps) {
    return (
        <div className="blog-posts mx-auto w-full max-w-3xl md:max-w-5xl md:p-8 text-sm">
            {posts.map((post) => {
                return (
                    <Link href={join("blog", post.year, post.slug)} key={"post-" + post.slug}>
                        <div key={"post-" + post.slug} className="post">
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
