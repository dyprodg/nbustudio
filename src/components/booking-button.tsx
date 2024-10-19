import Link from "next/link"
export default function BookingButton() {
    return(
        <div className='w-[380px] md:w-full relative z-10'>
                    <div className="p-10">
                        <div className="text-3xl font-bold text-center uppercase"> 
                            Buchen Sie Ihre Sitzung noch heute und erleben Sie den Unterschied eines professionellen Studios.
                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                        <Link 
                            href={'/kontakt'}
                            className='text-custom-orange dark:text-black bg-black dark:bg-custom-orange text-4xl m-6 hover:scale-110 transition ease-in-out duration-200 animate-bounce uppercase p-4 rounded-full'
                        >
                            Buchen
                        </Link> 
                    </div>
                </div>
    )
}