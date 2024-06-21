import { IGatsbyImageData } from "gatsby-plugin-image";

export default interface Project {
    id: string,
    title: string,
    slug: string,
    date: Date,
    tags: string[],
    repository: string|null,
    summary: string,
    thumbnail: IGatsbyImageData|null
}
