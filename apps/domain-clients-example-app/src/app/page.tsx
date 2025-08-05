import { Button } from "@/components";

export default function Home() {
  return (
    <>
    <header className="w-full flex items-center justify-between min-h-16 p-4 flex-wrap gap-4">
      <h1 className="text-lg font-semibold">Valence Domain Modal Example App</h1>
      <Button>Connect</Button>
    </header>
    <main className="p-4">
        <body>This app is a simple example of how to use the Valence Domain Modal and Domain Clients API.</body>
      </main>
    </>
  
  );
}
