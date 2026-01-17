import React, { useState } from 'react';
import { LuCloudUpload } from 'react-icons/lu';

const ImageUpload = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };
  const handleRemove = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="grid grid-cols-1 mb-5">
      <h6 className="mb-2 font-semibold text-sm text-default-800">Product Images</h6>

      <label
        htmlFor="fileUpload"
        className="flex flex-col items-center justify-center bg-transparent border border-dashed rounded-md cursor-pointer border-default-300 p-6 hover:bg-default-100 transition"
      >
        <LuCloudUpload className="size-12 text-default-500 mb-2" />
        <h5 className="mb-0 font-normal text-base text-default-500">
          Drag and drop your files or <span className="text-primary underline">browse</span>
        </h5>
        <input
          id="fileUpload"
          type="file"
          className="hidden"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>

      <ul className="flex flex-wrap gap-5 mt-5">
        {files.map((file, index) => (
          <li key={index} className="border rounded border-default-200 p-3 w-32 text-center">
            <div className="p-2 mx-auto rounded-md size-20 bg-default-200 flex items-center justify-center overflow-hidden">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="pt-2">
              <h5 className="text-xs truncate">{file.name}</h5>
              <p className="text-xs text-default-500">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
            <button
              onClick={() => handleRemove(index)}
              className="mt-2 px-2 py-1 text-xs text-white bg-danger rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageUpload;
