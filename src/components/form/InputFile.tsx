import React, { useRef, useState, useEffect, useCallback } from "react";
import { Paperclip, FileText, Trash } from "lucide-react";
import Button from "../Button";

interface FileImporterProps {
  onFilesSelected: (files: File | File[]) => void;
  acceptedFileTypes?: string;
  multiple?: boolean;
  disabled?: boolean;
  handleRemoveFile?: () => void;
  acceptFile?: File | File[];
  placeholder?: string;
}

const InputFile: React.FC<FileImporterProps> = ({
  onFilesSelected,
  acceptedFileTypes = "*",
  multiple = false,
  disabled = false,
  handleRemoveFile,
  acceptFile,
  placeholder,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  console.log(isDragActive);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    if (acceptFile) {
      const files = Array.isArray(acceptFile) ? acceptFile : [acceptFile];
      setSelectedFiles(files);
    }
  }, [acceptFile]);

  const handleFiles = useCallback(
    (files: FileList) => {
      const fileArray = Array.from(files);
      setSelectedFiles(fileArray);
      onFilesSelected(multiple ? fileArray : fileArray[0]);
    },
    [onFilesSelected, multiple]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
      if (disabled) return;
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles, disabled]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
    e.target.value = "";
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const items = e.clipboardData?.items;
    if (!items) return;

    const files: File[] = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === "file") {
        const file = item.getAsFile();
        if (file) files.push(file);
      }
    }

    if (files.length > 0) {
      setSelectedFiles(files);
      onFilesSelected(multiple ? files : files[0]);
    }
  };

  return (
    <div className="w-full space-y-4">
      {selectedFiles.length > 0 ? (
        <div className="mt-3 space-y-2 text-sm text-gray-700">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-md p-2 bg-gray-50 dark:bg-zink-700 dark:text-slate-50"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <span className="font-medium truncate max-w-[160px]">
                  {file.name}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                {(file.size / 1024).toFixed(1)} KB • {file.type || "Unknown"}
              </div>
              <Button label="" variant="primary" onClick={handleRemoveFile}>
                <Trash className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`flex gap-2 items-center px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-zink-500  text-sm duration-300`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          onPaste={handlePaste}
          role="button"
          tabIndex={disabled ? -1 : 0}
        >
          <Paperclip className="w-4 h-4 text-gray-400" />
          <span className="text-xs">{placeholder}</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={acceptedFileTypes}
        multiple={multiple}
        onChange={handleFileChange}
        disabled={disabled}
      />
    </div>
  );
};

export default InputFile;
