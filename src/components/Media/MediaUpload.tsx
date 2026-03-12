/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateMediaMutation } from '@/redux/services/media';
import React, { useState, type DragEvent } from 'react';
import { LuCheck, LuCloudUpload, LuLoader, LuX } from 'react-icons/lu';

interface MediaUploadProps {
  setActiveTab: React.Dispatch<React.SetStateAction<'upload' | 'list' | 'select'>>;
  redirectTo?: "list" | "select";
}

const MediaUpload: React.FC<MediaUploadProps> = ({ setActiveTab, redirectTo = "list" }) => {
  const [saving, setSaving] = useState(false);
  const [isDragging, setIsDragging] = useState(false); // Drag state track korar jonno
  const [previews, setPreviews] = useState<{ url: string; file: File }[]>([]);
  const [createMedia] = useCreateMediaMutation();

  // --- Helper to process files ---
  const processFiles = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    const newItems = fileArray.map(file => ({
      url: URL.createObjectURL(file),
      file: file,
    }));
    setPreviews(prev => [...prev, ...newItems]);
  };

  // --- Logic Handlers ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
  };

  // Drag and Drop Handlers
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    setPreviews(prev => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].url);
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleSubmitMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (previews.length === 0) return;

    setSaving(true);
    const formData = new FormData();
    previews.forEach(item => formData.append('photos', item.file));

    try {
      await createMedia(formData).unwrap();
      window.alert('Upload Success!');
      setPreviews([]);
      setActiveTab(redirectTo);
    } catch (error: any) {
      console.error('Upload Error:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitMedia}>
        <h6 className="mb-4 card-title font-bold text-lg text-default-800">Add New Media</h6>

        <div className="mb-5">
          <label className="inline-block mb-2 text-sm font-medium text-default-800">
            Select and Upload Images
          </label>

          {/* Droppable Area */}
          <label
            htmlFor="fileInput"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-10 cursor-pointer transition-all mb-5 group ${
              isDragging 
                ? 'border-primary bg-primary/5' 
                : 'border-default-300 hover:bg-default-50'
            }`}
          >
            <LuCloudUpload className={`size-12 mb-3 transition-colors ${
              isDragging ? 'text-primary' : 'text-default-400 group-hover:text-primary'
            }`} />
            <span className="text-default-600 font-medium text-center">
              {isDragging ? "Drop images here..." : "Click to browse or drag and drop images"}
            </span>
            <input
              id="fileInput"
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </label>

          {/* Preview Grid */}
          {previews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {previews.map((item, index) => (
                <div
                  key={index}
                  className="relative group rounded-lg overflow-hidden border border-default-200 shadow-sm h-32"
                >
                  <img src={item.url} alt="preview" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <LuX size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 flex gap-3 md:justify-end border-t border-default-200 pt-5">
          <button
            type="button"
            disabled={saving}
            onClick={() => setPreviews([])}
            className="px-4 py-2 rounded bg-default-100 text-default-700 hover:bg-default-200 transition-colors"
          >
            Clear All
          </button>
          <button
            disabled={saving || previews.length === 0}
            type="submit"
            className="px-4 py-2 rounded bg-primary text-white flex items-center gap-2 min-w-[140px] justify-center disabled:opacity-50"
          >
            {saving ? <LuLoader className="animate-spin" /> : <LuCheck size={18} />}
            {saving ? 'Uploading...' : 'Upload All'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MediaUpload;