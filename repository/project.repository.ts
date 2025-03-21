import { getFilesFromFolder } from "@/lib/getFiles"
import ProjectInformation from "@/model/project.interface"
import { readFileSync } from "fs"
import matter from "gray-matter"
import moment from "moment"
import { join } from "path"

const ProjectRepository = {
    allInformation: (): ProjectInformation[] => {
        const files: string[] = getFilesFromFolder(join('projects'), 'mdx')

        return files.map(extractProjectInformation).sort((a: ProjectInformation, b: ProjectInformation )=> {
            if (b.date < a.date) return -1;
            if (b.date > a.date) return 1;
            return 0;
        })
    },
}

function extractProjectInformation(file: string): ProjectInformation {
    const fileContent = readFileSync(file, 'utf8')

    const { data } = matter(fileContent)

    let project: ProjectInformation = {
        title: data.title,
        date: moment(data.date).format("YYYY-MM-DD"),
        slug: data.slug,
        tags: data.tags,
        summary: data.summary
    }

    if (data.thumbnail) project.thumbnail = data.thumbnail
    if (data.repository) project.repository = data.repository

    return project
}

export default ProjectRepository
