import React, { memo } from 'react';
import type { TableHeaderItem } from './type';

interface ThProps {
  data: TableHeaderItem[];
  onAllSelect: () => void;
  isAllChecked: boolean;
}

const Th: React.FC<ThProps> = ({ data, onAllSelect, isAllChecked }) => {
  return (
    <thead className="bg-default-100 border-b border-default-200">
      <tr>
        <th className="px-4 py-4 text-start text-sm font-semibold text-default-700 uppercase tracking-wider whitespace-nowrap">
          <input
            id="checkboxSoft1"
            className="form-checkbox size-4 !border-primary/20 !bg-primary/10 checked:!bg-primary"
            type="checkbox"
            value=""
            checked={isAllChecked}
            onClick={onAllSelect}
          ></input>
        </th>
        {data.map(header => (
          <th
            key={header.name}
            title={header.toolTip}
            className="px-6 py-4 text-start text-sm font-semibold text-default-700 uppercase tracking-wider whitespace-nowrap"
          >
            {header.name}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default memo(Th);
