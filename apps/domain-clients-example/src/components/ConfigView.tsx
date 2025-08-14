'use client';
import { useDomainConfig } from '@valence-protocol/domain-clients-react';
import JsonView from '@uiw/react-json-view';

export const ConfigView = () => {
  const config = useDomainConfig();
  return (
    <JsonView
      collapsed={1}
      enableClipboard={false}
      indentWidth={10}
      value={config}
    />
  );
};
