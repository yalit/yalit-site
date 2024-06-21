import React from "react";
import Layout from "../../components/layout";
import { Link, graphql, withPrefix } from "gatsby";
import { GatsbyImage, IGatsbyImageData, getImage } from "gatsby-plugin-image";

import "../../styles/blog.scss";
import { MDXProvider } from "@mdx-js/react";
import { CodeBlock } from "../../components/blog/CodeBlock";

const mdxComponents = {
  pre: (props) => <CodeBlock {...props} />,
  wrapper: ({ children }) => <>{children}</>,
};

type BlogPostDetails = {
  id: string;
  title: string;
  date: string;
  tags: string[];
  body: string;
  excerpt: string;
  img_hero: IGatsbyImageData;
  img_hero_alt: string;
  img_hero_credit: string;
};

export default function BlogPost({ data, children }) {
  const blog: BlogPostDetails = {
    id: data.mdx.id,
    html: data.mdx.internal.content,
    ...data.mdx.frontmatter,
    img_hero: getImage(data.mdx.frontmatter.img_hero),
  };

  return (
    <Layout>
      <div className="img-hero">
        <GatsbyImage image={blog.img_hero} alt={blog.img_hero_alt} />
        <p className="img-credit">Crédit: {blog.img_hero_credit}</p>
      </div>
      <div className="post-container">
        <div className="date">
          <span className="h-4 w-0.5 rounded-full bg-zinc-200"></span>
          <div className="ml-3">{blog.date}</div>
        </div>
        {blog.tags && blog.tags.length > 0 && (
          <div className="tags">
            <span className="h-4 w-0.5 mr-2 rounded-full bg-zinc-200"></span>
            {blog.tags.map((tag, index) => (
              <Link to={"/blog/tags/" + tag} key={"Link-Tag" + index}>
                <span key={index} className="tag">
                  {tag}
                </span>
              </Link>
            ))}
          </div>
        )}
        <div className="title">{blog.title}</div>
        <MDXProvider components={mdxComponents}>{children}</MDXProvider>
      </div>
    </Layout>
  );
}

export const Head: React.FC = ({pageContext}) => (
  <title>Yalit - Blog - {pageContext.title}</title>
);

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      body
      id
      internal {
        content
      }
      frontmatter {
        date(formatString: "D-MMM-YYYY")
        slug
        tags
        title
        img_hero {
          childImageSharp {
            gatsbyImageData(width: 1280, placeholder: BLURRED)
          }
        }
        img_hero_alt
        img_hero_credit
      }
    }
  }
`;
