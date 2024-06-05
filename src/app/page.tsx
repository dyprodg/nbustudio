import Footer from "@/components/footer";
import LandingBody from "@/components/landing-body";
import { LandingHeader } from "@/components/landing-header";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-auto justify-center items-center">
      <LandingHeader />
      <LandingBody />
      <Footer />
    </div>
  );
}
