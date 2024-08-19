import useBlogPosts from "@/hooks/useBlogPosts"
import { PostInformationInterface } from "@/model/post.interface"
import PostRepository from "@/repository/posts.repository"

export default function Blog({ posts }: { posts: PostInformationInterface[] }) {
    return (
        <>
            <div>Blog page</div>
            {posts.map(p => <div key={p.slug}>{p.title} =&gt; {p.slug}</div>)}
        </>
    )
}

export function getStaticProps() {
    const posts = PostRepository.allInformation()
    return { props: { posts } }
}
