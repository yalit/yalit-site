import ProjectInformation from "@/model/project.interface";
import ProjectsListProject from "./ProjectsListProject";

export default function ProjectList({ projects }: { projects: ProjectInformation[] }) {
    return (
        <div className="project-list flex flex-col gap-[3rem] px-5 md:px-8">
            {projects.map((project: ProjectInformation) => <ProjectsListProject project={project} key={project.title} />)}
        </div>
    )
}

