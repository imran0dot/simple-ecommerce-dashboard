import React, { memo } from 'react';

export interface IToggleMenu {
  key: string;
  label: string;
  icon?: React.ReactNode;
  onAction: () => void;
  isDisable: boolean;
  type: 'primary' | 'success' | 'warning' | 'info' | 'danger' | 'secondary' | 'default-500';
}

const ToggleMenu: React.FC<{ menus: IToggleMenu[] }> = ({ menus }) => {
  return (
    <div className="flex items-center gap-0.5 p-0.5 border border-slate-200 dark:border-slate-800 rounded-md w-fit bg-slate-50 dark:bg-slate-900 ">
      {menus.map(item => (
        <button
          key={item.key}
          disabled={item.isDisable}
          onClick={item.onAction}
          className={`flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded transition-all 
            hover:text-${item.type} disabled:text-slate-300 disabled:dark:text-slate-300/30 hover:dark:text-${item.type}-400`}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default memo(ToggleMenu);
