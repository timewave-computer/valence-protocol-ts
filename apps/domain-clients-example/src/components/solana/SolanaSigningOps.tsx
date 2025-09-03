'use client';
import { solanaUsdc } from '@/const';
import { useWalletUiAccount } from '@wallet-ui/react';
import { SolanaSplTransfer } from '@/components/solana';
import { devnet } from '@/config/domainClientsConfig/solana.config';
import { RaydiumSwap } from '@/components/solana';

// this is a workaround for a bug in the solana signing library
// it will ensure the useSigningSolanaClient hook is only instantiated if there is an account connected
// once fixed, this component can be removed

export const SolanaSigningOps = () => {
  const { account } = useWalletUiAccount();

  if (!account) {
    return <div>Connect to Solana to test signing operations</div>;
  }

  return (
    <>
      <h3 className='font-semibold pt-2'>USDC SPL Transfer (Devnet)</h3>
      <SolanaSplTransfer
        clusterId={devnet.id}
        token={{
          mintAddress: solanaUsdc.mintAddress,
          decimals: solanaUsdc.decimals,
        }}
      />
      <h3 className='font-semibold pt-2'>Solana Raydium Swap (Sell)</h3>
      <RaydiumSwap clusterId={devnet.id} />
    </>
  );
};
