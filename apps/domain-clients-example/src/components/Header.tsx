'use client';
import { Button } from '@/components';
import { useDomainModal } from '@valence-protocol/domain-modal-react';

export function Header() {
  const { showModal } = useDomainModal();

  return (
    <header className='w-full flex items-center justify-between min-h-16 p-4 flex-wrap gap-4 sticky top-0 bg-white z-10'>
      <h1 className='text-lg font-semibold'>
        Valence Domain Modal Example App
      </h1>
      <Button onClick={showModal}>Wallet</Button>
    </header>
  );
}
