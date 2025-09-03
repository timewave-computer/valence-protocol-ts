import {
  ConnectCosmosChain,
  CosmosDenomBalance,
  CosmosDenomTransfer,
} from '@/components/cosmos';
import { neutronNtrn, neutronUser } from '@/const';
import { getCosmosBalance } from '@/server';
import { neutrontestnet, neutron } from 'graz/chains';
import { Suspense } from 'react';

export const CosmosOps = async () => {
  // server side client usage
  let cosmosBalance;
  try {
    cosmosBalance = await getCosmosBalance({
      address: neutronUser,
      denom: neutronNtrn.denom,
      chainId: neutronNtrn.chainId,
    });
  } catch (error) {
    console.error('Error fetching NTRN balance on Cosmos', error);
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col gap-1'>
        <ConnectCosmosChain chainInfo={neutrontestnet} />
        <ConnectCosmosChain chainInfo={neutron} />
      </div>
      <h3 className='font-semibold pt-2'>Read NTRN Balance (Mainnet)</h3>
      <Suspense fallback={<div>Loading...</div>}>
        <CosmosDenomBalance
          denom={neutronNtrn.denom}
          chainId={neutronNtrn.chainId}
          initialBalance={cosmosBalance?.amount}
          decimals={cosmosBalance?.decimals ?? 0} // for simplifity, not for prod
          initialAddress={neutronUser}
          symbol={neutronNtrn.symbol}
        />
      </Suspense>

      <h3 className='font-semibold pt-2'>Transfer NTRN (Testnet)</h3>
      <CosmosDenomTransfer
        denom={neutronNtrn.denom}
        decimals={neutronNtrn.decimals}
        chainId={neutrontestnet.chainId}
      />
    </div>
  );
};
