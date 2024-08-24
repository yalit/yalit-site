import ProjectInformation from "@/model/project.interface";
import ProjectsListProject from "./ProjectsListProject";

export default function ProjectList({ projects }: { projects: ProjectInformation[] }) {
    return (
        <div className="project-list flex flex-col gap-[3rem]">
            {projects.map((project: ProjectInformation) => <ProjectsListProject project={project} key={project.title} />)}
        </div>
    )
}

