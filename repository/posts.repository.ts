import { getFilesFromFolder } from "@/lib/getFiles"
import { PostInformationInterface, PostInterface } from "@/model/post.interface"
import { readFileSync } from "fs"
import matter from "gray-matter"
import moment from "moment"
import { join } from "path"

const PostRepository = {
    allInformation: (): PostInformationInterface[] => {
        const files = getFilesFromFolder(join('posts'), 'mdx')

        return files.map(extractPostInformation)
    },

    post: (year: string, slug: string): PostInterface | null => {
        const files = getFilesFromFolder(join('posts'), 'mdx')

        return files.map(extractPost).filter(p => p.year === year && p.slug === slug)[0] ?? null
    }

}


function extractPostInformation(file: string): PostInformationInterface {
    const { frontmatter, year } = extractFileFrontMatterData(file)

    return {
        title: frontmatter.title as string,
        date: moment(frontmatter.date).format("DD-MM-YYYY"),
        slug: frontmatter.slug as string,
        summary: frontmatter.summary ?? '' as string,
        year
    }
}

function extractPost(file: string): PostInterface {
    const { frontmatter, year, content } = extractFileFrontMatterData(file)

    return {
        title: frontmatter.title as string,
        date: moment(frontmatter.date).format("DD-MM-YYYY"),
        slug: frontmatter.slug as string,
        summary: frontmatter.summary ?? '' as string,
        year,
        tags: frontmatter.tags as string[],
        img_hero: frontmatter.img_hero as string ?? '',
        img_hero_alt: frontmatter.img_hero_alt as string ?? '',
        img_hero_credit: frontmatter.img_hero_credit as string ?? '',
        content
    }
}


function extractFileFrontMatterData(file: string) {
    const fileContent = readFileSync(file, 'utf8')
    const year = file.split('/')[1]

    const { data: frontmatter, content } = matter(fileContent)

    return { frontmatter, content, year }
}

export default PostRepository
