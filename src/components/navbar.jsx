export default function Navbar({ setVista }) {
  return (
    <header className="bg-gray-800 p-5 shadow-lg flex justify-between items-center border-b border-gray-700">
      <h1 
        onClick={() => setVista('inicio')} 
        className="text-2xl font-bold text-green-500 tracking-wider cursor-pointer"
      >
        ⛏️ MineHosting
      </h1>
      <nav>
        <ul className="flex gap-6 font-semibold text-white">
          <li onClick={() => setVista('inicio')} className="hover:text-green-400 cursor-pointer transition">Inicio</li>
          <li onClick={() => setVista('planes')} className="hover:text-green-400 cursor-pointer transition">Planes</li>
          
          <li onClick={() => setVista('contacto')} className="hover:text-green-400 cursor-pointer transition">Contacto</li>
        </ul>
      </nav>
    </header>
  );
}