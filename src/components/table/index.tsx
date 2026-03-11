import React from 'react';

const Table = () => {
  return (
    <div>
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
          {/* <tbody className="divide-y divide-default-200">
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
                    <span
                      className={`inline-flex items-center gap-1 py-0.5 px-2.5 rounded-full text-xs font-medium ${category.isLive ? 'bg-success/15 text-success' : 'bg-warning/15 text-warning'}`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${category.isLive ? 'bg-success' : 'bg-warning'}`}
                      ></span>
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
          </tbody> */}
        </table>
      </div>
    </div>
  );
};

export default Table;
