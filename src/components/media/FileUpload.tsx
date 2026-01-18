import React from "react";
import Dropzone, { type FileRejection } from "react-dropzone";
import { Trash2, UploadCloud } from "lucide-react";
import type { FileUploadProps } from "./types";


/**
 * FileUpload component.
 *
 * - Supports drag & drop or manual file selection.
 * - Supports previewing images, displaying file info, and deleting files.
 * - Can be configured to accept only specific file types (images, docs, media, etc.).
 *
 * @example
 * ```tsx
 * // Image upload (PNG, JPG only)
 * <FileUpload
 *   label="Upload Image"
 *   accept={{ "image/png": [], "image/jpeg": [] }}
 *   multiple={false}
 *   selectedFiles={files}
 *   onFilesSelected={handleFiles}
 *   onFileRemove={handleRemove}
 * />
 *
 * // Document upload (PDF, DOCX only)
 * <FileUpload
 *   label="Upload Document"
 *   accept={{
 *     "application/pdf": [],
 *     "application/vnd.openxmlformats-officedocument.wordprocessingml.document": []
 *   }}
 *   multiple
 *   selectedFiles={docs}
 *   onFilesSelected={handleDocs}
 *   onFileRemove={handleRemove}
 * />
 *
 * // Video upload (MP4 only)
 * <FileUpload
 *   label="Upload Video"
 *   accept={{ "video/mp4": [] }}
 *   multiple={false}
 *   selectedFiles={videos}
 *   onFilesSelected={handleVideos}
 *   onFileRemove={handleRemove}
 * />
 * ```
 */
const FileUpload: React.FC<FileUploadProps> = ({
  label,
  accept,
  multiple = false,
  selectedFiles,
  rejectedTypes = [],
  onFilesSelected,
  onFileRemove,
  onFilesRejected,
}) => {
  // Should show dropzone or not
  const showDropzone = multiple || selectedFiles.length === 0;

  /** Filter out rejected files based on `rejectedTypes` */
  const handleRejectedFiles = (rejectedFiles: FileRejection[]) => {
    const filtered = rejectedFiles.filter(
      (file) => !rejectedTypes.includes(file.file.type)
    );

    if (filtered.length > 0 && onFilesRejected) {
      onFilesRejected(filtered);
    }
  };


  return (
    <div className="w-full">
      <label className="block mb-2">{label}</label>

      <div className="flex flex-col gap-3 p-3 border rounded-md bg-slate-50 dark:bg-zink-700 border-slate-200 dark:border-zink-500">
        {selectedFiles?.length > 0 ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          selectedFiles.map((file: any, idx:number) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-2 rounded-md bg-slate-100 dark:bg-zink-600"
            >
              {/* Preview */}
              <div className="w-20 h-16 flex items-center justify-center rounded bg-slate-200 dark:bg-zink-500 overflow-hidden">
                {file.type.startsWith("image/") ? (
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-slate-600 dark:text-zink-100">
                    {file.type.split("/")[1]?.toUpperCase() || "FILE"}
                  </span>
                )}
              </div>

              {/* File Info */}
              <div className="flex-1">
                <h5 className="text-sm font-medium truncate">{file.name}</h5>
                <p className="text-xs text-slate-500 dark:text-zink-200">
                  {file.formattedSize}
                </p>
              </div>

              {/* Delete Action */}
              {onFileRemove && (
                <button
                  type="button"
                  onClick={() => onFileRemove(file)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-xs text-slate-500 dark:text-zink-300">
            No file selected (jpg, png etc.)
          </p>
        )}

        {/* Dropzone */}
        {showDropzone && (
          <Dropzone
            onDrop={(acceptedFiles: File[]) => onFilesSelected(acceptedFiles)}
            onDropRejected={handleRejectedFiles}
            accept={accept}
            multiple={multiple}
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                className={`px-3 py-2 rounded-md text-sm cursor-pointer border text-center transition 
                ${isDragActive
                  ? "bg-slate-200 dark:bg-zink-500 border-custom-500"
                  : "bg-white dark:bg-zink-700 border-slate-200 dark:border-zink-500"
                  }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center gap-1 text-custom-500">
                  <UploadCloud className="size-6" />
                  <span>{selectedFiles.length > 0 ? "Add More" : "Upload"}</span>
                </div>
              </div>
            )}
          </Dropzone>
        )}
        
      </div>
    </div>
  );
};

export default FileUpload;

