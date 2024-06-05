'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FlipWords } from './ui/flip-words';
import Link from 'next/link';

const LandingBody: React.FC = () => {
  const words = ["Studio Aufnahmen", "Mixing", "Mastering"];

  return (
    <motion.div 
      className={`min-h-screen dark:bg-black dark:text-custom-orange bg-custom-orange text-black`}
      >
      <motion.div
        initial={{ opacity: 0, y: 300 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3.3}}
        className="flex flex-col items-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold p-4 text-center">Ihr <span className='text-custom-orange uppercase dark:text-black bg-black dark:bg-custom-orange'>Tonstudio</span>  in der Schweiz für erstklassige Aufnahmen</h1>
      </motion.div>
      <motion.div
        className='flex justify-center items-center p-10 object-contain w-full h-40 md:h-[400px]  overflow-hidden'
        initial={{ opacity: 0, y: 300 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3.3}}
      >
        <Image src="/fullstudio-wide.jpeg" alt="Studio" width={1000} height={800} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 300 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3.3}}
        className="p-10"
      >
        <div className="text-3xl md:text-4xl font-bold text-center">
          Unsere <span className='text-custom-orange dark:text-black bg-black dark:bg-custom-orange'>hochmodernen </span>Einrichtungen bieten die perfekte Umgebung für Ihr nächstes Projekt.
        </div>
      </motion.div>

      <motion.div 
        className='w-full flex justify-center'
        initial={{ opacity: 0, y: 300 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3.3}}
      >
        <div className="text-5xl mx-auto text-center font-normal text-black dark:text-custom-orange">
          Du benötigst <br />
          <FlipWords className='font-bold bg-black dark:bg-custom-orange text-custom-orange dark:text-black' words={words} /> 
          ?
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 300 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3.3}}
        className="p-10"
      >
        <div className="text-3xl font-bold text-center">
          <Link 
            href={'/kontakt'}
            className='text-custom-orange dark:text-black bg-black dark:bg-custom-orange'
            >Buchen</Link> 
          Sie Ihre Sitzung noch heute und erleben Sie den Unterschied eines <span className='font-bold text-custom-orange dark:text-black bg-black dark:bg-custom-orange'>professionellen Studios</span>.
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 300 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3.3}}
        className="w-full flex justify-center "
      >
      <Link 
            href={'/kontakt'}
            className='text-custom-orange dark:text-black bg-black dark:bg-custom-orange text-4xl m-6 hover:scale-110 transition ease-in-out duration-200 animate-bounce'
            >Buchen</Link> 
      </motion.div>
    </motion.div>
  );
};

export default LandingBody;
