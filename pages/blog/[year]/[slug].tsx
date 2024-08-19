import { PostInterface } from "@/model/post.interface"
import StaticProps from "@/model/staticprops.interface"
import PostRepository from "@/repository/posts.repository"
import { marked } from "marked"

type BlogPageProps = { post: PostInterface | null }

export default function BlogPage({ post }: BlogPageProps) {
    return (
        <>
            {post &&
                <>
                    <div>Blog page for : {post.title}/{post.summary ?? 'No summary'}</div>
                    <h3>Content</h3>
                    <div dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }}></div>
                </>
            }
        </>
    )
}


export function getStaticPaths() {
    const postInfos = PostRepository.allInformation()

    return {
        paths: postInfos.map(postInfo => (
            { params: { year: postInfo.year, slug: postInfo.slug } }
        )),
        fallback: true
    }
}

export function getStaticProps(context: { params: { year: string, slug: string } }): StaticProps<BlogPageProps> {
    const post = PostRepository.post(context.params.year, context.params.slug)
    return { props: { post } }
}
