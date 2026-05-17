import { useState, useEffect } from 'react';

export default function Panel({ plan, config }) {
  const [estado, setEstado] = useState('apagado');
  const [stats, setStats] = useState({ cpu: 0, ram: 0 });

  const planActual = plan || { nombre: "Plan Creeper", ram: "4 GB", precio: "8.99" };
  const ramMax = parseInt(planActual.ram.split(' ')[0]);

  useEffect(() => {
    let intervalo;
    if (estado === 'en_linea') {
      intervalo = setInterval(() => {
        setStats({
          cpu: (Math.random() * (45 - 12) + 12).toFixed(2),
          ram: (Math.random() * (ramMax - 0.5) + 0.5).toFixed(1)
        });
      }, 3000);
    } else {
      setStats({ cpu: 0, ram: 0 });
    }
    return () => clearInterval(intervalo);
  }, [estado, ramMax]);

  const encender = () => {
    if (estado !== 'apagado') return;
    setEstado('iniciando');
    setTimeout(() => setEstado('en_linea'), 3000);
  };

  const apagar = () => setEstado('apagado');
  const reiniciar = () => {
    setEstado('iniciando');
    setTimeout(() => setEstado('en_linea'), 4000);
  };

  return (
    <div className="flex h-screen text-gray-300 w-full overflow-hidden">
      
      <aside className="w-1/4 max-w-[280px] bg-[#1a1e27] border-r border-gray-800 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-extrabold text-white tracking-wider flex items-center gap-2">
            ⛏️ MineHosting
          </h1>
        </div>

        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-4 h-4 rounded-sm ${estado === 'en_linea' ? 'bg-green-500' : estado === 'iniciando' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'}`}></div>
            <h2 className="text-xl font-bold text-white truncate">{config?.nombre || 'Mi Servidor'}</h2>
          </div>
          <p className="text-xs text-gray-400 truncate break-all block w-full border-b border-gray-700 pb-4 mb-4">
            🌍 {config?.dominio || 'play.minehosting.com'}
          </p>

          <div className="flex gap-2">
            <button onClick={encender} className="flex-1 bg-green-700/20 hover:bg-green-600 border border-green-600 text-green-500 hover:text-white py-2 rounded transition flex justify-center cursor-pointer" title="Iniciar">▶️</button>
            <button onClick={reiniciar} className="flex-1 bg-blue-700/20 hover:bg-blue-600 border border-blue-600 text-blue-500 hover:text-white py-2 rounded transition flex justify-center cursor-pointer" title="Reiniciar">🔄</button>
            <button onClick={apagar} className="flex-1 bg-red-700/20 hover:bg-red-600 border border-red-600 text-red-500 hover:text-white py-2 rounded transition flex justify-center cursor-pointer" title="Apagar">⏹️</button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="text-xs font-bold text-gray-500 mb-2 ml-2 tracking-widest mt-2">GENERAL</p>
          <a href="#" className="flex items-center gap-3 px-3 py-2 bg-gray-800 border-l-2 border-yellow-500 text-white rounded-r">
            <span>⊞</span> Panel
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-800/50 rounded transition"><span>&gt;_</span> Consola</a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-800/50 rounded transition"><span>⚙️</span> Configuración</a>
          
          <p className="text-xs font-bold text-gray-500 mb-2 ml-2 tracking-widest mt-6">ADMINISTRACIÓN</p>
          <a href="#" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-800/50 rounded transition"><span>📁</span> Archivos</a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-800/50 rounded transition"><span>🔌</span> Plugins</a>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto bg-[#11151d]">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1a1e27] p-5 rounded-lg border border-gray-800 flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm mb-1">Uso de CPU:</p>
              <p className="text-xl font-mono text-white">{stats.cpu}% <span className="text-sm text-gray-500">/ 200%</span></p>
            </div>
            <div className="bg-yellow-500 p-3 rounded-lg text-black font-bold">⚙️</div>
          </div>
          <div className="bg-[#1a1e27] p-5 rounded-lg border border-gray-800 flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm mb-1">Uso de memoria:</p>
              <p className="text-xl font-mono text-white">{stats.ram} GiB <span className="text-sm text-gray-500">/ {ramMax} GiB</span></p>
            </div>
            <div className="bg-yellow-500 p-3 rounded-lg text-black font-bold">🧠</div>
          </div>
          <div className="bg-[#1a1e27] p-5 rounded-lg border border-gray-800 flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm mb-1">Uso de disco:</p>
              <p className="text-xl font-mono text-white">{estado === 'apagado' ? '0.00' : '987.17'} MiB <span className="text-sm text-gray-500">/ 50 GiB</span></p>
            </div>
            <div className="bg-yellow-500 p-3 rounded-lg text-black font-bold">💾</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="bg-[#1a1e27] rounded-lg border border-gray-800 p-6">
            <h3 className="text-yellow-500 font-bold mb-4 pb-2 border-b border-gray-700">Detalles de SFTP</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 mb-1 block">Dirección del servidor:</label>
                <input type="text" readOnly value="sftp://node1.minehosting.com:2022" className="w-full bg-[#11151d] border border-gray-700 rounded p-2 text-gray-300 font-mono text-sm outline-none cursor-default" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 mb-1 block">Nombre de usuario:</label>
                <input type="text" readOnly value="mh_64482.1e4199fc" className="w-full bg-[#11151d] border border-gray-700 rounded p-2 text-gray-300 font-mono text-sm outline-none cursor-default" />
              </div>
              <div className="bg-[#11151d] p-4 rounded-lg flex justify-between items-center border border-gray-800 mt-4">
                <p className="text-xs text-gray-500 w-2/3">Tu contraseña de SFTP es la misma que la contraseña que usas para acceder a este panel.</p>
                <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded text-sm transition cursor-pointer">Iniciar SFTP</button>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1e27] rounded-lg border border-gray-800 p-6">
            <h3 className="text-yellow-500 font-bold mb-4 pb-2 border-b border-gray-700">Información del servidor</h3>
            <ul className="space-y-4 text-sm divide-y divide-gray-800">
              <li className="flex justify-between pt-2">
                <span className="text-gray-400">Estado:</span>
                <span className={`px-2 py-1 rounded text-xs font-bold text-white ${estado === 'en_linea' ? 'bg-green-600' : estado === 'iniciando' ? 'bg-yellow-600' : 'bg-red-600'}`}>
                  {estado === 'en_linea' ? 'En línea' : estado === 'iniciando' ? 'Iniciando...' : 'Apagado'}
                </span>
              </li>
              <li className="flex justify-between pt-4"><span className="text-gray-400">Tiempo de actividad:</span><span className="text-white">{estado === 'en_linea' ? '0h 12m 4s' : '-'}</span></li>
              <li className="flex justify-between pt-4"><span className="text-gray-400">Subdominio:</span><span className="text-white">{config?.dominio || 'play.minehosting.com'}</span></li>
              <li className="flex justify-between pt-4"><span className="text-gray-400">IP del servidor:</span><span className="text-white font-mono">192.168.1.50:25565</span></li>
              <li className="flex justify-between pt-4"><span className="text-gray-400">ID del nodo:</span><span className="text-yellow-500 font-mono"># 1e4199fc</span></li>
            </ul>
          </div>

        </div>
      </main>
    </div>
  );
}