export default function Home({ setVista }) {
  return (
    <main className="p-4 md:p-8 max-w-4xl mx-auto mt-10 md:mt-16 text-center flex-grow flex flex-col justify-center items-center text-white">
      
      <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent leading-tight">
        Bienvenidos a MineHosting
      </h2>
      
      <p className="text-gray-400 text-base md:text-xl max-w-2xl mb-10 leading-relaxed px-4 md:px-0">
        La plataforma de alojamiento de servidores de Minecraft más rápida y segura del mercado. 
        Crea tu propio mundo con amigos, instala mods de forma instantánea y gestiona 
        todo desde un panel intuitivo, con soporte avanzado para pagos descentralizados.
      </p>
      
      <button 
        onClick={() => setVista('planes')}
        className="bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-xl transition duration-300 shadow-lg shadow-green-500/20 text-base md:text-lg cursor-pointer w-full md:w-auto"
      >
        Ver Planes Disponibles 🚀
      </button>
    </main>
  );
}