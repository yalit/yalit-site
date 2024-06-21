import { withPrefix } from "gatsby";

const path = require("path");

global.__PATH_PREFIX__ = "";
//add this line
global.__BASE_PATH__ = "";

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  createMdxBlogPage(graphql, createPage, reporter);
  createTagPages(graphql, createPage, reporter);
  createGalleryRelatedPages(graphql, createPage, reporter);
};

const createMdxBlogPage = async (graphql, createPage, reporter) => {
  const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
            title
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("Error loading MDX result", result.errors);
  }

  // Create blog post pages.
  const posts = result.data.allMdx.nodes;
  const postTemplate = path.resolve(`./src/pages/blog/blogPage.tsx`);

  posts.forEach((node) => {
    createPage({
      path: withPrefix(`/blog/${node.frontmatter.slug}`),
      // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: { id: node.id, title: node.frontmatter.title },
    });
  });
};

const createTagPages = async (graphql, createPage, reporter) => {
  const tagTemplate = path.resolve(`./src/pages/blog/tags/index.tsx`);
  const result = await graphql(`
    {
      tagsGroup: allMdx(limit: 2000) {
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
      path: withPrefix(`/blog/tags/${tag.fieldValue}/`),
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
      path: withPrefix(`/reveries${node.path}`),
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
