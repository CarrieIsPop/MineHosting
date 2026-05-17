export default function Home({ setVista }) {
  return (
    <main className="p-8 max-w-4xl mx-auto mt-16 text-center flex-grow flex flex-col justify-center items-center text-white">
      <h2 className="text-6xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
        Bienvenidos a MineHosting
      </h2>
      <p className="text-gray-400 text-xl max-w-2xl mb-10 leading-relaxed">
        La plataforma de alojamiento de servidores de Minecraft más rápida y segura del mercado. 
        Crea tu propio mundo con amigos, instala mods de forma instantánea y gestiona 
        todo desde un panel intuitivo, con soporte avanzado para pagos descentralizados.
      </p>
      
      {/* Este botón también cambia el estado para llevarte a los planes */}
      <button 
        onClick={() => setVista('planes')}
        className="bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-xl transition duration-300 shadow-lg shadow-green-500/20 text-lg cursor-pointer"
      >
        Ver Planes Disponibles 🚀
      </button>
    </main>
  );
}