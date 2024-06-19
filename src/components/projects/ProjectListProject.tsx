import React from "react";
import Project from "../../types/project.interface";
import { GatsbyImage } from "gatsby-plugin-image";

export default function ProjectListProject({project}: {project: Project}) {
    console.log(project)
    return (
        <div className="projectlist-project flex justify-between shadow">
            <div className="title w-1/5 flex justify-start items-center p-2 bg-gray-800 text-gray-50 font-semibold uppercase rounded-tl-md rounded-bl-md">
                {project.title}
            </div>
            <div className="image flex-1 border-y border-gray-800"><GatsbyImage image={project.thumbnail} alt={project.title}/></div>
            <div className="summary flex flex-col justify-between w-1/3 p-2 border-y border-r border-gray-800 rounded-tr-md rounded-br-md">
                <div className="summary__info">
                    <div className="summary__title mb-2 font-semibold text-xl text-gray-800">Summary</div>
                    <div className="summary__content">{project.summary}</div>
                </div>
                <div className="tags">
                    <div className="tags__title mb-2 font-semibold text-xl text-gray-800">Tags</div> 
                    <div className="tags_values flex gap-2 flex-wrap">
                        {project.tags.map(tag => <div className="px-2 py-1 bg-gray-800 rounded text-gray-50 text-sm uppercase font-semibold">{tag}</div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
