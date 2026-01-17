/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LuChevronLeft, LuChevronRight, LuPlus, LuSquarePen, LuTrash2 } from 'react-icons/lu';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { useDeleteCategoryMutation, useGetCategoriesQuery } from '@/redux/services/category';
import { useEffect, useState } from 'react';
import { TbReload } from 'react-icons/tb';
import FetchLoader from '@/components/FetchLoader';

export type Category = {
  _id: string;
  name: string;
  slug: string;
  imageUrl?: string;
  hasParent: boolean;
  parentName?: string;
  isLive: boolean;
  createdAt: string;
};

// Meta ডাটার জন্য ইন্টারফেস
interface PaginationMeta {
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

interface CategoryListProps {
  setPage: React.Dispatch<
    React.SetStateAction<{
      data: any | null;
      action: string;
    }>
  >;
}

const CategoryList: React.FC<CategoryListProps> = ({ setPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({}); // টাইপ সেট করা হয়েছে
  const [isRefreshing, setIsRefreshing] = useState(false);

  // RTK Query hooks
  const { data, isLoading, isError, error, refetch } = useGetCategoriesQuery({
    page: currentPage,
    limit: 10,
  });
  const [deleteCategory] = useDeleteCategoryMutation();

  useEffect(() => {
    if (data?.data) {
      setCategories(data.data);
    }
    if (data?.meta) {
      setMeta(data.meta);
    }
  }, [data]);

  const onRefetch = async () => {
    setIsRefreshing(true);
    try {
      await refetch().unwrap();
    } catch (err) {
      console.error('Failed to refresh:', err);
    } finally {
      setTimeout(() => setIsRefreshing(false), 600);
    }
  };

  const onDelete = async (id: string) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');
    if (isConfirmed) {
      try {
        await deleteCategory({ id }).unwrap();
        window.alert('Successfully Deleted!');
      } catch (err: any) {
        console.error('Delete Error:', err);
        window.alert(err?.data?.message || 'Something went wrong');
      }
    }
  };

  if (isLoading || isRefreshing) {
    return <FetchLoader />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 card">
        <p className="text-danger mb-4">Failed to load categories!</p>
        <button onClick={() => onRefetch()} className="btn btn-sm bg-primary text-white">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <main>
      <PageBreadcrumb title="Category List" />

      <div className="grid grid-cols-1 gap-5 mb-5">
        <div className="card">
          <div className="card-header flex justify-between items-center bg-transparent border-b border-default-200 py-4">
            <h4 className="card-title text-default-900">Categories</h4>

            <div className="flex items-center gap-2">
              <button
                onClick={onRefetch}
                className={`p-2 rounded-full hover:bg-default-100 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
                title="Reload Data"
              >
                <TbReload size={20} className="text-default-600" />
              </button>

              <button
                onClick={() => setPage({ data: null, action: 'create' })}
                className="btn btn-sm bg-primary text-white flex items-center gap-1"
              >
                <LuPlus size={18} />
                Add Category
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-default-200">
                  <thead className="bg-default-100">
                    <tr className="text-sm font-semibold text-default-700">
                      <th className="px-4 py-4 text-start">Image</th>
                      <th className="px-4 py-4 text-start">Category Name</th>
                      <th className="px-4 py-4 text-start">Slug</th>
                      <th className="px-4 py-4 text-start">Type</th>
                      <th className="px-4 py-4 text-start">Status</th>
                      <th className="px-4 py-4 text-start">Created At</th>
                      <th className="px-4 py-4 text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-default-200">
                    {categories.length > 0 ? (
                      categories.map(category => (
                        <tr
                          key={category._id}
                          className="text-default-800 hover:bg-default-50 transition-all"
                        >
                          <td className="px-4 py-3">
                            <img
                              src={category.imageUrl || '/placeholder.png'}
                              alt={category.name}
                              className="h-10 w-10 rounded-lg object-cover border border-default-200"
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                            {category.name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-default-500">
                            <span className="bg-default-100 px-2 py-1 rounded">/{category.slug}</span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            {category.hasParent ? (
                              <span className="text-[11px] font-medium bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full uppercase">
                                Sub: {category.parentName || 'Parent'}
                              </span>
                            ) : (
                              <span className="text-[11px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full uppercase">
                                Main
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 py-0.5 px-2.5 rounded-full text-xs font-medium ${category.isLive ? 'bg-success/15 text-success' : 'bg-warning/15 text-warning'}`}>
                              <span className={`size-1.5 rounded-full ${category.isLive ? 'bg-success' : 'bg-warning'}`}></span>
                              {category.isLive ? 'Live' : 'Draft'}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-default-500">
                            {new Date(category.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-end">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setPage({ data: category, action: 'update' })}
                                className="flex size-8 items-center justify-center rounded-md bg-info/10 text-info hover:bg-info hover:text-white transition-all"
                              >
                                <LuSquarePen size={16} />
                              </button>
                              <button
                                onClick={() => onDelete(category._id)}
                                className="flex size-8 items-center justify-center rounded-md bg-danger/10 text-danger hover:bg-danger hover:text-white transition-all"
                              >
                                <LuTrash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-4 py-10 text-center text-default-500">
                          No categories found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="card-footer flex justify-between items-center border-t border-default-200 p-4">
            <p className="text-default-500 text-sm">
              Showing <b>{categories.length}</b> of <b>{meta?.total || 0}</b> categories
            </p>

            <nav className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="btn btn-sm border border-default-200 hover:bg-default-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LuChevronLeft size={16} />
              </button>

              {/* Dynamic Page Number Buttons */}
              {Array.from({ length: meta?.totalPages || 0 }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`btn btn-sm ${
                    currentPage === pageNum
                      ? 'bg-primary text-white'
                      : 'border border-default-200 hover:bg-default-100 text-default-600'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, meta?.totalPages || 1))}
                disabled={currentPage === meta?.totalPages || (meta?.totalPages === 0)}
                className="btn btn-sm border border-default-200 hover:bg-default-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LuChevronRight size={16} />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CategoryList;