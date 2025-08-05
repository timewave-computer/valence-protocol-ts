
import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { ModalContent } from './ModalContent';
import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import './globals.css';

interface DomainModalContextType {
  showModal: () => void;
  closeModal: () => void;
  isModalOpen: boolean;
}

const DomainModalContext = createContext<DomainModalContextType | undefined>(undefined);

export const DomainModalProvider = ({ children }: { children: ReactNode }) => {

  const [isModalOpen, setIsModalOpen] = useState(true);

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
      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 p-4 rounded-md outline-none z-50">
           <VisuallyHidden asChild><Dialog.Title>Connect to a domain</Dialog.Title></VisuallyHidden> 
            <VisuallyHidden asChild><Dialog.Description>Modal for connecting to multiple blockchain domains.</Dialog.Description></VisuallyHidden>
            <ModalContent />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

    </DomainModalContext.Provider>
  );
};

export const useDomainModal = () => {
  const ctx = useContext(DomainModalContext);
  if (!ctx) throw new Error('useDomainModal must be used within DomainModalProvider');
  return ctx;
};
