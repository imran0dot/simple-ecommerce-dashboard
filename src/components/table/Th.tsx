import React from 'react';
import type { TableHeaderItem } from './type';

interface ThProps {
  data: TableHeaderItem[];
}

const Th: React.FC<ThProps> = ({ data }) => {
  return (
    <thead className="bg-default-100 border-b border-default-200">
      <tr>
        {data.map((header) => (
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

export default Th;



