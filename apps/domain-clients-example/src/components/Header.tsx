import { WalletButton } from '@/components';

export function Header() {
  return (
    <header className='w-full flex items-center justify-between min-h-10 p-4 flex-wrap gap-4 bg-white z-10 border-b border-gray-800'>
      <h1 className='text-base font-semibold'>Domain Clients Example App</h1>
      <WalletButton />
    </header>
  );
}
