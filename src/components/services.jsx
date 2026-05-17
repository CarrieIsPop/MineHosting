import steveImg from '../assets/steve.jpg';
import creeperImg from '../assets/creeper.jpg';
import enderImg from '../assets/ender.png';

export default function Services({ setVista, setPlanSeleccionado }) {
  const planes = [
    { id: 1, nombre: "Plan Steve", ram: "2 GB", precio: "4.99", desc: "Ideal para jugar con amigos", imagen: steveImg },
    { id: 2, nombre: "Plan Creeper", ram: "4 GB", precio: "8.99", desc: "Para servidores con mods básicos", imagen: creeperImg },
    { id: 3, nombre: "Plan Ender", ram: "8 GB", precio: "15.99", desc: "Comunidades grandes y modpacks", imagen: enderImg },
  ];

  return (
    <main className="p-8 max-w-6xl mx-auto mt-10 flex-grow w-full">
      <div className="text-center mb-12 text-white">
        <h2 className="text-4xl font-extrabold mb-2">Nuestros Planes de Hosting</h2>
        <p className="text-gray-400">Elige el plan perfecto para tu comunidad</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {planes.map((plan) => (
          <div key={plan.id} className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-green-500 transition shadow-xl text-center flex flex-col text-white">
            <img src={plan.imagen} alt={`Avatar de ${plan.nombre}`} className="w-24 h-24 mx-auto mb-4 object-contain drop-shadow-md" />
            <h3 className="text-3xl font-bold text-green-400 mb-2">{plan.nombre}</h3>
            <p className="text-gray-400 mb-6">{plan.desc}</p>
            <div className="text-4xl font-extrabold mb-6">${plan.precio} <span className="text-lg text-gray-500 font-normal">/mes</span></div>
            <ul className="text-left text-gray-300 mb-8 space-y-3 flex-1">
              <li>✔️ {plan.ram} de RAM</li>
              <li>✔️ Slots Ilimitados</li>
              <li>✔️ Soporte Spigot/Paper</li>
            </ul>
            
            {/* 2. Modificamos este botón */}
            <button 
              onClick={() => {
                setPlanSeleccionado(plan);
                setVista('configuracion');
              }}
              className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-lg w-full transition duration-300 shadow-lg shadow-green-500/30 cursor-pointer"
            >
              Configurar Servidor ⚙️
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}