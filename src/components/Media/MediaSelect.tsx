/* eslint-disable @typescript-eslint/no-explicit-any */
import { LuCheck, LuRotateCcw } from 'react-icons/lu';
import { useGetMediasQuery } from '@/redux/services/media';
import { useEffect, useState } from 'react';
import FetchLoader from '@/components/FetchLoader';

interface PaginationMeta {
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

interface MediaSelectProps {
  onSelectionChange?: (urls: string[]) => void;
  selectionMode?: 'single' | 'multiple';
}

const MediaSelect: React.FC<MediaSelectProps> = ({
  onSelectionChange,
  selectionMode = 'multiple',
}) => {
  const [limit] = useState(18);
  const [currentPage, setCurrentPage] = useState(1);
  const [medias, setMedias] = useState<any[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({});
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);

  const { data, isLoading, isFetching } = useGetMediasQuery({
    page: currentPage,
    limit: limit,
  });

  useEffect(() => {
    if (data?.data) {
      if (currentPage === 1) {
        setMedias(data.data.data);
      } else {
        setMedias(prev => [...prev, ...data.data.data]);
      }
    }
    if (data?.meta) setMeta(data.meta);
  }, [data, currentPage]);

  // --- Flexible Selection Logic ---
  const handleToggleSelect = (url: string) => {
    if (selectionMode === 'single') {
      setSelectedUrls(prev => (prev.includes(url) ? [] : [url]));
    } else {
      setSelectedUrls(prev =>
        prev.includes(url) ? prev.filter(item => item !== url) : [...prev, url]
      );
    }
  };

  const handleLoadMore = () => {
    if (meta.totalPages && currentPage < meta.totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedUrls);
    }
  }, [onSelectionChange, selectedUrls]);

  if (isLoading && currentPage === 1) return <FetchLoader />;

  return (
    <main>
      <div className="">
        {/* Grid Area */}
        <div className="">
          {medias.length === 0 && !isLoading ? (
            <div className="py-20 text-center text-default-500">No media files found.</div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {medias.map((item, idx) => {
                  const imageUrl = item.secure_url || item.url;
                  const isSelected = selectedUrls.includes(imageUrl);

                  return (
                    <div
                      key={`${item._id}-${idx}`}
                      onClick={() => handleToggleSelect(imageUrl)}
                      className={`group relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-primary shadow-md ring-2 ring-primary/20'
                          : 'border-default-200 hover:border-primary/50'
                      }`}
                    >
                      <img
                        src={imageUrl}
                        alt="media"
                        className={`h-full w-full object-cover transition-transform duration-300 ${
                          isSelected ? 'scale-90 rounded-lg' : 'group-hover:scale-105'
                        }`}
                      />

                      {isSelected && (
                        <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                          <div className="bg-white rounded-full p-0.5 shadow-lg animate-in zoom-in-50 duration-200">
                            <LuCheck size={24} className="text-primary" />
                          </div>
                        </div>
                      )}

                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/60 text-white text-[10px] rounded uppercase">
                        {item.format}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Load More */}
              <div className="mt-10 flex justify-center">
                {meta.totalPages && currentPage < meta.totalPages ? (
                  <button
                    onClick={handleLoadMore}
                    disabled={isFetching}
                    className="flex items-center gap-2 px-6 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all disabled:opacity-50"
                  >
                    {isFetching ? (
                      <div className="size-4 border-2 border-t-transparent border-primary animate-spin rounded-full"></div>
                    ) : (
                      <LuRotateCcw size={18} />
                    )}
                    {isFetching ? 'Loading...' : 'Load More'}
                  </button>
                ) : (
                  medias.length > 0 && (
                    <p className="text-default-400 text-sm italic">
                      You've reached the end of the library.
                    </p>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Clear Floating Button (Shudhu multiple mode e beshi useful) */}
      {selectedUrls.length > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
          <button
            onClick={() => setSelectedUrls([])}
            className="bg-default-800 text-white px-6 py-2.5 rounded-full shadow-2xl hover:bg-black transition-all flex items-center gap-2"
          >
            Clear {selectedUrls.length} selections
          </button>
        </div>
      )}
    </main>
  );
};

export default MediaSelect;
