/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LuChevronLeft, LuChevronRight, LuPlus, LuSquarePen, LuTrash2 } from 'react-icons/lu';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { useEffect, useState } from 'react';
import { TbReload } from 'react-icons/tb';
import FetchLoader from '@/components/FetchLoader';
import { useDeleteMutation, useGetQuery } from '@/redux/services/brand';
import type { BrandListProps, PaginationMeta } from './type';
import Th from '@/components/table/Th';
import Tr from '@/components/table/Tr';

export type Brand = {
  _id: string;
  name: string;
  slug: string;
  imageUrl?: string;
  hasParent: boolean;
  parentName?: string;
  isLive: boolean;
  createdAt: string;
};

const brandTableRow = [
  {
    key: 'name',
    name: 'T.NAME',
    toolTip: 'TABLE NAME',
  },
  {
    key: 'imageUrl',
    name: 'B.IMG',
    toolTip: 'Brand Image',
  },
  {
    key: 'slug',
    name: 'Slug',
    toolTip: 'Slug',
  },
  {
    key: 'isLive',
    name: 'STATUS',
    toolTip: 'status',
  },
  {
    key: 'createdAt',
    name: 'C.DATE',
    toolTip: 'Created Date',
  },
  {
    key: 'updatedAt',
    name: 'U.Date',
    toolTip: 'Updated Date',
  },
  {
    key: 'action',
    name: 'ACTION',
    toolTip: 'action',
    element: (row: any) => (
      <td className="px-4 py-3 text-end">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => console.log(row)}
            className="flex size-8 items-center justify-center rounded-md bg-info/10 text-info hover:bg-info hover:text-white transition-all"
          >
            <LuSquarePen size={16} />
          </button>
          <button
            onClick={() => console.log(row)}
            className="flex size-8 items-center justify-center rounded-md bg-danger/10 text-danger hover:bg-danger hover:text-white transition-all"
          >
            <LuTrash2 size={16} />
          </button>
        </div>
      </td>
    ),
  },
];

const List: React.FC<BrandListProps> = ({ setPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  // RTK Query hooks
  const { data, isLoading, isError, error, refetch } = useGetQuery({
    page: currentPage,
    limit: 10,
  });
  const [deleteBrand] = useDeleteMutation();

  useEffect(() => {
    if (data?.data) {
      setBrands(data?.data?.data);
    }
    if (data?.data?.meta) {
      setMeta(data?.data?.meta);
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
        await deleteBrand({ id }).unwrap();
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

  console.log('========= Meta');
  console.log(meta);

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 card">
        <p className="text-danger mb-4">Failed to load Data!</p>
        <button onClick={() => onRefetch()} className="btn btn-sm bg-primary text-white">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <main>
      <PageBreadcrumb title="Brand List" />

      <div className="grid grid-cols-1 gap-5 mb-5">
        <div className="card">
          <div className="card-header flex justify-between items-center bg-transparent border-b border-default-200 py-4">
            <h4 className="card-title text-default-900">Brand</h4>

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
                Add New
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-default-200">
                  <Th data={brandTableRow} />

                  <tbody className="divide-y divide-default-200">
                    {brands.length > 0 ? (
                      brands.map((brands, index) => (
                        <Tr key={index} rowData={brands} tableData={brandTableRow} />
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-4 py-10 text-center text-default-500">
                          No Data found.
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
              Showing <b>{brands.length}</b> of <b>{meta?.total || 0}</b> categories
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
              {Array.from({ length: meta?.totalPages || 0 }, (_, i) => i + 1).map(pageNum => (
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
                disabled={currentPage === meta?.totalPages || meta?.totalPages === 0}
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

export default List;
