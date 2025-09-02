import { ConnectSolana } from '@/components/solana';
import { devnet, mainnet } from '@/config/domainClientsConfig/solana.config';
import { SolanaSigningOps } from '@/components/solana';

export const SolanaOps = () => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col gap-1'>
        <ConnectSolana chainName={devnet.label} clusterId={devnet.id} />
        <ConnectSolana chainName={mainnet.label} clusterId={mainnet.id} />
      </div>
      {/* note: this is a workaround for a bug in the solana signing library */}
      <SolanaSigningOps />
    </div>
  );
};
