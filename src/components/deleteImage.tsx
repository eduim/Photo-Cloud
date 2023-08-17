interface DeleteImageProps {
  selectedImages: string[];
}

const DeleteImage = ({ selectedImages }: DeleteImageProps) => {
  const handleDelete = async () => {
    if (selectedImages.length === 0) return;
    await fetch("/api/delete", {
      method: "POST",
      body: JSON.stringify(selectedImages),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <button
      className="mt-3 border border-black "
      onClick={() => handleDelete()}
    >
      Delete files {<span>Deleting...</span>}
    </button>
  );
};

export default DeleteImage;
