import { useState } from 'react';

export default function Configuracion({ setVista, plan }) {
  const [iconoPreview, setIconoPreview] = useState(null);

  if (!plan) {
    setVista('planes');
    return null;
  }

  const handleImagenSeleccionada = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIconoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <main className="p-8 max-w-3xl mx-auto mt-10 flex-grow w-full text-white">
      <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-xl">
        
        <div className="flex items-center gap-6 mb-8 border-b border-gray-700 pb-6">
          <img src={plan.imagen} alt={plan.nombre} className="w-16 h-16 object-contain" />
          <div>
            <h2 className="text-2xl font-bold text-green-400">Configurando: {plan.nombre}</h2>
            <p className="text-gray-400">{plan.ram} RAM • ${plan.precio}/mes</p>
          </div>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setVista('pago'); }}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Nombre del Servidor</label>
              <input type="text" required placeholder="Ej. Mi Mundo Survival" className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-green-500 transition outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Dominio Personalizado</label>
              <div className="flex">
                <input type="text" required placeholder="survival" className="w-full bg-gray-900 border border-gray-700 rounded-l-lg p-3 text-white focus:border-green-500 transition outline-none text-right" />
                <span className="bg-gray-700 border border-gray-700 border-l-0 rounded-r-lg p-3 text-gray-400 font-mono text-sm flex items-center">
                  .minehosting.com
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Entorno del Servidor</label>
            <div className="flex gap-4">
              <label className="flex-1 bg-gray-900 border border-gray-700 rounded-lg p-3 flex items-center gap-3 cursor-pointer hover:border-green-500 transition">
                <input type="radio" name="entorno" value="java" defaultChecked className="accent-green-500 w-5 h-5" />
                <span className="font-semibold">Java Edition (PC)</span>
              </label>
              <label className="flex-1 bg-gray-900 border border-gray-700 rounded-lg p-3 flex items-center gap-3 cursor-pointer hover:border-green-500 transition">
                <input type="radio" name="entorno" value="bedrock" className="accent-green-500 w-5 h-5" />
                <span className="font-semibold">Bedrock (Móvil/Consola)</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Ubicación del Data Center</label>
            <select className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-green-500 transition outline-none appearance-none cursor-pointer">
              <option value="lima">🟢 América del Sur (Lima) - Ping est.: ~25ms</option>
              <option value="miami">🟡 América del Norte (Miami) - Ping est.: ~110ms</option>
              <option value="frankfurt">🔴 Europa (Frankfurt) - Ping est.: ~230ms</option>
            </select>
            <p className="text-xs text-gray-500 mt-2">* El ping estimado se calcula en base a tu conexión actual.</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Icono del Servidor (Opcional)</label>
            <div className="flex items-center gap-4">
              {iconoPreview ? (
                <img src={iconoPreview} alt="Vista previa" className="w-16 h-16 rounded-lg object-cover border border-gray-600" />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-gray-900 border border-dashed border-gray-600 flex items-center justify-center text-gray-500 text-xs text-center p-1">
                  64x64
                </div>
              )}
              
              <input 
                type="file" 
                accept="image/png, image/jpeg" 
                onChange={handleImagenSeleccionada}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-700 file:text-white hover:file:bg-gray-600 transition cursor-pointer" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Motd (Mensaje del día)</label>
            <textarea rows="2" placeholder="¡Bienvenidos al mejor servidor survival!" className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-green-500 transition outline-none resize-none"></textarea>
          </div>

          <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition duration-300 shadow-lg shadow-green-500/20 mt-4 text-lg cursor-pointer">
            Guardar Cambios y Proceder al Pago 💳
          </button>

        </form>
      </div>
    </main>
  );
}