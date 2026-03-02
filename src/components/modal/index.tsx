import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onCancel: React.Dispatch<React.SetStateAction<boolean>> 
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onCancel, header, footer, children }) => {
  // If the modal isn't open, don't render anything
  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={() => onCancel(false)}>
      {/* stopPropagation prevents closing the modal when clicking inside the content area */}
      <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
        <header style={styles.header}>
          {header}
          <button style={styles.closeBtn} onClick={() => onCancel(false)}>
            &times;
          </button>
        </header>

        <main style={styles.body}>{children}</main>

        <footer style={styles.footer}>{footer}</footer>
      </div>
    </div>
  );
};

// Basic inline styles for demonstration
const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '90%',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
  },
  body: {
    padding: '20px 0',
  },
  footer: {
    borderTop: '1px solid #eee',
    paddingTop: '10px',
    textAlign: 'right',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
};

export default Modal;
