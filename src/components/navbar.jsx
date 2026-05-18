import { useState } from 'react';

export default function Navbar({ setVista }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const irA = (vista) => {
    setVista(vista);
    setMenuAbierto(false);
  };

  return (
    <header className="bg-gray-800 p-4 md:p-5 shadow-lg flex justify-between items-center border-b border-gray-700 relative">
      
      <h1 
        onClick={() => irA('inicio')} 
        className="text-xl md:text-2xl font-bold text-green-500 tracking-wider cursor-pointer"
      >
        ⛏️ MineHosting
      </h1>

      <nav className="hidden md:block">
        <ul className="flex gap-6 font-semibold text-white text-base">
          <li onClick={() => irA('inicio')} className="hover:text-green-400 cursor-pointer transition">Inicio</li>
          <li onClick={() => irA('planes')} className="hover:text-green-400 cursor-pointer transition">Planes</li>
          <li onClick={() => irA('contacto')} className="hover:text-green-400 cursor-pointer transition">Contacto</li>
        </ul>
      </nav>

      <button 
        onClick={() => setMenuAbierto(!menuAbierto)} 
        className="md:hidden text-white text-2xl z-50 focus:outline-none relative cursor-pointer"
      >
        {menuAbierto ? '✕' : '☰'}
      </button>

      <div className={`fixed top-0 right-0 h-full w-64 bg-gray-900 border-l border-gray-700 transform transition-transform duration-300 ease-in-out z-40 pt-24 px-6 ${menuAbierto ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <ul className="flex flex-col gap-6 font-semibold text-white text-lg">
          <li onClick={() => irA('inicio')} className="hover:text-green-400 cursor-pointer transition border-b border-gray-700 pb-3">Inicio</li>
          <li onClick={() => irA('planes')} className="hover:text-green-400 cursor-pointer transition border-b border-gray-700 pb-3">Planes</li>
          <li onClick={() => irA('contacto')} className="hover:text-green-400 cursor-pointer transition border-b border-gray-700 pb-3">Contacto</li>
        </ul>
      </div>
      
      {menuAbierto && (
        <div onClick={() => setMenuAbierto(false)} className="fixed inset-0 bg-black/60 z-30 md:hidden"></div>
      )}
    </header>
  );
}