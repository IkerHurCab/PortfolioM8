import { useState } from 'react'
import { useEffect } from 'react'
import Carrousel1 from './assets/carrusel1.png'
import Carrousel2 from './assets/carrusel2.png'
import jsPDF from 'jspdf'

const API_URL = 'http://192.168.1.54/api/getCV';

const images = [
  Carrousel1,
  Carrousel2,
  Carrousel2,
];

function generatePDF() {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("Curriculum Vitae", 20, 20);

  doc.setFontSize(16);
  doc.text("IKER HURTADO", 20, 40);
  doc.text("Desarrollador de Aplicaciones Web", 20, 50);
  doc.text("LinkedIn: linkedin.com/in/iker-hurtado-caballo", 20, 60);
  doc.text("Email: ikerhurtadocaballo@gmail.com", 20, 70);
  doc.text("Teléfono: +34 689 03 93 36", 20, 80);

  doc.setFontSize(14);
  doc.text("SOBRE MÍ", 20, 100);
  doc.setFontSize(12);
  const aboutMe = `Estudiante de Desarrollo Web y entusiasta del mundo de la informática que busca iniciar una trayectoria laboral y crecer como persona.
  Me considero una persona con capacidad de detectar oportunidades y actuar acorde a ellas, hábil y con ganas de superarme en todo lo que me proponen.`;
  const aboutMeLines = doc.splitTextToSize(aboutMe, 170);
  doc.text(aboutMeLines, 20, 110);

  doc.setFontSize(14);
  doc.text("FORMACIÓN ACADÉMICA", 20, 160);
  doc.setFontSize(12);
  doc.text("Grado superior en Desarrollo de Aplicaciones Web (cursando)", 20, 170);
  doc.text("Institución: Centro de estudios Monlau", 20, 180);
  doc.text("Bachillerato de ciencias y tecnología", 20, 190);
  doc.text("Institución: Escola Gravi SCCL", 20, 200);

  doc.setFontSize(14);
  doc.text("EXPERIENCIA LABORAL", 20, 220);
  doc.setFontSize(12);
  doc.text("Avannubo (octubre 2024 - actualidad)", 20, 230);
  doc.text("Desarrollador Web", 20, 240);

  doc.setFontSize(14);
  doc.text("LICENCIAS Y CERTIFICACIONES", 20, 260);
  doc.setFontSize(12);
  doc.text("Conceptos Fundamentales SQL Oracle 11g", 20, 270);
  doc.text("Oracle - Junio 2024", 20, 280);
  doc.text("Programación PL/SQL Oracle 11g", 20, 290);
  doc.text("Oracle - Junio 2024", 20, 300);
  doc.text("Java SE Fundamentals", 20, 310);
  doc.text("Oracle - Junio 2024", 20, 320);

  doc.setFontSize(14);
  doc.text("APTITUDES", 20, 340);
  doc.setFontSize(12);
  doc.text("Frontend: HTML, CSS, JS, Tailwind CSS, Bootstrap, React", 20, 350);
  doc.text("Backend: Java, PHP, Python, C++, Laravel", 20, 360);
  doc.text("Gestión de datos: MySQL, Oracle SQL, Oracle PL/SQL, PostgreSQL", 20, 370);

  doc.setFontSize(14);
  doc.text("IDIOMAS", 20, 380);
  doc.setFontSize(12);
  doc.text("Español: Nativo", 20, 390);
  doc.text("Catalán: Nativo", 20, 400);
  doc.text("Inglés: B2", 20, 410);

  doc.save("cv.pdf");
}


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

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [CV, setCV] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}`)
      .then(res => res.json())
      .then(data => setCV(data))
      .catch(error => console.error("Error al obtener datos:", error));
  }, []);

  if (!CV) return <div>Cargando...</div>;

  return (
    <main className="text-gray-600 flex flex-col h-screen bg-white w-full">
      <header className="flex justify-between p-6 border-b border-gray-300 sticky top-0 z-50 items-center w-full bg-white">
        <div className="flex gap-4 flex-col lg:flex-row">
          <p>
            <a href="/contact" className="flex items-center gap-2 font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
              </svg>
              {CV.email}
            </a>
          </p>
          <p className="flex items-center gap-2 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
              <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clip-rule="evenodd" />
            </svg>
            {CV.phone_number}
          </p>
        </div>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
          </svg>
        </button>
        <ul className={`flex gap-4 md:flex ${menuOpen ? 'flex' : 'hidden'} md:flex-row flex-col`}>
          <li><a href="/" className="flex items-center gap-2">Inicio</a></li>
          <li>            <a onClick={generatePDF} className="flex items-center gap-2 hover:cursor-pointer">
            Currículum
          </a></li>
          <li><a href="/projects" className="flex items-center gap-2">Proyectos</a></li>
        </ul>
      </header>

      <div className="flex flex-1 w-full">
        <div className='lg:min-w-48 h-full'>
          <nav className='flex flex-col justify-center items-center h-full'>
            <a href="https://www.linkedin.com/in/iker-hurtado-caballo/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.7065 3H4.34844C3.62264 3 3.04199 3.58065 3.04199 4.30645V19.6935C3.04199 20.3903 3.62264 21 4.34844 21H19.6485C20.3743 21 20.9549 20.4194 20.9549 19.6935V4.27742C21.013 3.58065 20.4323 3 19.7065 3ZM8.35491 18.3H5.71297V9.73548H8.35491V18.3ZM7.01942 8.54516C6.14846 8.54516 5.4807 7.84839 5.4807 7.00645C5.4807 6.16452 6.17749 5.46774 7.01942 5.46774C7.86136 5.46774 8.55813 6.16452 8.55813 7.00645C8.55813 7.84839 7.91942 8.54516 7.01942 8.54516ZM18.371 18.3H15.7291V14.1484C15.7291 13.1613 15.7001 11.8548 14.3356 11.8548C12.942 11.8548 12.7388 12.9581 12.7388 14.0613V18.3H10.0968V9.73548H12.6807V10.9258H12.7097C13.0872 10.229 13.9291 9.53226 15.2356 9.53226C17.9356 9.53226 18.4291 11.2742 18.4291 13.6548V18.3H18.371Z" fill="#323544" />
              </svg>
            </a>
            <a href="https://github.com/ikerhurcab" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.24902C6.51613 2.24902 2 6.70064 2 12.249C2 16.6361 4.87097 20.3781 8.87097 21.7329C9.3871 21.8297 9.54839 21.5071 9.54839 21.2813C9.54839 21.0555 9.54839 20.4103 9.51613 19.5393C6.74194 20.1845 6.16129 18.1845 6.16129 18.1845C5.70968 17.0555 5.03226 16.7329 5.03226 16.7329C4.12903 16.0877 5.06452 16.0877 5.06452 16.0877C6.06452 16.12 6.6129 17.12 6.6129 17.12C7.48387 18.6684 8.96774 18.2168 9.51613 17.9264C9.6129 17.2813 9.87097 16.8297 10.1613 16.5716C7.96774 16.3458 5.6129 15.4748 5.6129 11.6684C5.6129 10.5716 6.03226 9.70064 6.64516 9.02322C6.54839 8.79741 6.19355 7.76515 6.74194 6.37806C6.74194 6.37806 7.6129 6.11999 9.51613 7.41031C10.3226 7.18451 11.1613 7.05548 12.0323 7.05548C12.9032 7.05548 13.7742 7.15225 14.5484 7.41031C16.4516 6.15225 17.2903 6.37806 17.2903 6.37806C17.8387 7.73289 17.5161 8.79741 17.3871 9.02322C18.0323 9.70064 18.4194 10.6039 18.4194 11.6684C18.4194 15.4748 16.0645 16.3458 13.871 16.5716C14.2258 16.8942 14.5484 17.5393 14.5484 18.4426C14.5484 19.7974 14.5161 20.8619 14.5161 21.1845C14.5161 21.4426 14.7097 21.7329 15.1935 21.6361C19.129 20.3135 22 16.6039 22 12.1845C21.9677 6.70064 17.4839 2.24902 12 2.24902Z" fill="#323544" />
              </svg>
            </a>
          </nav>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex justify-around items-center h-full w-full flex-col xl:flex-row">
            <div className='p-4 flex flex-col justify-center '>
              <h1 className="text-6xl font-bold">{CV.name}</h1>
              <h2 className='font-bold text-2xl'>{CV.profession}</h2>
              <p className="mt-6 text-justify max-w-96 text-xl">{CV.experience}</p>
              <p>
                <a href="/about">
                  <button className="mt-4 px-6 py-2 bg-red-500 text-white font-semibold rounded-full shadow-md hover:bg-red-700 hover:cursor-pointer">
                    ¡Descubre más sobre mí!
                  </button>
                </a>
              </p>
            </div>
            <ImageCarousel />
          </div>
        </div>
      </div>
    </main>
  )
}

