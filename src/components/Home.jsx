import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import Layout from '../layouts/Layout';


const images = [
    `../assets/carrusel1.png`,
    `../assets//storage/carrusel2.png`,
    `../assets//storage/carrusel2.png`,
];

function ImageCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
                setFade(true);
            }, 200);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="carousel relative">
            <img
                src={images[currentIndex]}
                alt="carousel"
                className={`h-auto w-100 xl:w-240 sm:max-w-240 transition-opacity duration-500 border-4 ${fade ? 'opacity-100' : 'opacity-0'}`}
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-gray-200 p-2 border rounded-full">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`h-2 w-2 rounded-full cursor-pointer ${index === currentIndex ? 'bg-red-500' : 'bg-gray-400'}`}
                        onClick={() => {
                            setFade(false);
                            setTimeout(() => {
                                setCurrentIndex(index);
                                setFade(true);
                            }, 200);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <div className="flex justify-around items-center h-full w-full flex-col xl:flex-row">
            <div className='p-4 flex flex-col justify-center '>
                <h1 className="text-6xl font-bold">Iker Hurtado</h1>
                <h2 className='font-bold text-2xl'>DESARROLLADOR WEB</h2>
                <p className="mt-6 text-justify max-w-96 text-xl">Estudiante de desarrollo web en Monlau familizarizado con una gran cantidad de lenguajes y frameworks.</p>
                <p className="text-justify max-w-96 text-xl">Apasionado de la programación que busca crecer profesionalmente y aprender cada vez más de este mundo.</p>
                <p>
                    <a href="/about">
                        <button className="mt-4 px-6 py-2 bg-red-500 text-white font-semibold rounded-full shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 hover:cursor-pointer">
                            ¡Descubre más sobre mí!
                        </button>
                    </a>
                </p>
            </div>
            <ImageCarousel />
        </div>
    );
}

Home.layout = page => <Layout children={page} />;




