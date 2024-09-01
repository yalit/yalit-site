import { getFilesFromFolder } from "@/lib/getFiles"
import { PostInformationInterface, PostInterface } from "@/model/post.interface"
import { readFileSync } from "fs"
import matter from "gray-matter"
import moment from "moment"
import { join } from "path"
import { OrderByOrder } from "./types.repository"

const PostRepository = {
    allInformation: (): PostInformationInterface[] => {
        const files: string[] = getFilesFromFolder(join('posts'), 'mdx')

        return files.map(extractPostInformation)
    },

    allInformationByDate: (order: OrderByOrder): PostInformationInterface[] => {
        const infos = PostRepository.allInformation()

        return infos.toSorted((a, b) => {
            const [dayA, monthA, yearA] = a.date.split('-')
            const dateA = new Date(Number(yearA), Number(monthA) - 1, Number(dayA))
            const [dayB, monthB, yearB] = b.date.split('-')
            const dateB = new Date(Number(yearB), Number(monthB) - 1, Number(dayB))

            if (dateA < dateB) return order === 'ASC' ? -1 : 1
            if (dateA > dateB) return order === 'ASC' ? 1 : -1
            return 0
        })
    },

    post: (year: string, slug: string): PostInterface | null => {
        const files = getFilesFromFolder(join('posts'), 'mdx')

        return files.map(extractPost).filter((p: PostInterface) => p.year === year && p.slug === slug)[0] ?? null
    }

}

function extractPostInformation(file: string): PostInformationInterface {
    const { frontmatter, year } = extractFileFrontMatterData(file)

    return {
        title: frontmatter.title as string,
        date: moment(frontmatter.date).format("DD-MM-YYYY"),
        slug: frontmatter.slug as string,
        summary: frontmatter.summary ?? '' as string,
        year,
        tags: frontmatter.tags
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
        img_header: frontmatter.img_header as string ?? '',
        img_header_alt: frontmatter.img_header_alt as string ?? '',
        img_header_credit: frontmatter.img_header_credit as string ?? '',
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
