import React, { useEffect, useState } from "react";
import { PageProps, graphql } from "gatsby";
import Layout from "../../components/layout";
import { summary } from "../../styles/shared.module.scss";
import { projectsList } from "../../styles/projects.module.scss";

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
      dataProjects.reduce((acc: string[], project: ProjectData) => {
        return [...acc, ...project.tags];
      }, []),
    ),
  ];
  const [projects, setProjects] = useState<ProjectData[]>(dataProjects);
  const [tags, setTags] = useState<string[]>([]);

  const onClickTag = (tag: string) => {
    //TODO : refine the tag filtering...
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
      setProjects(dataProjects);
    } else {
      setTags([...tags, tag]);
      setProjects(dataProjects.filter((project) => project.tags.includes(tag)));
    }
  };

  useEffect(() => {
    if (tags.length === 0) {
      // reset filter
      setProjects(dataProjects);
    }
  }, [tags]);

  return (
    <Layout>
      <div className={summary}>
        <div className="title">Some projects I've worked on</div>
        <div className="description">
          Below are some of the projects I've worked on. Click on the title to
          read more about them.
        </div>
      </div>

      <p className="font-bold text-lg mb-5">Filter by technology</p>
      <div className="flex gap-2 mb-5">
        <button
          className="bg-gray-300 px-3 py-1 rounded-md"
          onClick={() => setTags([])}
        >
          All
        </button>
        {dataTags.map((tag) => (
          <button
            className="bg-gray-300 px-3 py-1 rounded-md"
            onClick={() => onClickTag(tag)}
          >
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
              <p className="font-bold text-sm">Technologies :</p>
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
