import { createContext, useContext, useState, ReactNode } from 'react';
import ReactDOM from 'react-dom';

type DomainModalContent = ReactNode | null;

interface DomainModalContextType {
  showModal: (content: ReactNode) => void;
  hideModal: () => void;
}

const DomainModalContext = createContext<DomainModalContextType | undefined>(undefined);

export const DomainModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalContent, setModalContent] = useState<DomainModalContent>(null);

  const showModal = (content: ReactNode) => {
    setModalContent(content);
  };

  const hideModal = () => {
    setModalContent(null);
  };

  return (
    <DomainModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modalContent && ReactDOM.createPortal(
        <div className="modal-overlay">
          <div className="modal-content">
            {modalContent}
            <button onClick={hideModal}>Close</button>
          </div>
        </div>,
        document.body
      )}
    </DomainModalContext.Provider>
  );
};

export const useDomainModal = () => {
  const ctx = useContext(DomainModalContext);
  if (!ctx) throw new Error('useDomainModal must be used within DomainModalProvider');
  return ctx;
};
