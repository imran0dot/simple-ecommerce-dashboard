// ImageUpload.tsx
import React from "react";
import FileUpload from "./FileUpload";
import type { UploadedFile } from "./types";

/**
 * Component for uploading images only
 * Supports: png, jpg, jpeg, gif
 */
type Props = {
    label: string;
    selectedFiles: UploadedFile[];
    multiple?: boolean;
    onFilesSelected: (files: File[]) => void;
    onFileRemove?: (file: UploadedFile) => void;
    /** Rejected file types to block */
    rejectedTypes?: string[];
};


/**
 * ImageUpload Component
 * Allows only image files (png, jpg, jpeg)
 * Rejected types can be passed dynamically from parent
 */
const ImageUpload: React.FC<Props> = ({
    rejectedTypes = [],
    ...props
}) => {
    return (
        <FileUpload
            {...props}
            accept={{
                "image/png": [],
                "image/jpg": [],
                "image/jpeg": [],
            }}
            rejectedTypes={rejectedTypes}
        />
    );
};

export default ImageUpload;
