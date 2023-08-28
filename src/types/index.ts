import { MouseEventHandler, ChangeEvent, FormEvent } from "react";

export type ImageGalleryProps = {
  imagesWithUrl: ImagesWithUrl[];
};

export type ImagesWithUrl = {
  url: string;
  imageId: string;
};

export type ImageGalleryActionsStates = {
  delete: DeleteGallery;
  upload: UploadGallery;
  download: DownloadGallery;
};

export type DeleteGallery = {
  error: boolean;
  loading: boolean;
};

export type UploadGallery = {
  error: boolean;
  loading: boolean;
};

export type DownloadGallery = {
  error: boolean;
  loading: boolean;
};

export interface UploadImageProps {
  fileListUpload: FileList | null;
  handleSelectImageUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  handleUploadImages: (event: FormEvent) => void;
  uploadState: UploadGallery;
}
export interface DeleteImageProps {
  handleDeleteImages: MouseEventHandler<HTMLButtonElement>;
  deleteState: DeleteGallery;
}

export interface DownloadImageProps {
  handleDownloadImages: MouseEventHandler<HTMLButtonElement>;
  downloadState: DownloadGallery;
}
