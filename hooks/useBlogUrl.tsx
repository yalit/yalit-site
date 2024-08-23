import { join } from "path"

export default function useBlogUrl() {
    const generate = (year: string, slug: string): string => join("/", "blog", year, slug)

    return { generate }
}
