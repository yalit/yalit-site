const string = require('./lib/string.ts')
const readline = require('readline')
const fs = require("fs")
const path = require("path")

type Post = {
    title: string,
    slug: string,
    tags: string[],
    date: string,
    header_alt?: string,
    header_credit?: string,
    summary?: string
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (query: string) => new Promise((resolve) => rl.question(query, resolve));
const srcFolder = __dirname.slice(0, __dirname.slice.length - "scripts".length - 3)

const askQuestion = async (prompt: string, defaultValue: string | null = null): Promise<string> => {
    const displayedPrompt = defaultValue ? `${prompt} [${defaultValue}] : ` : `${prompt} `
    let answer: string = await question(displayedPrompt) as string;
    answer = answer === "" ? defaultValue ?? "" : answer
    return answer
}

const getPostData = async (): Promise<Post> => {
    const today = new Date()
    const defaultDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    const date = await askQuestion("What is the date you want to publish the post on (yyyy-mm-dd) ?", defaultDate)
    let postTitle = null;
    while (!postTitle) {
        postTitle = await askQuestion("What is the post title ?")
    }

    const slug = await askQuestion("Which slug do you want to use ?", string.string_to_slug(postTitle))

    const tags: string[] = (await askQuestion("Do you want to tag the blog post? If yes, provide comma-separated values (e.a. : tag1, tag2 ...)")).replaceAll(", ", ",").split(',')

    const provideHeaderInformation: boolean = (await askQuestion("Do you want to provide information about the header image (alt and photo credit) ?", 'yes|y')).toLowerCase() in ['y', 'yes'] ? true : false

    let header_alt = ""
    let header_credit = ""
    if (provideHeaderInformation) {
        header_alt = await askQuestion("What is the alt text for the header Image ?")
        header_credit = await askQuestion("What is the credit text for the header Image ?", "Yannick (Rêveries)")
    }

    const summary = await askQuestion("Can you provide a summary of the post ?")

    return {
        title: postTitle,
        slug,
        tags: tags,
        date: date,
        header_alt,
        header_credit,
        summary
    }
}

const getTemplateFilledIn = (post: Post): string => {
    let templateContent = fs.readFileSync(path.join(__dirname, 'blog', 'post-template.mdx'), 'utf-8')

    return templateContent.replace(/%title%/g, post.title)
        .replace(/%slug%/g, post.slug)
        .replace(/%tags%/g, post.tags.join(", "))
        .replace(/%date%/g, post.date)
        .replace(/%header_alt%/g, post.header_alt)
        .replace(/%header_credit%/g, post.header_credit)
        .replace(/%summary%/g, post.summary)
        .replace(/%year%/g, post.date.slice(0, 4))
}


const createFolder = (post: Post, type: 'post' | 'image'): string => {
    const year: string = post.date.slice(0, 4)

    const baseFolder = type === 'post' ?
        path.join(srcFolder, 'posts')
        : path.join(srcFolder, 'public', 'images', 'blog')

    // check year folder
    const yearFolder = path.join(baseFolder, year)
    if (!fs.existsSync(yearFolder)) {
        fs.mkdirSync(yearFolder)
    }

    const postFolder = path.join(yearFolder, post.slug)
    fs.mkdirSync(postFolder)

    return postFolder
}

const createNewPostFile = (post: Post): string => {
    const postFolder = createFolder(post, 'post')

    const content = getTemplateFilledIn(post)
    const filePath = path.join(postFolder, 'index.mdx')
    fs.writeFileSync(filePath, content)

    return filePath
}

const copyheaderImage = (post: Post): string => {
    const sourcePath = path.join(__dirname, 'blog', 'header.jpg')
    const targetFolder = createFolder(post, 'image')
    const targetPath = path.join(targetFolder, 'header.jpg')

    fs.copyFileSync(sourcePath, targetPath)

    return targetPath
}

// Usage inside aync function do not need closure demo only
(async () => {
    try {
        // get post information
        const post: Post = await getPostData()

        // store the template text to a new mdx file
        const filePath = createNewPostFile(post)

        // copy the header file to the public image correct folder
        const imagePath = copyheaderImage(post)

        // provide information in the prompt
        console.log("The following files have been created :\r\n")
        console.log("  - new mdx file for the post : " + filePath)
        console.log("  - new header image file : " + imagePath)

        rl.close();
    } catch (e) {
        console.error("Unable to prompt", e);
    }
})();

// When done reading prompt, exit program 
rl.on('close', () => process.exit(0));

