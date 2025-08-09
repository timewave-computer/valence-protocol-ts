'use client';

import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { ModalContent } from './ui/ModalContent';
import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { cn } from '@/util';
import {  DomainClientsProvider, type DomainClientsConfig } from '@valence-protocol/domain-clients-react';
import './globals.css';

interface DomainModalContextType {
  showModal: () => void;
closeModal: () => void;
  isModalOpen: boolean;
}

const DomainModalContext = createContext<DomainModalContextType | undefined>(undefined);

export const DomainModalProvider = ({ children, config }: { children: ReactNode, config: DomainClientsConfig }) => {

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
      <DomainClientsProvider config={config}>
      {children}
      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-[1000] bg-slate-500 opacity-50" />
          <Dialog.Content className={cn("fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-sm bg-white z-[1001] shadow-md outline-none",
            "md:w-[50vw] md:max-w-[640px] md:max-h-[80vh]", "w-[90vw] max-w-full max-h-[90vh] ")}>
            <VisuallyHidden asChild><Dialog.Title>Connect to a domain</Dialog.Title></VisuallyHidden>
            <VisuallyHidden asChild><Dialog.Description>Modal for connecting to multiple blockchain domains.</Dialog.Description></VisuallyHidden>
            <ModalContent />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      </DomainClientsProvider>
    </DomainModalContext.Provider>
  );
};

export const useDomainModal = () => {
  const ctx = useContext(DomainModalContext);
  if (!ctx) throw new Error('useDomainModal must be used within DomainModalProvider');
  return ctx;
};
