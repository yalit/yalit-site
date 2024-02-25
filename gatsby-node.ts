import { reveriesBasePath } from "./src/pages/reveries";

const path = require("path");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const tagTemplate = path.resolve(`./src/pages/blog/tags/index.tsx`);
  const galleryTemplate = path.resolve(
    `./src/pages${reveriesBasePath}/gallery.tsx`,
  );

  const result = await graphql(`
    {
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
        }
      }
      galleries: allGalleriesYaml {
        edges {
          node {
            id
            path
          }
        }
      }
    }
  `);

  // handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Extract tag data from query
  const tags = result.data.tagsGroup.group;
  const galleries = result.data.galleries.edges;

  // Make tag pages
  tags.forEach((tag) => {
    createPage({
      path: `/blog/tags/${tag.fieldValue}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });
  });

  // Make gallery pages
  galleries.forEach(({ node }) => {
    createPage({
      path: `${reveriesBasePath}${node.path}`,
      component: galleryTemplate,
      context: {
        id: node.id,
      },
    });
  });
};
