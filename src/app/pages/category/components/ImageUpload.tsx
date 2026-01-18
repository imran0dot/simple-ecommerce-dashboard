
import React, { useState } from "react";
import UploadImage from "../../../../components/media/ImageUpload"
import { FileFormatter } from "@/utils/FileFormatter";
import Button from "@/components/Button";

interface CustomFile extends File {
  preview: string;
  formattedSize: string;
}

const ImageUpload = () => {
  const [categoryImages, setCategoryImages] = useState<CustomFile[]>([]);

  const handleThumbnail = (files: File[]) => {
    if (!files?.length) return;

    const newFormattedFiles: CustomFile[] = files.map((file) => 
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: FileFormatter.formatBytes(file.size),
      })
    );

    setCategoryImages((prevImages) => [...prevImages, ...newFormattedFiles]);
  };

  const handleRemove = (fileToRemove: CustomFile) => {
    setCategoryImages((prevImages) => 
      prevImages.filter((file) => file !== fileToRemove)
    );
  };


  return (
    <React.Fragment>

      {/* Product Upload Form */}
      <div className="bg-white p-0 rounded dark:bg-zink-700">
        <h5 className="text-15 mb-2">Category Image</h5>
        <div className="flex flex-col lg:flex-row gap-4 mb-4">

          <UploadImage
            label="Upload Product Thumbnail"
            multiple={true}
            selectedFiles={categoryImages}
            onFilesSelected={handleThumbnail}
            onFileRemove={handleRemove}
          />
        </div>
        <Button label="Upload" onClick={()=> console.log(categoryImages)}></Button>
      </div>
    </React.Fragment>
  );
};

export default ImageUpload;
