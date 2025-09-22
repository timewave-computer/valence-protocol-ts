'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  cn,
  DomainModalContextType,
  type TargetChains,
  ModalContentRoot,
} from '@/ui';
import '@/globals.css';
import { DomainClientsProvider } from '@valence-protocol/domain-clients-react';
import { DomainClientsConfig } from '@valence-protocol/domain-clients-react';

const DomainModalContext = createContext<DomainModalContextType | undefined>(
  undefined
);

export const DomainModalProvider = ({
  children,
  config,
}: {
  children: ReactNode;
  config: DomainClientsConfig;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetChains, setTargetChains] = useState<TargetChains | undefined>(
    undefined
  );

  const showModal = useCallback(
    (targetChains?: TargetChains) => {
      setIsModalOpen(true);
      setTargetChains(targetChains);
    },
    [setIsModalOpen, setTargetChains]
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const value = useMemo(
    () => ({ showModal, closeModal, isModalOpen, targetChains }),
    [showModal, closeModal, isModalOpen, targetChains]
  );

  return (
    <DomainClientsProvider config={config}>
      <DomainModalContext.Provider value={value}>
        {children}
        <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className='data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-[1000] bg-slate-500 opacity-50' />
            <Dialog.Content
              className={cn(
                'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-white z-[1001] shadow-md outline-none',
                'w-full max-w-[90vw] md:max-w-[540px]',
                'p-4 md:p-8',
                'overflow-x-hidden'
              )}
            >
              <VisuallyHidden asChild>
                <Dialog.Title>Select a Wallet</Dialog.Title>
              </VisuallyHidden>
              <VisuallyHidden asChild>
                <Dialog.Description>
                  Modal for connecting to multiple blockchain domains.
                </Dialog.Description>
              </VisuallyHidden>
              <ModalContentRoot />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </DomainModalContext.Provider>
    </DomainClientsProvider>
  );
};

export const useDomainModal = () => {
  const ctx = useContext(DomainModalContext);
  if (!ctx)
    throw new Error('useDomainModal must be used within DomainModalProvider');
  return ctx;
};
