import Footer from "@/components/footer";
import LandingHeader from "@/components/desktop/header";
import Projekte from "./projekte/page";


export default function Home() {
  return (
    <div className="flex flex-col w-full h-auto justify-center items-center">
      <LandingHeader />
      {/* Services Section 
      <ServicesDesktop />
      <div className="h-[110vh]">
      </div>
*/}
      <Projekte />
      <Footer />
    </div>
  );
}
