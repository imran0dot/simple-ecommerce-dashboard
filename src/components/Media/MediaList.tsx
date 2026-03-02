/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LuChevronLeft,
  LuChevronRight,
  LuPlus,
  LuTrash2,
  LuLayoutGrid,
  LuList,
} from 'react-icons/lu';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { useDeleteMediaMutation, useGetMediasQuery } from '@/redux/services/media';
import { useEffect, useState } from 'react';
import { TbReload } from 'react-icons/tb';
import FetchLoader from '@/components/FetchLoader';

interface PaginationMeta {
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

interface MediaListProps {
  setActiveTab: React.Dispatch<'list' | 'upload'>;
}

const MediaList: React.FC<MediaListProps> = ({ setActiveTab }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid'); // View State
  const [currentPage, setCurrentPage] = useState(1);
  const [medias, setMedias] = useState<any[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data, isLoading, isError, refetch } = useGetMediasQuery({
    page: currentPage,
    limit: viewMode === 'grid' ? 12 : 10, // Adjust limit based on view
  });

  const [deleteMedia] = useDeleteMediaMutation();

  useEffect(() => {
    if (data?.data) setMedias(data.data.data);
    if (data?.meta) setMeta(data.meta);
  }, [data]);

  const onRefetch = async () => {
    setIsRefreshing(true);
    try {
      await refetch().unwrap();
    } finally {
      setTimeout(() => setIsRefreshing(false), 600);
    }
  };

  const onDelete = async (public_id: string) => {
    if (!public_id) return window.alert('Public ID not found!');
    if (window.confirm('Delete this media permanently?')) {
      try {
        await deleteMedia(public_id).unwrap();
        window.alert('Deleted Successfully!');
      } catch (err: any) {
        window.alert(err?.data?.message || 'Failed to delete');
      }
    }
  };

  if (isLoading || isRefreshing) return <FetchLoader />;

  return (
    <main>
      <div className="card shadow-sm mb-5">
        {/* Header with View Toggle */}
        <div className="card-header flex flex-wrap justify-between items-center bg-transparent border-b border-default-200 py-4 px-5 gap-4">
          <h4 className="card-title text-default-900 font-bold">Media Library</h4>

          <div className="flex items-center gap-3">
            {/* View Switcher */}
            <div className="flex bg-default-100 p-1 rounded-lg border border-default-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-default-500 hover:text-default-700'}`}
              >
                <LuLayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-default-500 hover:text-default-700'}`}
              >
                <LuList size={18} />
              </button>
            </div>

            <button
              onClick={onRefetch}
              className={`p-2 rounded-full hover:bg-default-100 ${isRefreshing ? 'animate-spin' : ''}`}
            >
              <TbReload size={20} className="text-default-600" />
            </button>

            <button
              onClick={() => setActiveTab('upload')}
              className="btn btn-sm bg-primary text-white flex items-center gap-1"
            >
              <LuPlus size={18} /> Upload New
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5">
          {medias.length === 0 ? (
            <div className="py-20 text-center text-default-500">No media files found.</div>
          ) : viewMode === 'list' ? (
            /* --- Table View --- */
            <div className="overflow-x-auto border rounded-lg border-default-200">
              <table className="min-w-full divide-y divide-default-200">
                <thead className="bg-default-50">
                  <tr className="text-sm font-semibold text-default-700 text-left">
                    <th className="px-4 py-4">Preview</th>
                    <th className="px-4 py-4">Public ID</th>
                    <th className="px-4 py-4">Format</th>
                    <th className="px-4 py-4">Size</th>
                    <th className="px-4 py-4 text-end">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-default-200">
                  {medias.map(item => (
                    <tr key={item._id} className="hover:bg-default-50 transition-all">
                      <td className="px-4 py-3">
                        <img
                          src={item.secure_url || item.url}
                          alt="media"
                          className="h-10 w-14 rounded object-cover border"
                        />
                      </td>
                      <td className="px-4 py-3 text-sm text-default-800 truncate max-w-[200px]">
                        {item.public_id}
                      </td>
                      <td className="px-4 py-3 text-xs uppercase font-bold text-secondary">
                        {item.format}
                      </td>
                      <td className="px-4 py-3 text-sm text-default-500">
                        {(item.bytes / 1024).toFixed(1)} KB
                      </td>
                      <td className="px-4 py-3 text-end">
                        <button
                          onClick={() => onDelete(item.public_id)}
                          className="text-danger hover:text-red-700 p-1"
                        >
                          <LuTrash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* --- Grid View --- */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {medias.map(item => (
                <div
                  key={item._id}
                  className="group relative aspect-square rounded-xl overflow-hidden border border-default-200 shadow-sm bg-default-50"
                >
                  <img
                    src={item.secure_url || item.url}
                    alt="media"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => onDelete(item.public_id)}
                      className="p-2 bg-white/20 hover:bg-danger text-white rounded-full backdrop-blur-md transition-all"
                      title="Delete"
                    >
                      <LuTrash2 size={18} />
                    </button>
                  </div>
                  {/* Format Tag */}
                  <span className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/60 text-white text-[10px] rounded uppercase">
                    {item.format}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Pagination */}
        <div className="card-footer flex flex-wrap justify-between items-center border-t border-default-200 p-4 gap-4">
          <p className="text-default-500 text-sm">
            Showing <b>{medias.length}</b> of <b>{meta?.total || 0}</b> items
          </p>

          <nav className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border rounded-md disabled:opacity-30 hover:bg-default-50"
            >
              <LuChevronLeft size={18} />
            </button>

            {Array.from({ length: meta?.totalPages || 1 }, (_, i) => i + 1).map(pageNum => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`size-9 rounded-md text-sm font-medium transition-all ${
                  currentPage === pageNum
                    ? 'bg-primary text-white'
                    : 'border border-default-200 hover:bg-default-50'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, meta?.totalPages || 1))}
              disabled={currentPage === meta?.totalPages}
              className="p-2 border rounded-md disabled:opacity-30 hover:bg-default-50"
            >
              <LuChevronRight size={18} />
            </button>
          </nav>
        </div>
      </div>
    </main>
  );
};

export default MediaList;
