import { ConnectSolana } from './ConnectSolana';
import { devnet, mainnet } from '@/config/domainClientsConfig/solana.config';

export const SolanaOps = () => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col gap-1'>
        <ConnectSolana chainName={devnet.label} clusterId={devnet.id} />
        <ConnectSolana chainName={mainnet.label} clusterId={mainnet.id} />
      </div>
    </div>
  );
};
