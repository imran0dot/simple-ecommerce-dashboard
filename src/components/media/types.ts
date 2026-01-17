import { type FileRejection } from "react-dropzone";

/**
 * Extended File type with preview URL and formatted size
 */
export type UploadedFile = File & {
    /** Temporary preview URL for displaying file thumbnails */
    preview: string;
    /** Human-readable size (KB, MB, etc.) */
    formattedSize: string;
};

export type FileUploadProps = {
    /**
     * Label text displayed above the upload field
     */
    label: string;

    /**
     * Allowed file types (MIME types).
       *   * 
     * Example for **images (jpg, jpeg, png)**:
     * ```ts
     * accept={{ "image/*": [] }}
     * ```
     * 
     * Example for **documents**:
     * ```ts
     * accept={{
     *   "application/pdf": [],
     *   "application/msword": [],
     *   "application/vnd.openxmlformats-officedocument.wordprocessingml.document": []
     * }}
     * ```
     * 
     * Example for **media files**:
     * ```ts
     * accept={{
     *   "audio/*": [],
     *   "video/*": []
     * }}
     * ```
     * 
     * Example for **images + PDF**:
     * ```ts
     * accept={{
     *   "image/*": [],
     *   "application/pdf": []
     * }}
     * ```
     *
     * Example for **images (only PNG, JPG, JPEG)**:
     * ```ts
     * accept={{
     *   "image/png": [".png"],
     *   "image/jpeg": [".jpg", ".jpeg"]
     * }}
     * ```
     *
     * Example for **documents (PDF, DOC, DOCX)**:
     * ```ts
     * accept={{
     *   "application/pdf": [".pdf"],
     *   "application/msword": [".doc"],
     *   "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"]
     * }}
     * ```
     *
     * Example for **media (MP4 video, MP3 audio)**:
     * ```ts
     * accept={{
     *   "video/mp4": [".mp4"],
     *   "audio/mpeg": [".mp3"]
     * }}
     * ```
     *
     * Example for **multiple types (PNG + PDF only)**:
     * ```ts
     * accept={{
     *   "image/png": [".png"],
     *   "application/pdf": [".pdf"]
     * }}
     * ```
     */
    accept: Record<string, string[]>;
    
    /** Optionally reject certain MIME types */
    rejectedTypes?: string[];

    /**
     * Allow multiple file selection.
     * @default false
     */
    multiple?: boolean;

    /**
     * Currently selected files.
     */
    selectedFiles: UploadedFile[];

    /**
     * Callback fired when new files are selected via drag & drop or click.
     * Use this to transform files into `UploadedFile` with preview + size.
     */
    onFilesSelected: (files: File[]) => void;

    /**
     * Callback fired when a user clicks delete/remove on a file.
     * Useful for cleaning up state or revoking object URLs.
     */
    onFileRemove?: (file: UploadedFile) => void;

    /** Optional callback for rejected files */
    onFilesRejected?: (files: FileRejection[]) => void;
};
