import { WalletButton } from '@/components';
import Image from 'next/image';

export function Header() {
  return (
    <header className='w-full flex items-center justify-between min-h-10 p-4 flex-wrap gap-4 bg-white z-10'>
      <div className='flex items-center gap-2'>
        <Image
          src={'/valence-logo.svg'}
          alt='Domain Clients Example App'
          width={20}
          height={20}
        />
        <span className='text-sm font-bold font-mono tracking-wide text-gray-900 '>
          Valence Domain Clients Example
        </span>
      </div>
      <WalletButton />
    </header>
  );
}
