import {
  ConnectSolana,
  RaydiumSwap,
  SolanaSplBalance,
  SolanaSplTransfer,
} from '@/components/solana';
import { devnet, mainnet } from '@/config/domainClientsConfig/solana.config';
import { SolanaAccountGuard } from '@/components/solana';
import { solanaUsdc, solanaUser } from '@/const';
import { getSolanaSplBalance } from '@/server';

export const SolanaOps = async () => {
  let usdcBalance;
  try {
    usdcBalance = await getSolanaSplBalance({
      address: solanaUser,
      mintAddress: solanaUsdc.mintAddress,
      clusterId: solanaUsdc.clusterId,
    });
  } catch (error) {
    console.error('Error fetching USDC balance on Solana', error);
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col gap-1'>
        <ConnectSolana chainName={devnet.label} clusterId={devnet.id} />
        <ConnectSolana chainName={mainnet.label} clusterId={mainnet.id} />
      </div>
      <h3 className='font-semibold pt-2'>Read USDC Token balance (Mainnet)</h3>
      <SolanaSplBalance
        initialAddress={solanaUser}
        symbol={solanaUsdc.symbol}
        clusterId={solanaUsdc.clusterId}
        tokenMintAddress={solanaUsdc.mintAddress}
        initialBalance={usdcBalance}
        decimals={solanaUsdc.decimals}
      />
      {/* note: this is a workaround for an issue in the solana signing library */}
      <SolanaAccountGuard
        fallback={<div>Connect to Solana to use signing operations</div>}
      >
        <h3 className='font-semibold pt-2'>USDC SPL Transfer (Devnet)</h3>
        <SolanaSplTransfer
          clusterId={solanaUsdc.clusterId}
          token={{
            mintAddress: solanaUsdc.mintAddress,
            decimals: solanaUsdc.decimals,
          }}
        />
        <h3 className='font-semibold pt-2'>Solana Raydium Swap (Sell)</h3>
        <RaydiumSwap clusterId={mainnet.id} />
      </SolanaAccountGuard>
    </div>
  );
};
