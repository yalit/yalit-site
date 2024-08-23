import { join } from "path"

export default function useBlogCategoryUrl() {
    const generate = (category: string): string => join("/", "blog", "tag", category)

    return { generate }
}
