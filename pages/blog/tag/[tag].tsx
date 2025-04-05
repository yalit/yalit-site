import BlogPostsList from "@/components/blog/BlogPostsList"
import {PostInformationInterface} from "@/model/post.interface"
import StaticProps from "@/model/staticprops.interface"
import PostRepository from "@/repository/posts.repository"


type BlogCategoryProps = { tag: string, posts: PostInformationInterface[] }

export default function BlogCategory({posts, tag}: BlogCategoryProps) {
    return (
        <>
            <div className="summary">
                <div className="title blog">
                    <p>All articles for : {tag}</p>
                </div>
            </div>
            <BlogPostsList posts={posts}/>
        </>
    )
}


export function getStaticPaths() {
    const postInfos = PostRepository.allInformation()

    const tags = new Set<string>()

    postInfos.forEach(postInfo => {
        if (!postInfo.tags) {
            return
        }
        postInfo.tags.forEach(tag => tags.add(tag))
    })

    return {
        paths: Array.from(tags).map((tag: string) => (
            {params: {tag}}
        )),
        fallback: false
    }
}

export async function getStaticProps(context: { params: { tag: string } }): Promise<StaticProps<BlogCategoryProps>> {
    const posts = PostRepository.allInformationByDate('DESC')

    return {props: {tag: context.params.tag, posts: posts.filter(p => p.tags.includes(context.params.tag))}}
}

