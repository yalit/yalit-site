import ProjectInformation from "@/model/project.interface"
import Lightbox from "../shared/lightbox"
import ProjectImage from "./projectImage"
import { join } from "path"

type ProjectsListProjectProps = { project: ProjectInformation }
export default function ProjectsListProjec({ project }: ProjectsListProjectProps) {
    const titleClass = "title w-full flex order-1 md:w-1/3 lg:w-1/5 justify-start items-center p-3 bg-gray-800 text-gray-50 font-semibold uppercase rounded-tl rounded-tr md:rounded-tl md:rounded-tr-none lg:rounded-tl md:rounded-bl" + (project.thumbnail && " cursor-pointer")
    const thumbnailClass = "image hidden lg:flex flex-1 order-2 justify-center cursor-pointer"
    const summaryClass = "summary flex flex-col w-full h-full order-2 md:w-2/3 lg:flex-1 lg:order-2 justify-between p-3"
    return (
        <div className="projectlist-project flex flex-wrap justify-between basis-0">
            <div className={titleClass}>{project.title}</div>
            {project.thumbnail &&
                <Lightbox className={thumbnailClass} img={join('projects', project.thumbnail)} />
            }
            <div className={summaryClass}>
                <div className="summary__info mb-3">
                    <div className="summary__title mb-2 font-semibold text-xl text-gray-800 lg:border-gray-800 lg:border-l-4 lg:pl-2">Summary</div>
                    <div className="summary__content">{project.summary}</div>
                </div>
                <div className="tags mb-3">
                    <div className="tags__title mb-2 font-semibold text-xl text-gray-800 lg:border-gray-800 lg:border-l-4 lg:pl-2">Tags</div>
                    <div className="tags_values flex gap-2 flex-wrap mb-3">
                        {project.tags.map(tag => <div className="px-2 py-1 bg-gray-800 rounded text-gray-50 text-xs uppercase font-semibold" key={"tag_" + tag}>{tag}</div>)}
                    </div>
                </div>
                {project.repository && (
                    <div className="repository">
                        <span className="font-semibold text-xl text-gray-800 lg:border-gray-800 lg:border-l-4 lg:pl-2">Repository : </span><span className="font-light italic"><a href={project.repository} target="_blank" className="font-light">{project.repository}</a></span></div>
                )}
            </div>
        </div>
    )
}
