import {
  ConnectCosmosChain,
  NeutronRead,
  NeutronTestnetWrite,
} from '@/components/cosmos';
import { neutronNtrn, neutronUser } from '@/const';
import { getCosmosBalance } from '@/server';
import { neutrontestnet, neutron } from 'graz/chains';

export const CosmosOps = async () => {
  // server side client usage
  const cosmosBalance = await getCosmosBalance({
    address: neutronUser,
    denom: neutronNtrn.denom,
    chainId: neutronNtrn.chainId,
  });
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col gap-1'>
        <ConnectCosmosChain chainInfo={neutrontestnet} />
        <ConnectCosmosChain chainInfo={neutron} />
      </div>
      <h3 className='font-semibold pt-2'>Read NTRN Balance (Mainnet)</h3>
      <NeutronRead
        denom={neutronNtrn.denom}
        chainId={neutronNtrn.chainId}
        initialBalance={cosmosBalance.amount}
        decimals={cosmosBalance.decimals}
        initialAddress={neutronUser}
        symbol={neutronNtrn.symbol}
      />
      <h3 className='font-semibold pt-2'>Transfer NTRN (Testnet)</h3>
      <NeutronTestnetWrite
        denom={neutronNtrn.denom}
        decimals={neutronNtrn.decimals}
        chainId={neutrontestnet.chainId}
      />
    </div>
  );
};
