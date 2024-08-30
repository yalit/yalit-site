import { GalleryPhoto } from "@/model/gallery.interface";

export default function splitPhotoListInColumns(
    photos: GalleryPhoto[],
    nbColumns: number,
    baseColumnWidth: number
): GalleryPhoto[][] {
    if (nbColumns === 1 || !baseColumnWidth) {
        return [photos]
    }

    let photosColums: GalleryPhoto[][] = []
    let columnsHeight: number[] = []
    for (let i = 0; i < nbColumns; i++) { photosColums.push([]) }

    const getNextColumnToFill = (columnIdx: number) => {
        const columnToTheRight = (columnIdx + 1) % nbColumns;
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
        photosColums[currentColumn].push(photo);
        columnsHeight[currentColumn] += getViewPortImageHeight(
            photo.height,
            photo.width,
        );
        currentColumn = getNextColumnToFill(currentColumn);
    })


    return photosColums
}
