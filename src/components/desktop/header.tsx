'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import './service.css';
import FlybyText from '../flighbytext';
import { motion } from 'framer-motion';
import Cross from '../cross';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
    useEffect(() => {
        // Animation for header sections
        const headerSections = gsap.utils.toArray('.header-section');

        gsap.set(headerSections, { y: 800, x: -800, opacity: 0 });

        gsap.to(headerSections, {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.header-container',
                start: 'top center+=150',
                end: 'center center',
                scrub: true,
                markers: true,
            },
        });

        // Animation for services
        const services = gsap.utils.toArray('.service');

        gsap.set(services, { x: 400, opacity: 0 });

        gsap.to(services, {
            x: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.services-wrapper',
                start: 'top-=50 top',
                end: '+=500',
                scrub: true,
                pin: true,
                markers: false,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const services = [
        {
            title: 'Cover Design',
            price: '25CHF',
            description: [
                `Individuelle Gestaltung des Coverdesigns`,
                `1x Anpassung inklusive`,
            ]
        },
        {
            title: 'Beratung',
            price: '0CHF',
            description: [
                `Kostenfreie Beratung`,
                `Unverbindlich und vor Ort`,
            ]
        },
        {
            title: 'Recording',
            price: '150CHF',
            description: [
                `Professionelle Aufnahme von Vocals`,
                `Verwendung von hochwertigem analogem Equipment`,
            ]
        },
        {
            title: 'Mixing && Mastering',
            price: '350CHF',
            description: [
                `Session Mixing mit hochwertigen, moderen Plugins`,
                `Mastering Ihres Songs für optimale Klangqualität auf alle digitalen Plattformen`,
            ]
        },
        {
            title: 'Complete',
            price: '500CHF',
            description: [
                `Recording, Mixing && Mastering`,
                `Das Rundum-Sorglos-Paket für Ihre Songproduktion`,
            ]
        },
        {
            title: 'Mastering',
            price: '200CHF',
            description: [
                `Mastering Ihres Songs für optimale Klangqualität auf alle digitalen Plattformen`,
                `Der gemasterte Song wird im WAV-Format geliefert`,
            ]
        }
    ];

    return (
        <div className="w-full flex flex-col items-center">
            {/* Landing Header Section */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className='h-[40rem] object-contain overflow-hidden justify-center items-center flex relative z-0'>
                <Image src={'/studio.jpeg'} width={1920} height={1080} alt='Nbu Studio'/>
            </motion.div>
            <div className='header-container flex flex-col items-center w-full'>
                <div className="text-center">
                    <FlybyText text='Nbu Studio' className='text-5xl lg:text-[8rem] font-bold uppercase bg-custom-orange dark:bg-black p-6 rounded-full mt-[-17rem] md:mt-[-8rem] lg:mt-[-12rem] relative z-20' />
                </div>
                <div className='flex flex-col md:flex-row w-full justify-between'>
                    <div className="header-section mt-20 md:ml-auto lg:ml-20 text-center">
                        <h2 className="header-title text-4xl font-bold">Professionelle</h2>
                        <h2 className="header-title text-6xl font-bold uppercase">Aufnahmen</h2>
                    </div>
                    <div className="header-section m-20 text-center">
                        <h2 className="header-title text-4xl font-bold">Modernes</h2>
                        <h2 className="header-title text-6xl font-bold uppercase">Equipment</h2>
                    </div>
                </div>
                <div className="header-section md:mt-[2rem] text-center w-full">
                    <h2 className="header-title text-5xl md:text-7xl uppercase">Ihr Schweizer</h2>
                    <p className="header-content text-7xl md:text-[8rem] lg:text-[10rem] font-bold uppercase">Tonstudio</p>
                </div>
                <div className='bg-custom-orange rounded-full p-20 mt-20 md:mt-10  header-section'>
                    <Cross size={400} color='black' />
                </div>
            </div>

            {/* Services Section */}
            <div className="w-full flex flex-col">
                <div className='w-full text-center text-5xl font-bold mt-[6rem]'>
                    <h1>Unsere Leistungen</h1>
                </div>
               
                <div className="services-wrapper w-full mt-[-2rem]">
                <div className="services-container ml-0 lg:ml-[20px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                    {services.map((service, index) => (
                        <div
                            className={`service m-2 lg:m-[-1rem] ${
                                index === 4 ? 'h-[50vh] lg:h-[75vh]' : 'h-[50vh] lg:h-[70vh]'
                            }`}
                            key={index}
                        >
                            {index === 4 && <div className="service-plate">complete</div>}
                            <div className={`h-[100%] ${index === 4 ? 'mt-[4.5rem]' : 'mt-[3rem]'}`}>
                                <div className="h-[50%]">
                                    <h2 className="service-title">{service.title}</h2>
                                    <p className="service-price">{service.price}</p>
                                </div>
                                <div>
                                    <ul className="service-description">
                                        <li>{service.description[0]}</li>
                                        <li>{service.description[1]}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>


                <div className='h-[60vh]'>
                </div>
                <div className=''>
                    <div className="p-10">
                        <div className="text-3xl font-bold text-center uppercase">
                            <Link 
                                href={'/kontakt'}
                                className='text-custom-orange dark:text-black bg-black dark:bg-custom-orange'
                            >
                                Buchen
                            </Link> 
                            Sie Ihre Sitzung noch heute und erleben Sie den Unterschied eines <span className='font-bold text-custom-orange dark:text-black bg-black dark:bg-custom-orange'>professionellen Studios</span>.
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
            </div>
        </div>
    );
}
