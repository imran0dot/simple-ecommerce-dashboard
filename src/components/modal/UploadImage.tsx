/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { LuImage, LuUpload } from 'react-icons/lu';
import MediaUpload from '../Media/MediaUpload';
import Modal from '.';
import { LucideLoader2 } from 'lucide-react';
import MediaSelect from '../Media/MediaSelect';

interface UploadImageProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string | React.ReactNode;
  size: 'md' | 'lg' | 'sm';
  isLoading: boolean;
  selectionMode: 'single' | 'multiple';
  onSelectionChange?: (urls: string[]) => void;
}

const UploadImageModal: React.FC<UploadImageProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  title,
  size,
  isLoading,
  selectionMode = 'multiple',
  onSelectionChange,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'select' | 'list'>('select');

 

  const renderFooter = () => {
    return (
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="btn bg-default-100 dark:bg-default-200"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className={`flex items-center justify-center gap-2  btn bg-primary text-white `}
        >
          {isLoading && <LucideLoader2 className="animate-spin" size={18} />}
          {isLoading ? 'Processing...' : 'Select Media'}
        </button>
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onCancel={onCancel}
      header={title}
      size={size}
      footer={activeTab == 'select' && renderFooter()}
    >
      <>
        {/* --- Tab Navigation --- */}
        <div className="flex border-b border-default-200">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all border-b-2 ${
              activeTab === 'upload'
                ? 'border-primary text-primary'
                : 'border-transparent text-default-500 hover:text-default-700'
            }`}
          >
            <LuUpload size={18} />
            Upload Media
          </button>
          <button
            onClick={() => setActiveTab('select')}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all border-b-2 ${
              activeTab === 'select'
                ? 'border-primary text-primary'
                : 'border-transparent text-default-500 hover:text-default-700'
            }`}
          >
            <LuImage size={18} />
            Select
          </button>
        </div>

        <div className="lg:col-span-12 col-span-1">
          {/* --- Tab Content: Upload --- */}
          {activeTab === 'upload' && (
            <MediaUpload setActiveTab={setActiveTab} redirectTo="select" />
          )}

          {/* --- Tab Content: Select Image --- */}
          {activeTab === 'select' && (
            <MediaSelect selectionMode={selectionMode} onSelectionChange={onSelectionChange} />
          )}
        </div>
      </>
    </Modal>
  );
};

export default UploadImageModal;
