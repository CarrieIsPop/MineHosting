import { useState } from 'react';

export default function Contact() {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`¡Mensaje enviado con éxito!\nCorreo: ${email}\nMensaje: ${mensaje}`);
    setEmail('');
    setMensaje('');
  };

  return (
    <main className="p-8 max-w-4xl mx-auto mt-10 flex-grow w-full text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-6">
        
        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-xl">
          <h2 className="text-3xl font-bold text-green-400 mb-2">Contáctanos</h2>
          <p className="text-gray-400 mb-6 text-sm">¿Tienes alguna duda con tu servidor? Escríbenos.</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Tu Correo Electrónico</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="steve@minecraft.com"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-green-500 transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Mensaje</label>
              <textarea 
                rows="4"
                required
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Hola, me gustaría saber si el Plan Creeper soporta el modpack de Pixelmon..."
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-green-500 transition resize-none"
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg transition duration-300 shadow-lg shadow-green-500/20 cursor-pointer"
            >
              Enviar Mensaje ✉️
            </button>
          </form>
        </div>

        <div className="flex flex-col justify-center bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50 text-center md:text-left">
          <h3 className="text-2xl font-bold text-white mb-4">Nuestras Redes</h3>
          <p className="text-gray-400 mb-8">
            Síguenos en nuestras plataformas oficiales para enterarte de sorteos de servidores, actualizaciones y cupones de descuento.
          </p>
          
          <div className="flex flex-col gap-4 max-w-xs mx-auto md:mx-0">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/30 p-4 rounded-xl transition text-white font-semibold">
              <svg className="w-6 h-6 fill-[#1877F2]" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </a>

            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-[#E1306C]/10 hover:bg-[#E1306C]/20 border border-[#E1306C]/30 p-4 rounded-xl transition text-white font-semibold">
              <svg className="w-6 h-6 fill-[#E1306C]" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              Instagram
            </a>

            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-[#FF0000]/10 hover:bg-[#FF0000]/20 border border-[#FF0000]/30 p-4 rounded-xl transition text-white font-semibold">
              <svg className="w-6 h-6 fill-[#FF0000]" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              YouTube
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}