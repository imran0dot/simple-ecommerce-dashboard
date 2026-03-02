/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { LuImage, LuUpload } from 'react-icons/lu';
import MediaList from './MediaList';
import MediaUpload from './MediaUpload';
const MediaManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'list'>('upload');

  return (
    <main className="space-y-6">
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
          onClick={() => setActiveTab('list')}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all border-b-2 ${
            activeTab === 'list'
              ? 'border-primary text-primary'
              : 'border-transparent text-default-500 hover:text-default-700'
          }`}
        >
          <LuImage size={18} />
          Medias
        </button>
      </div>

      <div className="lg:col-span-12 col-span-1">
        {/* --- Tab Content: Upload --- */}
        {activeTab === 'upload' && <MediaUpload setActiveTab={setActiveTab} />}

        {/* --- Tab Content: Medias List --- */}
        {activeTab === 'list' && <MediaList setActiveTab={setActiveTab} />}
      </div>
    </main>
  );
};

export default MediaManager;
