import { DeleteImageProps } from "@/types";
import { Button } from "@/components/ui/button";

const DeleteImage = ({ handleDeleteImages, deleteState }: DeleteImageProps) => {
  const deleteText = deleteState.loading ? "Deleting..." : "Delete images";
  return <Button onClick={handleDeleteImages}>{deleteText}</Button>;
};

export default DeleteImage;
