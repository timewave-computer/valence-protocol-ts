'use client';
import { useDomainConfig } from '@valence-protocol/domain-clients-react';
import JsonView from '@uiw/react-json-view';

export const ConfigView = () => {
  const config = useDomainConfig();
  return (
    <div className='flex flex-col gap-1'>
      <h2 className='font-semibold'>Domain Clients Config</h2>
      <JsonView
        collapsed={1}
        enableClipboard={false}
        indentWidth={10}
        value={config}
      />
    </div>
  );
};
