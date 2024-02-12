import React, { useEffect, useState } from "react";
import { PageProps, graphql } from "gatsby";
import Layout from "../../components/layout";
import { summary } from "../../styles/shared.module.scss";
import { projectsList } from "../../styles/projects.module.scss";
import classnames from "../../helpers/classnames";

type ProjectData = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  tags: string[];
  repository: string;
};

export default function Projects({ data }: PageProps<ProjectsPageQuery>) {
  const dataProjects: ProjectData[] = data.allFile.nodes.map(
    (node: any): ProjectData[] => {
      return {
        id: node.childMarkdownRemark.id,
        ...node.childMarkdownRemark.frontmatter,
      };
    },
  );
  const dataTags: string[] = [
    ...new Set(
      dataProjects
        .reduce((acc: string[], project: ProjectData) => {
          return [...acc, ...project.tags];
        }, [])
        .sort(),
    ),
  ];
  const [projects, setProjects] = useState<ProjectData[]>(dataProjects);
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

  const tagClassName = (tag: string, additionalCSS: string) => {
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
      <div className={summary}>
        <div className="title">Some projects I've worked on</div>
        <div className="description">
          Below are some of the projects I've worked on. Click on the title to
          read more about them.
        </div>
      </div>

      <div className="flex items-center gap-2 my-12 flex-wrap">
        <p className="font-bold text-lg">Filter by technology </p>
        <button className={tagClassName("")} onClick={() => setTags([])}>
          All
        </button>
        {dataTags.map((tag) => (
          <button className={tagClassName(tag)} onClick={() => onClickTag(tag)}>
            {tag}
          </button>
        ))}
      </div>
      <div className={projectsList}>
        {projects.map((project: ProjectData) => (
          <div key={project.id}>
            <h3 className="font-bold text-lg mb-5">{project.title}</h3>
            <p className="leading-relaxed mb-5">{project.summary}</p>
            <p className="flex gap-2 items-center">
              <p className="font-bold text-sm whitespace-nowrap">
                Technologies :
              </p>
              {project.tags?.map((tag) => (
                <p className="text-sm underline">{tag}</p>
              ))}
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export const query = graphql`
  query ProjectsPage {
    allFile(
      filter: { sourceInstanceName: { eq: "project" } }
      sort: { childMarkdownRemark: { frontmatter: { date: DESC } } }
    ) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            slug
            title
            summary
            tags
            repository
          }
          id
        }
      }
    }
  }
`;
