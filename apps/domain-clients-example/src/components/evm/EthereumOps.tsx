import { mainnet, sepolia } from 'viem/chains';
import {
  ConnectEthereumChain,
  EthereumErc20Balance,
  EthereumNativeTransfer,
} from '@/components';
import { evmUsdc, evmUser } from '@/const';
import { getEthErc20Balance } from '@/server';

export const EthereumOps = async () => {
  // server side client usage
  const usdcBalance = await getEthErc20Balance({
    address: evmUser,
    erc20Address: evmUsdc.tokenAddress,
    chainId: evmUsdc.chainId,
  });

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col gap-1'>
        <ConnectEthereumChain chainName={mainnet.name} chainId={mainnet.id} />
        <ConnectEthereumChain chainName={sepolia.name} chainId={sepolia.id} />
      </div>
      <h3 className='font-semibold pt-2'>Read USDC ERC20 balance (Mainnet)</h3>

      <EthereumErc20Balance
        chainId={evmUsdc.chainId}
        erc20Address={evmUsdc.tokenAddress}
        initialBalance={usdcBalance.balance}
        decimals={usdcBalance.decimals}
        initialAddress={evmUser}
        symbol={evmUsdc.symbol}
      />

      <h3 className='font-semibold pt-2'>Transfer SepoliaETH</h3>

      <EthereumNativeTransfer chainId={sepolia.id} />
    </div>
  );
};
