import Footer from "@/components/footer";
import ServiceCardsDesktop from "@/components/service-cards-desktop";
import ServiceCardMobile from "@/components/service-cards-mobile";
import Image from "next/image";
import Link from "next/link";

export default function Services() {
    return (
        <div className="flex flex-col items-center mt-20 h-screen">
            <h1 className="text-6xl">Services</h1>
            <div className="flex justify-center items-center py-28 md:py-40 object-contain w-full h-40 md:h-[400px]  overflow-hidden">
            <Image 
                src={`/studio-racks-wide.jpeg`}
                alt="Studio Racks"
                width={1920}
                height={1080}
                />
            </div>
            
<div className="mt-[-4rem] md:mt-[-7rem] mx-2">
  <h2 className="text-4xl md:text-5xl text-center md:leading-normal">
    <span className="bg-custom-orange dark:bg-black">Unsere</span> <br/> 
    <span className="bg-black text-custom-orange dark:bg-custom-orange dark:text-black">Erstklassigen</span> <br/> 
    Tonstudio-Dienstleistungen
  </h2>
</div>
            <div className="hidden md:block">
                <ServiceCardsDesktop/>
            </div>
            <div className="block md:hidden">
                <ServiceCardMobile />
            </div>

            <Link 
                href={'/kontakt'}
                className="bg-custom-orange hover:cursor-pointer text-black  p-4 rounded-xl shadow-2xl text-5xl mt-6 animate-pulse transition ease-in-out duration-200"
                >Jetzt buchen
            </Link>
            <div className="mt-12 w-full">
                <Footer />
            </div>
            
        </div>
    );
}