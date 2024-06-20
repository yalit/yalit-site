import React from "react";
import Project from "../../types/project.interface";
import ProjectListProject from "./ProjectListProject";

export default function ProjectList({projects}: {projects: Project[]}) {
    return (
        <div className="project-list flex flex-col gap-10">
            {projects.map((project: Project) => <ProjectListProject project={project} key={project.title} />)}
        </div>
    )
}
