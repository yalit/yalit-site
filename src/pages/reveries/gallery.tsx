import { Link, graphql } from "gatsby";
import { GatsbyImage, IGatsbyImageData, getImage } from "gatsby-plugin-image";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/layout";
import "../../styles/galleries.scss";
import { WindowSize, getWindowSize } from "../../helpers/window";

interface GalleryPhoto {
  id: string;
  subtitle: string;
  data: IGatsbyImageData;
}

interface Gallery {
  id: string;
  categories: string[];
  idea: string;
  location: string;
  subtitle: string;
  tags: string[];
  title: string;
  year: number;
  photos: GalleryPhoto[];
}

export default function Gallery({ pageContext, data }) {
  const [windowSize, setWindowSize] = useState<WindowSize>(getWindowSize());
  const [photos, setPhotos] = useState<GalleryPhoto[][]>([]);
  const [columnWidth, setColumnWidth] = useState<number>();
  const [shownPhoto, setShownPhoto] = useState<GalleryPhoto>(null);

  const photoColumnRef = (node: HTMLDivElement) => {
    if (node !== null) {
      setColumnWidth(node.getBoundingClientRect().width);
    }
  };

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const gallery: Gallery = {
    ...data.galleriesYaml,
    photos: data.galleriesYaml.photos.map((photo) => {
      return {
        ...photo,
        id: photo.path.id,
        data: getImage(photo.path.childImageSharp.gatsbyImageData),
      };
    }),
  };

  useEffect(() => {
    if (windowSize.width >= 768 && windowSize.width < 1280) {
      if (photos.length === 2) {
        return;
      }
      setPhotos(splitPhotosInColumns(gallery.photos, 2, columnWidth)); //if window size is less than 1280px, show photos in two columns
    } else if (windowSize.width >= 1280) {
      if (photos.length === 3) {
        return;
      }
      setPhotos(splitPhotosInColumns(gallery.photos, 3, columnWidth)); //if window size is less than 1280px, show photos in two columns
    } else {
      if (photos.length === 1) {
        return;
      }
      setPhotos(splitPhotosInColumns(gallery.photos, 1, columnWidth)); //if window size is less than 1280px, show photos in two columns
    }
  }, [windowSize, columnWidth]);

  useEffect(() => {
    if (shownPhoto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [shownPhoto]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setShownPhoto(null);
      }
      if (event.key === "ArrowRight" && shownPhoto !== null) {
        const currentPhotoIndex = gallery.photos.findIndex(
          (photo) => photo.id === shownPhoto.id,
        );
        console.log(currentPhotoIndex);
        if (currentPhotoIndex < gallery.photos.length - 1) {
          setShownPhoto(gallery.photos[currentPhotoIndex + 1]);
        }
      }
      if (event.key === "ArrowLeft" && shownPhoto !== null) {
        const currentPhotoIndex = gallery.photos.findIndex(
          (photo) => photo.id === shownPhoto.id,
        );
        if (currentPhotoIndex > 0) {
          setShownPhoto(gallery.photos[currentPhotoIndex - 1]);
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [shownPhoto]);

  return (
    <Layout>
      <div className="gallery-page">
        <div className="gallery-title">
          <div className="title">{gallery.title}</div>
          {gallery.subtitle && (
            <div className="subtitle">{gallery.subtitle}</div>
          )}
        </div>
        <div className="gallery-info">
          <div className="infos idea">
            <div className="info-title">Idea</div>
            <div className="info-content">{gallery.idea}</div>
          </div>
          <div className="infos categories">
            <div className="info-title">Categories</div>
            <div className="info-content">
              {gallery.categories.map((category) => (
                <div>
                  <Link to={"/reveries/category/" + category}>{category}</Link>
                </div>
              ))}
            </div>
          </div>
          <div className="infos tags">
            <div className="info-title">Tags</div>
            <div className="info-content">
              {gallery.tags.map((tag) => (
                <div>#{tag}</div>
              ))}
            </div>
          </div>
          {gallery.location && (
            <div className="infos location">
              <div className="info-title">Time & Place</div>
              <div className="info-content">
                {gallery.year && String(gallery.year) + " - "}
                {gallery.location}
              </div>
            </div>
          )}
        </div>
        <div className="gallery-photos">
          {photos.map((photoColumn, index) => (
            <div
              className="photos-column"
              ref={index === 0 ? photoColumnRef : null}
            >
              {photoColumn.map((photo) => (
                <div className="photo" onClick={() => setShownPhoto(photo)}>
                  <GatsbyImage image={photo.data} alt={photo.subtitle} />
                  <div className="photo-info">{photo.subtitle}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        {shownPhoto && (
          <div
            className="photo-modal"
            style={{
              top: window.scrollY,
              left: 0,
              right: 0,
              height: window.innerHeight,
            }}
          >
            <div className="close" onClick={() => setShownPhoto(null)}>
              X
            </div>
            <GatsbyImage
              image={shownPhoto.data}
              alt={shownPhoto.subtitle}
              objectFit="contain"
            />
          </div>
        )}
      </div>
    </Layout>
  );
}

export const Head: React.FC = ({ pageContext }) => (
  <title>Rêveries - {pageContext.title}</title>
);

export const query = graphql`
  query ($id: String) {
    galleriesYaml(id: { eq: $id }) {
      categories
      idea
      location
      subtitle
      tags
      title
      year
      photos {
        subtitle
        path {
          id
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
      }
    }
  }
`;

const splitPhotosInColumns = (
  photos: GalleryPhoto[],
  columnCount: number,
  baseColumnWidth: number,
) => {
  if (columnCount === 1 || !baseColumnWidth) {
    return [photos];
  }

  let photoColumns: GalleryPhoto[][] = [];
  let columnsHeight: number[] = [];
  for (let i = 0; i < columnCount; i++) {
    photoColumns.push([]);
    columnsHeight.push(0);
  }

  const getNextColumnToFill = (columnIdx: number) => {
    const columnToTheRight = (columnIdx + 1) % columnCount;
    if (columnsHeight[columnIdx] <= columnsHeight[columnToTheRight]) {
      return columnIdx;
    } else {
      return columnToTheRight;
    }
  };

  const getViewPortImageHeight = (imgHeight: number, imgWidth: number) => {
    return (baseColumnWidth / imgWidth) * imgHeight;
  };

  let currentColumn = 0;
  photos.forEach((photo: GalleryPhoto) => {
    photoColumns[currentColumn].push(photo);
    columnsHeight[currentColumn] += getViewPortImageHeight(
      photo.data.height,
      photo.data.width,
    );
    currentColumn = getNextColumnToFill(currentColumn);
  });

  return photoColumns;
};
