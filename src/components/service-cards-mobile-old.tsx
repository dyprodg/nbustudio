'use client';
import { useRef } from 'react';
import { motion,useInView } from 'framer-motion';

function ServiceCardMobileOld() {

    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0})
    const ref2 = useRef(null)
    const isInView2 = useInView(ref2, { once: true, amount: 0.1})
    const ref3 = useRef(null)
    const isInView3 = useInView(ref3, { once: true, amount: 0.1})
    const ref4 = useRef(null)
    const isInView4 = useInView(ref4, { once: true, amount: 0.1})

    return (
        <div className='flex flex-col'>
            <div className="grid w-full min-h-screen grid-cols-1 md:grid-cols-2">
                <motion.div 
                    ref={ref}
                    initial={{ opacity: 0, y: 300 }}
                    animate={isInView ? { opacity: 1, y: 0} : 'hidden'}
                    transition={{ duration: 1, type: 'spring', stiffness: 20 }}
                    className="flex flex-col items-center m-10 bg-black text-custom-orange dark:bg-custom-orange dark:text-black text-center p-6 rounded-xl shadow-2xl justify-center">
                    <h3 className="text-3xl xl:text-6xl">Mixing</h3>
                    <p className="text-2xl xl:text-3xl mt-5">Unser Mixing-Service verbessert die Klangqualität Ihrer Aufnahmen und bringt Ihre Musik auf das nächste Level.</p>
                    <p className='mt-6 text-xs'>350 CHF pro Song</p>
                </motion.div>
                <motion.div 
                    ref={ref2}
                    initial={{ opacity: 0, y: 300 }}
                    animate={isInView2 ? { opacity: 1, y: 0} : 'hidden'}
                    transition={{ duration: 1, type: 'spring', stiffness: 20 }}
                    className="flex flex-col items-center m-10 bg-black text-custom-orange dark:bg-custom-orange dark:text-black text-center p-6 rounded-xl shadow-2xl justify-center">
                    <h3 className="text-3xl xl:text-6xl">Mastering</h3>
                    <p className="text-2xl xl:text-3xl mt-5">Unser Mastering-Service sorgt für den letzten Feinschliff und stellt sicher, dass Ihre Musik auf allen Plattformen gut klingt.</p>
                    <p className='mt-6 text-xs'>250 CHF pro Song</p>
                </motion.div>
                <motion.div 
                    ref={ref3}
                    initial={{ opacity: 0, y: 300 }}
                    animate={isInView3 ? { opacity: 1, y: 0} : 'hidden'}
                    transition={{ duration: 1, type: 'spring', stiffness: 20 }}
                    className="flex flex-col items-center m-10 bg-black text-custom-orange dark:bg-custom-orange dark:text-black text-center p-6 rounded-xl shadow-2xl justify-center">
                    <h3 className="text-3xl xl:text-6xl">Recording</h3>
                    <p className="text-2xl xl:text-3xl mt-5">Unser Recording-Service bietet Ihnen eine professionelle Umgebung und modernste Technik für Ihre Aufnahmen.</p>
                    <p className='mt-6 text-xs'>100 CHF pro Stunde</p>
                </motion.div>
                <motion.div 
                    ref={ref4}
                    initial={{ opacity: 0, y: 300 }}
                    animate={isInView4 ? { opacity: 1, y: 0} : 'hidden'}
                    transition={{ duration: 1, type: 'spring', stiffness: 20 }}
                    className="flex flex-col items-center m-10 bg-black text-custom-orange dark:bg-custom-orange dark:text-black text-center p-6 rounded-xl shadow-2xl justify-center">
                    <h3 className="text-3xl xl:text-6xl">Production</h3>
                    <p className="text-2xl xl:text-3xl mt-5">Unser Production-Service unterstützt Sie bei der Erstellung und Bearbeitung Ihrer Musikprojekte mit kreativen Ideen und technischem Know-how.</p>
                    <p className='mt-6 text-xs'>Preis auf Anfrage</p>
                </motion.div>
            </div>
        </div>
    )
}
