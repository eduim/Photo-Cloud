import { DeleteImageProps } from "@/types";

const DeleteImage = ({ handleDeleteImages, deleteState }: DeleteImageProps) => {
  return (
    <button className="mt-3 border border-black " onClick={handleDeleteImages}>
      Delete files {deleteState.loading && <span>Deleting...</span>}
    </button>
  );
};

export default DeleteImage;
