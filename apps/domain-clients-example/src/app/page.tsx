import {  Header, ConfigDisplay } from "@/components";

export default function Home() {

 

  return (
    <>
      <Header />
      <main className="grow p-4 flex flex-col gap-4">
        <p>This app is a simple example of how to use the Valence Domain Modal and Domain Clients API.</p>
        <div>
          <ConfigDisplay />
    </div>

      </main>
    </>

  );
}
