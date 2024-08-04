import LandingHeader from "@/components/desktop/header";
import Projekte from "./projekte/projekte";
import Kontakt from "./kontakt/kontakt";


export default function Home() {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div id="home">
        <LandingHeader />
      </div>
      <div id="projekte">
        <Projekte />
      </div>
      
      <div id="kontakt" className="mt-[17rem] w-full">
        <Kontakt />
      </div>
    </div>
  );
}
