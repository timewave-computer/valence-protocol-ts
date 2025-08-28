import { ConnectSolana, SolanaSplTransfer } from '@/components/solana';
import { devnet, mainnet } from '@/config/domainClientsConfig/solana.config';
import { solanaUsdc } from '@/const';

export const SolanaOps = () => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col gap-1'>
        <ConnectSolana chainName={devnet.label} clusterId={devnet.id} />
        <ConnectSolana chainName={mainnet.label} clusterId={mainnet.id} />
      </div>
      <h3 className='font-semibold pt-2'>Transfer SPL (Devnet)</h3>
      <SolanaSplTransfer
        clusterId={devnet.id}
        token={{
          mintAddress: solanaUsdc.mintAddress,
          decimals: solanaUsdc.decimals,
        }}
      />
    </div>
  );
};
