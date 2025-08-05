"use client";
import { Button } from "@/components";
import { useDomainModal } from "@valence-protocol/domain-modal-react";

export default function Home() {
  const { showModal } = useDomainModal();

  const handleConnect = () => {
    showModal();
  };

  return (
    <>
    <header className="w-full flex items-center justify-between min-h-16 p-4 flex-wrap gap-4">
      <h1 className="text-lg font-semibold">Valence Domain Modal Example App</h1>
      <Button onClick={handleConnect}>Connect</Button>
    </header>
    <main className="grow p-4">
        <p>This app is a simple example of how to use the Valence Domain Modal and Domain Clients API.</p>
      </main>
    </>
  
  );
}
