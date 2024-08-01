import Footer from "@/components/footer";
import Logo from "@/components/logo";
import Link from "next/link";

const services = [
    {
        title: "Service 1",
        price: "100CHF",
        description: [
            "blablablablablablablablablablablablablablabla",
            "asdfasdfasdfasdfasdf",
        ]
    },
    {
        title: "Service 2",
        price: "100CHF",
        description: [
            "blablablablablablablablablablablablablablabla",
            "asdfasdfasdfasdfasdf",
        ]
    },
    {
        title: "Service 3",
        price: "100CHF",
        description: [
            "blablablablablablablablablablablablablablabla",
            "asdfasdfasdfasdfasdf",
        ]
    },
    {
        title: "Service 4",
        price: "100CHF",
        description: [
            "blablablablablablablablablablablablablablabla",
            "asdfasdfasdfasdfasdf",
        ]
    },
    {
        title: "Service 5",
        price: "100CHF",
        description: [
            "blablablablablablablablablablablablablablabla",
            "asdfasdfasdfasdfasdf",
        ]
    },
    {
        title: "Service 6",
        price: "100CHF",
        description: [
            "blablablablablablablablablablablablablablabla",
            "asdfasdfasdfasdfasdf",
        ]
    },
]

export default function Services() {
    return (
        <div className="flex flex-col items-center mt-20 h-screen">
            <div className="flex w-full justify-center md:justify-start">
                <div className="bg-custom-orange border-4 border-black flex justify-center items-center p-4 rounded-full ml-4">
                    <Logo size={180} color="black" />
                </div>
            </div>

            <div className="w-full flex m-4 justify-center text-center">
                {services.map((service, index) => (
                    <div
                    key={index}
                    className={`flex flex-col items-center p-4 border-2 border-black dark:border-custom-orange rounded-xl bg-custom-orange dark:bg-black transition-transform ease-in-out duration-500 ${
                        index === 4
                        ? " hover:scale-110 m-[-2rem] z-50"
                        : " hover:scale-105 m-1"
                    }`}
                    style={{ width: '300px' }}
                    >
                        {index === 4 && (
                            <div className="py-1 px-2 bg-black dark:bg-custom-orange text-custom-orange dark:text-black rounded-lg mt-[-2rem] uppercase">Complete</div>
                        )}
                    <h1 className={`font-bold ${
                        index === 4
                        ? "text-6xl"
                        : "text-5xl"
                    }`}>{service.title}</h1>
                    <div className="font-bold text-6xl mt-4">{service.price}</div>
                    <ul className="list-disc">
                        {service.description.map((desc, descIndex) => (
                        <li key={descIndex} className="text-2xl mt-6 w-40 break-words">
                            {desc}
                        </li>
                        ))}
                    </ul>
                    </div>
                ))}

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