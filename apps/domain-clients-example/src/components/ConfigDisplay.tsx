'use client';
import { useDomainConfig } from "@valence-protocol/domain-clients-react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Button } from "@/components";

export const ConfigDisplay = () => {
  const config = useDomainConfig();
  return <Collapsible.Root>
    <Collapsible.Trigger asChild>
      <Button variant="secondary">
        View Domain Clients Config
      </Button>
    </Collapsible.Trigger>
    <Collapsible.Content className="pt-2">
    {config &&   <pre className="font-mono text-sm">{JSON.stringify(config, null, 2)}</pre>}
  
    </Collapsible.Content>
  </Collapsible.Root>;
};