'use client';
import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from '@solana/web3.js';
import { useEffect } from 'react';
const address = 'AVzP2GeRmqGphJsMxWoqjpUifPpCret7LqWhD8NWQK49'; // jupiter vault authority

interface SolanaReadProps {}
export const SolanaRead = ({}) => {
  useEffect(() => {
    async function getBalance() {
      const connection = new Connection(
        'https://api.mainnet-beta.solana.com',
        'confirmed'
      );
      const balance = await connection.getBalance(new PublicKey(address));
      console.log('balance', balance / LAMPORTS_PER_SOL);
    }
    getBalance();
  }, []);

  return (
    <div className='flex flex-col gap-2 w-1/2 max-w-md'>
      <h2 className='font-semibold text-sm'>Solana</h2>
    </div>
  );
};
