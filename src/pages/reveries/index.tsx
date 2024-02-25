import React from "react";
import Layout from "../../components/layout";
import { Link, graphql } from "gatsby";
import { GatsbyImage, IGatsbyImageData, getImage } from "gatsby-plugin-image";
import "../../styles/galleries.scss";

interface PhotoGallery {
  id: string;
  title: string;
  subtitle: string;
  path: string;
  frontphoto: IGatsbyImageData;
}

export const reveriesBasePath = "/reveries";

export default function Photos({ data }) {
  const galleries: PhotoGallery[] = data.allGalleriesYaml.edges.map(
    ({ node }) => {
      return {
        id: node.id,
        title: node.title,
        subtitle: node.subtitle,
        path: node.path,
        frontphoto: getImage(node.frontphoto),
      };
    },
  );

  return (
    <Layout>
      <div className="page-title">Rêveries</div>
      <div className="galleries">
        {galleries.map((gallery: PhotoGallery) => (
          <Link to={reveriesBasePath + gallery.path}>
            <div key={gallery.id} className="gallery">
              <GatsbyImage image={getImage(gallery.frontphoto)} alt={""} />
              <div className="overlay">
                <div className="title">{gallery.title}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export const Head: React.FC = () => <title>Rêveries</title>;

export const query = graphql`
  query PhotoGalleryPage {
    allGalleriesYaml {
      edges {
        node {
          id
          title
          subtitle
          path
          frontphoto {
            childImageSharp {
              gatsbyImageData(width: 1280, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`;
