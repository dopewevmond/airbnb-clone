import Gallery from "react-photo-gallery";
import { IPhoto } from "../interfaces";

interface NestedPhoto {
  gridPhotos: {
    id: number; photo: IPhoto
  }[]
}

export const PhotoGrid = ({gridPhotos}: NestedPhoto) => {
  return (
    <Gallery
      direction="column"
      columns={2}
      photos={gridPhotos.map((photo, idx) => {
        if (idx === 0) {
          return { src: photo.photo.photo_uri, width: 1, height: 2 };
        }
        return { src: photo.photo.photo_uri, width: 1, height: 1 };
      })}
    />
  );
};
