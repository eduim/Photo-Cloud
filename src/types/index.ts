import { MouseEventHandler, ChangeEvent, FormEvent } from "react";

export type ImageGalleryProps = {
  imagesWithUrl: ImagesWithUrl[];
};

export type ImagesWithUrl = {
  url: string;
  imageId: string;
};

export interface DeleteImageProps {
  handleDeleteImages: MouseEventHandler<HTMLButtonElement>;
  deleteState: DeleteGallery;
}

export type ImageGalleryActionsStates = {
  delete: DeleteGallery;
  upload: UploadGallery;
};

export type DeleteGallery = {
  error: boolean;
  loading: boolean;
};

export type UploadGallery = {
  delete: boolean;
  loading: boolean;
};

export interface UploadImageProps {
  fileListUpload: FileList | null;
  handleSelectImageUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  handleUploadImages: (event: FormEvent) => void;
  uploadState: UploadGallery;
}
