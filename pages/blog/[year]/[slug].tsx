import { AppImage } from "@/components/appImage"
import BlogImage from "@/components/blog/blogImage"
import { CodeBlock } from "@/components/blog/codeBlock"
import useBlogTagUrl from "@/hooks/useBlogTagUrl"
import { PostInformationInterface, PostInterface } from "@/model/post.interface"
import StaticProps from "@/model/staticprops.interface"
import PostRepository from "@/repository/posts.repository"
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import { join } from "path"

type BlogPageProps = { post: PostInterface | null, mdxSource: MDXRemoteSerializeResult }

const availableComponents = {
    BlogImage,
    pre: (props: any) => <CodeBlock {...props} />,
}

export default function BlogPage({ post, mdxSource }: BlogPageProps) {
    const { generate: generateBlogTagUrl } = useBlogTagUrl()

    if (!post) {
        return '';
    }

    return (
        <>
            <div className="img-hero">
                <AppImage src={join("blog", post.year, post.slug, post.img_hero)} alt={post.img_hero_alt} classname="w-full" />
                <p className="img-credit">Crédit: {post.img_hero_credit}</p>
            </div>
            <div className="post-container">
                <div className="date">
                    <span className="h-4 w-0.5 rounded-full bg-zinc-200"></span>
                    <div className="ml-3">{post.date}</div>
                </div>
                {post.tags && post.tags.length > 0 && (
                    <div className="tags">
                        <span className="h-4 w-0.5 mr-2 rounded-full bg-zinc-200"></span>
                        {post.tags.map((tag, index) => (
                            <a href={generateBlogTagUrl(tag)} key={"Link-Tag" + index}>
                                <span key={index} className="tag">
                                    {tag}
                                </span>
                            </a>
                        ))}
                    </div>
                )}
                <div className="title">{post.title}</div>
                <MDXRemote {...mdxSource} components={availableComponents} />
            </div>
        </>
    )
}


export function getStaticPaths() {
    const postInfos = PostRepository.allInformation()

    return {
        paths: postInfos.map((postInfo: PostInformationInterface) => (
            { params: { year: postInfo.year, slug: postInfo.slug } }
        )),
        fallback: false
    }
}

export async function getStaticProps(context: { params: { year: string, slug: string } }): Promise<StaticProps<BlogPageProps>> {
    const post = PostRepository.post(context.params.year, context.params.slug)

    const mdxSource = await serialize(post?.content as any)

    return { props: { post, mdxSource } }
}
