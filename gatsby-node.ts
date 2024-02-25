import { reveriesBasePath } from "./src/pages/reveries";

const path = require("path");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  createTagPages(graphql, createPage, reporter);
  createGalleryRelatedPages(graphql, createPage, reporter);
};

const createTagPages = async (graphql, createPage, reporter) => {
  const tagTemplate = path.resolve(`./src/pages/blog/tags/index.tsx`);
  const result = await graphql(`
    {
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
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
};

const createGalleryRelatedPages = async (graphql, createPage, reporter) => {
  const galleryTemplate = path.resolve(`./src/pages/reveries/gallery.tsx`);
  const galleryCategoryTemplate = path.resolve(
    `./src/pages/reveries/category.tsx`,
  );

  const result = await graphql(`
    {
      galleries: allGalleriesYaml {
        edges {
          node {
            id
            path
            title
            categories
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
  const galleries = result.data.galleries.edges;

  // Make gallery pages
  let galleryCategories: string[] = [];
  galleries.forEach(({ node }) => {
    node.categories.forEach((category: string) => {
      if (!galleryCategories.includes(category)) {
        galleryCategories.push(category);
      }
    });
    createPage({
      path: `/reveries${node.path}`,
      component: galleryTemplate,
      context: {
        id: node.id,
        title: node.title,
      },
    });
  });

  // Make gallery category pages

  galleryCategories.forEach((category) => {
    createPage({
      path: `/reveries/category/${category}`,
      component: galleryCategoryTemplate,
      context: {
        category,
      },
    });
  });
};
