export default interface ProjectInformation {
    title: string,
    slug: string,
    date: string,
    tags: string[],
    thumbnail?: string,
    repository?: string,
    summary: string
}
