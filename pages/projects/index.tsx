import ProjectsList from "@/components/projects/ProjectsList"
import classnames from "@/lib/classnames"
import ProjectInformation from "@/model/project.interface"
import ProjectRepository from "@/repository/project.repository"
import { useEffect, useState } from "react"

type ProjectsProps = {
    projects: ProjectInformation[],
    tags: string[]
}

export default function Projects({ projects, tags }: ProjectsProps) {
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [displayedProjects, setDisplayedProjects] = useState<ProjectInformation[]>(projects)

    const onClickTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    useEffect(() => {
        if (selectedTags.length === 0) {
            // reset filter
            setDisplayedProjects(projects);
        } else {
            const newProjects = projects.filter((project) => {
                return selectedTags.every((tag) => project.tags.includes(tag));
            });
            setDisplayedProjects(newProjects);
        }
    }, [selectedTags]);

    const tagClassName = (tag: string, additionalCSS: string = "") => {
        const isTagSelected =
            selectedTags.includes(tag) || (tag === "" && selectedTags.length === 0);
        return classnames(
            "px-3 py-1 rounded-md",
            isTagSelected ? "bg-blue-200" : "bg-gray-300",
            additionalCSS,
        );
    };

    return (
        <div className="px-8">
            <div className="summary">
                <div className="title">Crafting</div>
                <div className="description ml-10">
                    Below are some of the projects I've crafted.
                </div>
            </div>

            <div className="flex items-center gap-2 my-12 flex-wrap">
                <p className="font-bold text-lg">Filter by technology </p>
                <button className={tagClassName("")} onClick={() => setSelectedTags([])}>
                    All
                </button>
                {tags.map((tag) => (
                    <button
                        className={tagClassName(tag)}
                        onClick={() => onClickTag(tag)}
                        key={"dataTag-" + tag}
                    >
                        {tag}
                    </button>
                ))}
            </div>
            <ProjectsList projects={displayedProjects} />
        </div>
    )
}


export function getStaticProps(): { props: ProjectsProps } {
    const projects = ProjectRepository.allInformation()

    let tags = new Set<string>()
    projects.forEach(project => project.tags.forEach(tag => tags.add(tag)))

    return {
        props: { projects, tags: Array.from(tags).toSorted() },
    }
}
