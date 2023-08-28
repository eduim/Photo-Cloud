import { DeleteImageProps } from "@/types";
import { Button } from "@/components/ui/button";

const DeleteImage = ({ handleDeleteImages, deleteState }: DeleteImageProps) => {
  return (
    <Button onClick={handleDeleteImages}>
      Delete files {deleteState.loading && <span>Deleting...</span>}
    </Button>
  );
};

export default DeleteImage;
