import React from "react";
import Project from "../../types/project.interface";
import { GatsbyImage } from "gatsby-plugin-image";
import Lightbox from "../shared/Lightbox";

export default function ProjectListProject({project}: {project: Project}) {
    return (
        <div className="projectlist-project flex flex-wrap justify-between basis-0">
            <Lightbox 
                className="title cursor-pointer w-full flex order-1 md:w-1/3 lg:w-1/5 justify-start items-center p-3 bg-gray-800 text-gray-50 font-semibold uppercase rounded-tl rounded-tr md:rounded-tl md:rounded-tr-none lg:rounded-tl md:rounded-bl"
                content={<GatsbyImage image={project.thumbnail} alt={project.title} className="w-full rounded-b lg:rounded-none"/>}
            >
                    {project.title}
            </Lightbox>
            <Lightbox className="image hidden lg:flex flex-1 order-2 justify-center cursor-pointer">
                <GatsbyImage image={project.thumbnail} alt={project.title} className="w-full rounded-b lg:rounded-none object-cover"/>
            </Lightbox>
            <div className="summary flex flex-col w-full h-full order-2 md:w-2/3 lg:w-1/3 lg:order-3 justify-between p-3">
                <div className="summary__info mb-3">
                    <div className="summary__title mb-2 font-semibold text-xl text-gray-800 lg:border-gray-800 lg:border-l-4 lg:pl-2">Summary</div>
                    <div className="summary__content">{project.summary}</div>
                </div>
                <div className="tags">
                    <div className="tags__title mb-2 font-semibold text-xl text-gray-800 lg:border-gray-800 lg:border-l-4 lg:pl-2">Tags</div> 
                    <div className="tags_values flex gap-2 flex-wrap">
                        {project.tags.map(tag => <div className="px-2 py-1 bg-gray-800 rounded text-gray-50 text-xs uppercase font-semibold" key={"tag_"+tag}>{tag}</div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
