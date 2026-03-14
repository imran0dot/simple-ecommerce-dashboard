/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LuChevronLeft,
  LuChevronRight,
  LuDownload,
  LuPlus,
  LuSquarePen,
  LuTrash2,
} from 'react-icons/lu';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { useCallback, useEffect, useState } from 'react';
import { TbReload } from 'react-icons/tb';
import FetchLoader from '@/components/FetchLoader';
import { useDeleteMutation, useGetQuery } from '@/redux/services/brand';
import type { BrandListProps, PaginationMeta } from './type';
import Th from '@/components/table/Th';
import Tr from '@/components/table/Tr';
import ActionModal from '@/components/modal/ActionModal';
import { toast } from 'sonner';
import ToggleMenu, { type IToggleMenu } from '@/components/ToggleMenu';
import { TrashIcon } from 'lucide-react';

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

const List: React.FC<BrandListProps> = ({ setPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [deletingItem, setDeletingItem] = useState<any | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

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
      element: (row: any, index: string | number) => (
        <td key={index} className="px-4 py-3 text-end">
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setPage({ data: row, action: 'update' })}
              className="flex size-8 items-center justify-center rounded-md bg-info/10 text-info hover:bg-info hover:text-white transition-all"
            >
              <LuSquarePen size={16} />
            </button>
            <button
              onClick={() => setDeletingItem(row)}
              className="flex size-8 items-center justify-center rounded-md bg-danger/10 text-danger hover:bg-danger hover:text-white transition-all"
            >
              <LuTrash2 size={16} />
            </button>
          </div>
        </td>
      ),
    },
  ];

  const myMenus: IToggleMenu[] = [
    {
      key: 'trash',
      label: 'Move to Trash',
      type: 'danger',
      icon: <TrashIcon size={16} />,
      onAction: () => onToggleMenuClick('deleteAll'),
      isDisable: selectedItems.length < 1,
    },
  ];

  // RTK Query hooks
  const { data, isLoading, isError, error, refetch } = useGetQuery({
    page: currentPage,
    limit: 10,
  });

  const [deleteBrand, { isLoading: isDeleting }] = useDeleteMutation();

  useEffect(() => {
    if (data?.data) {
      setBrands(data?.data?.data);
    }
    if (data?.data?.meta) {
      setMeta(data?.data?.meta);
    }
  }, [data]);

  // handle on all select
  const onAllSelect = useCallback(() => {
    const brandsIds = brands.map(b => b._id);
    setSelectedItems(prev => {
      return prev.length === brands.length ? [] : [...brandsIds];
    });
  }, [brands]);

  const onSingleSelect = useCallback((id: string) => {
    setSelectedItems(prev => {
      return prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
    });
  }, []);

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
    try {
      await deleteBrand({ id }).unwrap();
      toast.success('Successfully Deleted!');
    } catch (err: any) {
      console.error('Delete Error:', err);
      toast.error('Something went wrong');
    } finally {
      setDeletingItem(null);
    }
  };

  // ======== Toggle Menu Handler
  const onToggleMenuClick = (type: string) => {
    switch (type) {
      case 'deleteAll':
        if (confirm('Are You Sure To Delete Selected Data ')) {
          setSelectedItems([]);
        }
        break;

      default:
        break;
    }
  };

  // ========== Node Renders From Here ==========
  if (isLoading || isRefreshing) {
    return <FetchLoader />;
  }

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

      {/* ======= Toggle Menu ====== */}
      <div className="flex  justify-between items-center mt-5">
        <ToggleMenu menus={myMenus} />

        {/* // ======== Reload and add new btn  */}
        <div className="flex justify-center items-center">
          <button
            onClick={onRefetch}
            className={`rounded-full flex btn hover:bg-default-100 transition-all ${isRefreshing ? 'animate-spin ' : ''}`}
            title="Reload Data"
          >
            Reload
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

      <div className="grid grid-cols-1 gap-5 my-5">
        <div className="card">
          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-default-200">
                  <Th
                    data={brandTableRow}
                    onAllSelect={onAllSelect}
                    isAllChecked={brands.length === selectedItems.length}
                  />

                  <tbody className="divide-y divide-default-200">
                    {brands.length > 0 ? (
                      brands.map((data, index) => (
                        <Tr
                          key={index}
                          rowData={data}
                          tableData={brandTableRow}
                          onSelect={onSingleSelect}
                          isChecked={selectedItems.includes(data._id)}
                        />
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

      <ActionModal
        isOpen={deletingItem ? true : false}
        onCancel={() => setDeletingItem(null)}
        onConfirm={() => onDelete(deletingItem._id)}
        isLoading={isDeleting}
        type="delete"
        title="Delete Brand"
        message="Are you sure you want to delete this brand? This action cannot be undone."
        size="sm"
      />
    </main>
  );
};

export default List;
