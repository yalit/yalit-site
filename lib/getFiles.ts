import { readdirSync } from "fs";
import { join } from "path";

export function getFilesFromFolder(folder: string, extension: string = ''): string[] {
    const files = readdirSync(folder, {
        recursive: true, withFileTypes: true
    })

    return files.map(d => join(d.parentPath, d.name)).filter(f => extension === '' ? true : f.endsWith(extension))
}

