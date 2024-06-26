import React, { useEffect, useMemo, useState } from "react";
import { PageProps, graphql } from "gatsby";
import Layout from "../../components/layout";
import classnames from "../../helpers/classnames";
import "../../styles/shared.scss";
import "../../styles/projects.scss";
import Project from "../../types/project.interface";
import ProjectList from "../../components/projects/ProjectList";
import { getImage } from "gatsby-plugin-image";

export default function Projects({ data }: PageProps<ProjectsPageQuery>) {
    const dataProjects: Project[] = data.allFile.nodes.map(
        (node: any): Project[] => {
            return {
                id: node.childMarkdownRemark.id,
                ...node.childMarkdownRemark.frontmatter,
                date: new Date(node.childMarkdownRemark.frontmatter.date),
                thumbnail: getImage(node.childMarkdownRemark.frontmatter.thumbnail),
            };
        },
    );
    const dataTags: string[] = [
        ...new Set(
            dataProjects
                .reduce((acc: string[], project: Project) => {
                    return [...acc, ...project.tags];
                }, [])
                .sort(),
        ),
    ];
    const [projects, setProjects] = useState<Project[]>(dataProjects);
    const [tags, setTags] = useState<string[]>([]);

    const onClickTag = (tag: string) => {
        if (tags.includes(tag)) {
            setTags(tags.filter((t) => t !== tag));
        } else {
            setTags([...tags, tag]);
        }
    };

    useEffect(() => {
        if (tags.length === 0) {
            // reset filter
            setProjects(dataProjects);
        } else {
            const newProjects = dataProjects.filter((project) => {
                return tags.every((tag) => project.tags.includes(tag));
            });
            setProjects(newProjects);
        }
    }, [tags]);

    const tagClassName = (tag: string, additionalCSS: string = "") => {
        const isTagSelected =
            tags.includes(tag) || (tag === "" && tags.length === 0);
        return classnames(
            "px-3 py-1 rounded-md",
            isTagSelected ? "bg-blue-200" : "bg-gray-300",
            additionalCSS,
        );
    };

    return (
        <Layout>
            <div className="px-8">
                <div className="summary">
                    <div className="title">Crafting</div>
                    <div className="description ml-10">
                        Below are some of the projects I've crafted. 
                    </div>
                </div>

                <div className="flex items-center gap-2 my-12 flex-wrap">
                    <p className="font-bold text-lg">Filter by technology </p>
                    <button className={tagClassName("")} onClick={() => setTags([])}>
                        All
                    </button>
                    {dataTags.map((tag) => (
                        <button
                            className={tagClassName(tag)}
                            onClick={() => onClickTag(tag)}
                            key={"dataTag-"+tag}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
                <ProjectList projects={projects} />
            </div>
        </Layout>
    );
}

export const Head: React.FC = () => (
  <title>Yalit - Projects</title>
);

export const query = graphql`
query ProjectsPage {
    allFile(
        filter: { sourceInstanceName: { eq: "project" }, extension: { eq: "md"}}
        sort: { childMarkdownRemark: { frontmatter: { date: DESC } } }
    ) {
        nodes {
            childMarkdownRemark {
                id
                frontmatter {
                    slug
                    title
                    summary
                    tags
                    repository
                    date
                    thumbnail {
                        childImageSharp {
                            gatsbyImageData(width: 1280, placeholder: BLURRED)
                        }
                    }
                }
            }
        }
    }
}
`;
