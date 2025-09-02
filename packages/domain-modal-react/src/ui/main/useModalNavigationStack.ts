'use client';
import { useState } from 'react';

// not all but main need to match the key value of the domain config
export enum ModalPage {
  MAIN = 'main',
  SOLANA = 'solana',
  COSMOS = 'cosmos',
  EVM = 'evm',
}

export const useModalNavigation = () => {
  const [stack, setStack] = useState<ModalPage[]>([ModalPage.MAIN]);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  const push = (page: ModalPage) => {
    setStack(s => [...s, page]);
    setDirection(1);
  };
  const pop = () => {
    setStack(s => (s.length > 1 ? s.slice(0, -1) : s));
    setDirection(-1);
  };
  const reset = (page: ModalPage) => {
    setStack([page]);
    setDirection(1);
  };

  return {
    current: stack[stack.length - 1],
    push,
    pop,
    reset,
    direction,
    stackHeight: stack.length,
  };
};
