import React from 'react';
import Modal from './';
import { LucideLoader2 } from 'lucide-react';

type ActionType = 'delete' | 'create' | 'edit';

interface ActionModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean; // Added loading state
  type: ActionType;
  title: string;
  message: string;
  size?: 'sm' | 'md' | 'lg';
}

const ActionModal: React.FC<ActionModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
  isLoading = false,
  type,
  title,
  message,
  size = 'md',
}) => {
  const config = {
    delete: { color: 'btn bg-danger text-white', text: 'Delete' },
    create: { color: 'btn bg-success text-white', text: 'Create' },
    edit: { color: 'btn bg-info text-white', text: 'Save Changes' },
  };

  const activeConfig = config[type];

  return (
    <Modal
      isOpen={isOpen}
      onCancel={onCancel}
      header={title}
      size={size}
      footer={
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="btn bg-default-100 dark:bg-default-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex items-center justify-center gap-2 ${activeConfig.color} `}
          >
            {isLoading && <LucideLoader2 className="animate-spin" size={18} />}
            {isLoading ? 'Processing...' : activeConfig.text}
          </button>
        </div>
      }
    >
      <p className="text-slate-600 dark:text-slate-400">{message}</p>
    </Modal>
  );
};

export default ActionModal;
