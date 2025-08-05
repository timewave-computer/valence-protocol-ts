
import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { ModalContent } from './ModalContent';

interface DomainModalContextType {
  showModal: () => void;
  closeModal: () => void;
  isModalOpen: boolean;
}

const DomainModalContext = createContext<DomainModalContextType | undefined>(undefined);

export const DomainModalProvider = ({ children }: { children: ReactNode }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const value = useMemo(() => ({ showModal, closeModal, isModalOpen }), [showModal, closeModal, isModalOpen]);


  return (
    <DomainModalContext.Provider value={value}>
      {children}
      {isModalOpen && ReactDOM.createPortal(
        <div className="modal-overlay">
          <div className="modal-content">
            <ModalContent />
            <button onClick={closeModal}>Close</button>
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
