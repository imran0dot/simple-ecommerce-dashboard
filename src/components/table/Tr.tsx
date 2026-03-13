/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateFormatter } from '@/utils/DateFormate';
import React, { memo } from 'react';

const Tr: React.FC<{
  tableData: {
    name: string;
    key: string;
    element?: (x: any, i: string | number) => React.ReactNode | string;
  }[];
  rowData: any;
  isChecked: boolean;
  onSelect: (id: string) => void;
}> = ({ rowData, tableData, onSelect, isChecked }) => {
  return (
    <tr className="text-default-800 hover:bg-default-50 transition-all">
      <td className="px-4 py-3 whitespace-nowrap">
        <input
          id="checkboxSoft1"
          className="form-checkbox size-4 !border-primary/20 !bg-primary/10 checked:!bg-primary"
          type="checkbox"
          value=""
          checked={isChecked}
          onClick={() => onSelect(rowData._id)}
        ></input>
      </td>
      {tableData.map((item, index) => {
        switch (item.key) {
          // status data show
          case 'isLive':
          case 'status':
            return (
              <td key={index} className="px-4 py-3 whitespace-nowrap">
                <span
                  className={`inline-flex items-center gap-1 py-0.5 px-2.5 rounded-full text-xs font-medium ${rowData[item.key] ? 'bg-success/15 text-success' : 'bg-warning/15 text-warning'}`}
                >
                  <span
                    className={`size-1.5 rounded-full ${rowData[item.key] ? 'bg-success' : 'bg-warning'}`}
                  ></span>
                  {rowData[item.key] ? 'Live' : 'Draft'}
                </span>
              </td>
            );

          // image data show
          case 'img':
          case 'imageUrl':
          case 'image':
            return (
              <td key={index} className="px-4 py-3">
                <img
                  src={rowData[item.key] || '/placeholder.png'}
                  alt={rowData[item.name]}
                  className="h-10 w-10 rounded-lg object-cover border border-default-200"
                />
              </td>
            );

          // Date data show
          case 'createdAt':
          case 'deletedAt':
          case 'updatedAt':
            return (
              <td key={index} className="px-4 py-3 whitespace-nowrap text-sm text-default-500">
                {DateFormatter.toDateTime(rowData[item.key])}
              </td>
            );

          default:
            if (item.element) {
              return item.element(rowData, index);
            }
            return (
              <td key={index} className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                {rowData[item.key]}
              </td>
            );
        }
      })}
    </tr>
  );
};

export default memo(Tr);
