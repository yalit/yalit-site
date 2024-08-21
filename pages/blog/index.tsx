import BlogPostsList from "@/components/blog/BlogPostsList"
import { PostInformationInterface } from "@/model/post.interface"
import PostRepository from "@/repository/posts.repository"

export default function Blog({ posts }: { posts: PostInformationInterface[] }) {
    return (
        <>
            <div className="px-8">
                <div className="summary">
                    <div className="title">
                        <p>Some notes and thoughts</p>
                    </div>
                    <div className="description mb-5 md:mb-0 md:ml-5">
                        A place where I want to share some of my thoughts, ideas,
                        experiences and also some technical bits. I hope you'll find
                        something useful here.
                    </div>
                </div>
                <BlogPostsList posts={posts} />
            </div>
        </>
    )
}

export function getStaticProps() {
    const posts = PostRepository.allInformationByDate('DESC')
    return { props: { posts } }
}
