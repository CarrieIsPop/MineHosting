import { useState, useEffect } from 'react';

export default function Panel({ plan, config }) {
  const [estado, setEstado] = useState('apagado');
  const [stats, setStats] = useState({ cpu: 0, ram: 0 });
  const [tab, setTab] = useState('panel'); 

  const planActual = plan || { nombre: "Plan Creeper", ram: "4 GB", precio: "8.99" };
  const ramMax = parseInt(planActual.ram.split(' ')[0]);

  useEffect(() => {
    let intervalo;
    if (estado === 'en_linea') {
      intervalo = setInterval(() => {
        setStats({
          cpu: (Math.random() * (35 - 12) + 12).toFixed(2),
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

  const renderContenido = () => {
    if (tab === 'panel') {
      return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#1a1e27] p-5 rounded-lg border border-gray-800 flex justify-between items-center">
              <div><p className="text-gray-400 text-sm mb-1">Uso de CPU:</p><p className="text-xl font-mono text-white">{stats.cpu}% <span className="text-sm text-gray-500">/ 200%</span></p></div>
              <div className="bg-yellow-500 p-3 rounded-lg text-black font-bold">⚙️</div>
            </div>
            <div className="bg-[#1a1e27] p-5 rounded-lg border border-gray-800 flex justify-between items-center">
              <div><p className="text-gray-400 text-sm mb-1">Uso de memoria:</p><p className="text-xl font-mono text-white">{stats.ram} GiB <span className="text-sm text-gray-500">/ {ramMax} GiB</span></p></div>
              <div className="bg-yellow-500 p-3 rounded-lg text-black font-bold">🧠</div>
            </div>
            <div className="bg-[#1a1e27] p-5 rounded-lg border border-gray-800 flex justify-between items-center">
              <div><p className="text-gray-400 text-sm mb-1">Uso de disco:</p><p className="text-xl font-mono text-white">{estado === 'apagado' ? '0.00' : '987.17'} MiB <span className="text-sm text-gray-500">/ 50 GiB</span></p></div>
              <div className="bg-yellow-500 p-3 rounded-lg text-black font-bold">💾</div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#1a1e27] rounded-lg border border-gray-800 p-6">
              <h3 className="text-yellow-500 font-bold mb-4 pb-2 border-b border-gray-700">Detalles de SFTP</h3>
              <div className="space-y-4">
                <div><label className="text-xs font-bold text-gray-400 mb-1 block">Dirección del servidor:</label><input type="text" readOnly value="sftp://node1.minehosting.com:2022" className="w-full bg-[#11151d] border border-gray-700 rounded p-2 text-gray-300 font-mono text-sm outline-none" /></div>
                <div><label className="text-xs font-bold text-gray-400 mb-1 block">Nombre de usuario:</label><input type="text" readOnly value="mh_64482.1e4199fc" className="w-full bg-[#11151d] border border-gray-700 rounded p-2 text-gray-300 font-mono text-sm outline-none" /></div>
                <div className="bg-[#11151d] p-4 rounded-lg flex justify-between items-center border border-gray-800 mt-4">
                  <p className="text-xs text-gray-500 w-2/3">Tu contraseña de SFTP es la misma que usas para acceder a este panel.</p>
                  <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded text-sm transition cursor-pointer">Iniciar SFTP</button>
                </div>
              </div>
            </div>
            <div className="bg-[#1a1e27] rounded-lg border border-gray-800 p-6">
              <h3 className="text-yellow-500 font-bold mb-4 pb-2 border-b border-gray-700">Información del servidor</h3>
              <ul className="space-y-4 text-sm divide-y divide-gray-800">
                <li className="flex justify-between pt-2"><span className="text-gray-400">Estado:</span><span className={`px-2 py-1 rounded text-xs font-bold text-white ${estado === 'en_linea' ? 'bg-green-600' : estado === 'iniciando' ? 'bg-yellow-600' : 'bg-red-600'}`}>{estado === 'en_linea' ? 'En línea' : estado === 'iniciando' ? 'Iniciando...' : 'Apagado'}</span></li>
                <li className="flex justify-between pt-4"><span className="text-gray-400">Tiempo de actividad:</span><span className="text-white">{estado === 'en_linea' ? '0h 12m 4s' : '-'}</span></li>
                <li className="flex justify-between pt-4"><span className="text-gray-400">Subdominio:</span><span className="text-white">{config?.dominio || 'play.minehosting.com'}</span></li>
                <li className="flex justify-between pt-4"><span className="text-gray-400">IP del servidor:</span><span className="text-white font-mono">192.168.1.50:25565</span></li>
                <li className="flex justify-between pt-4"><span className="text-gray-400">ID del nodo:</span><span className="text-yellow-500 font-mono"># 1e4199fc</span></li>
              </ul>
            </div>
          </div>
        </>
      );
    }

    if (tab === 'consola') {
      return (
        <div className="bg-black rounded-lg border border-gray-800 h-[600px] flex flex-col font-mono shadow-2xl">
          <div className="flex-1 p-4 overflow-y-auto text-sm text-gray-300 space-y-1">
            {estado === 'apagado' ? (
              <p className="text-gray-600">Servidor apagado. Presiona iniciar para ver los registros.</p>
            ) : (
              <>
                <p className="text-yellow-500">[21:10:25] [Server thread/INFO] [minecraft/MinecraftServer]: Saving the game (this may take a moment!)</p>
                <p>[21:10:25] [Server thread/INFO] [minecraft/MinecraftServer]: Saved the game</p>
                <p className="text-red-400">[21:13:30] [Server thread/WARN] [minecraft/ServerPlayerGameMode]: Mismatch in destroy block pos</p>
                <p>[21:15:26] [Server thread/INFO] [minecraft/LivingEntity]: Named entity MirrorEntity died: Mirror was shot by {config?.nombre}</p>
                <p>[21:18:24] [Server thread/INFO] [minecraft/MinecraftServer]: Saving the game (this may take a moment!)</p>
                <p className="text-yellow-500">[21:19:38] [Server thread/INFO] [minecraft/MinecraftServer]: {config?.nombre} lost connection: Disconnected</p>
              </>
            )}
          </div>
          <div className="bg-[#1a1e27] p-4 flex items-center gap-3 border-t border-gray-800">
            <span className="text-yellow-500 font-bold">&gt;&gt;</span>
            <input type="text" placeholder="Escribe un comando..." disabled={estado === 'apagado'} className="flex-1 bg-transparent border-none outline-none text-white text-sm" />
            <button className="text-gray-500 hover:text-white transition cursor-pointer">📋</button>
          </div>
        </div>
      );
    }

    if (tab === 'configuracion') {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#1a1e27] rounded-lg border border-gray-800 p-6">
            <h3 className="text-yellow-500 font-bold mb-4 flex items-center gap-2"><span className="text-lg">📄</span> DETALLES DE SFTP</h3>
            <div className="space-y-4">
              <div><label className="text-xs text-gray-400 block mb-1">Dirección del servidor</label><input type="text" readOnly value="sftp://node1.minehosting.com:2022" className="w-full bg-[#11151d] border border-gray-700 rounded p-3 text-gray-300" /></div>
              <div><label className="text-xs text-gray-400 block mb-1">Nombre de usuario</label><input type="text" readOnly value="mh_64482.1e4199fc" className="w-full bg-[#11151d] border border-gray-700 rounded p-3 text-gray-300" /></div>
            </div>
          </div>
          <div className="bg-[#1a1e27] rounded-lg border border-gray-800 p-6">
            <h3 className="text-yellow-500 font-bold mb-4 flex items-center gap-2"><span className="text-lg">✏️</span> CAMBIAR DETALLES</h3>
            <div className="space-y-4">
              <div><label className="text-xs text-gray-400 block mb-1">Nombre del servidor</label><input type="text" defaultValue={config?.nombre} className="w-full bg-[#11151d] border border-gray-700 rounded p-3 text-white focus:border-yellow-500 outline-none" /></div>
              <div><label className="text-xs text-gray-400 block mb-1">Descripción del servidor</label><textarea rows="2" defaultValue="Servidor alojado en MineHosting" className="w-full bg-[#11151d] border border-gray-700 rounded p-3 text-white focus:border-yellow-500 outline-none resize-none"></textarea></div>
              <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-6 rounded float-right cursor-pointer">Guardar</button>
            </div>
          </div>
          <div className="bg-[#1a1e27] rounded-lg border border-gray-800 p-6">
            <h3 className="text-yellow-500 font-bold mb-4 flex items-center gap-2"><span className="text-lg">📍</span> UBICACIÓN</h3>
            <div className="flex justify-between items-center bg-[#11151d] p-4 rounded border border-gray-700 mb-4">
              <span className="text-gray-400">Nodo Principal</span><span className="text-white font-bold">🇺🇸 Virginia - 53</span>
            </div>
            <p className="text-xs text-gray-500">ID: 1e4199fc-5949-42a9-9b8b-a3f2e8421030</p>
          </div>
          <div className="bg-[#1a1e27] rounded-lg border border-gray-800 p-6">
            <h3 className="text-yellow-500 font-bold mb-4 flex items-center gap-2"><span className="text-lg">🔄</span> REINSTALAR SERVIDOR</h3>
            <p className="text-sm text-gray-300 mb-4">Reinstalar tu servidor lo detendrá y luego volverá a ejecutar el script inicial. <span className="text-yellow-500 font-bold">Algunos archivos pueden ser eliminados.</span></p>
            <button className="border border-red-500 hover:bg-red-500/10 text-red-500 font-bold py-2 px-6 rounded transition float-right cursor-pointer">Reinstalar servidor</button>
          </div>
        </div>
      );
    }

    if (tab === 'archivos') {
      return (
        <div className="bg-[#1a1e27] rounded-lg border border-gray-800 flex flex-col h-full shadow-lg">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#1a1e27] rounded-t-lg">
            <span className="text-gray-400 text-sm hidden md:inline">/ inicio / contenedor /</span>
            <input type="text" placeholder="🔍 Buscar" className="bg-[#11151d] border border-gray-700 rounded p-2 text-sm text-white w-full md:w-64 outline-none" />
          </div>
          <div className="grid grid-cols-12 p-4 text-xs font-bold text-gray-500 border-b border-gray-800 uppercase tracking-wider">
            <div className="col-span-8 md:col-span-6">Nombre ↓</div>
            <div className="col-span-4 md:col-span-3 text-right">Tamaño ↓</div>
            <div className="hidden md:block md:col-span-3 text-right">Fecha ↓</div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {[
              { icon: '🗑️', name: 'Papelera', size: '-', date: '-' },
              { icon: '📁', name: 'config', size: '-', date: 'may 8º' },
              { icon: '📁', name: 'logs', size: '-', date: 'hace 9h' },
              { icon: '📁', name: 'mods', size: '-', date: 'may 8º' },
              { icon: '📁', name: 'world', size: '-', date: 'hace 1m' },
              { icon: '📄', name: 'banned.json', size: '2 B', date: 'hace 9h' },
              { icon: '📄', name: 'eula.txt', size: '9 B', date: 'may 8º' },
              { icon: '📄', name: 'server.jar', size: '9.5 KiB', date: 'abr 10º' },
            ].map((file, i) => (
              <div key={i} className="grid grid-cols-12 p-4 border-b border-gray-800/50 hover:bg-[#11151d] transition text-sm text-gray-300 items-center cursor-pointer">
                <div className="col-span-8 md:col-span-6 flex items-center gap-3 truncate"><span className="text-xl">{file.icon}</span> <span className="truncate">{file.name}</span></div>
                <div className="col-span-4 md:col-span-3 text-right text-gray-500">{file.size}</div>
                <div className="hidden md:block md:col-span-3 text-right text-gray-500">{file.date}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (tab === 'plugins') {
      const pluginsList = [
        { name: 'LuckPerms', author: 'Luck', desc: 'Permissions plugin for MC servers', updated: 'hace 12 meses', dls: '8.5M', stars: '460', icon: '🍀' },
        { name: 'Simple Tpa', author: 'MuleMuleDupe', desc: 'Simple tpa plugin for requests', updated: 'hace 7 meses', dls: '5.16M', stars: '5', icon: '⚙️' },
        { name: 'Set Home', author: 'DownThePark', desc: 'Plugin for players to set homes', updated: 'ene 14º, 2024', dls: '3.67M', stars: '6', icon: '🏠' },
        { name: 'Vault', author: 'Sleaker', desc: 'Permissions, Chat & Economy API', updated: 'jul 17º, 2020', dls: '3.47M', stars: '246', icon: '🔒' }
      ];

      return (
        <div className="flex flex-col lg:flex-row gap-6 h-full">
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-4 items-center bg-[#1a1e27] p-4 rounded-lg border border-gray-800">
              <div className="w-full flex-1 bg-[#11151d] border border-gray-700 rounded p-2 flex items-center gap-2">
                <span className="text-gray-500 pl-2">🔍</span>
                <input type="text" placeholder="Buscar plugin..." className="bg-transparent border-none outline-none text-white w-full text-sm" />
              </div>
              <button className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded text-sm transition flex justify-center items-center gap-2 cursor-pointer">
                <span>⬇️</span> Plugins instalados
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto pb-4">
              {pluginsList.map((plug, i) => (
                <div key={i} className="bg-[#1a1e27] border border-gray-800 hover:border-yellow-500/50 rounded-lg p-5 flex flex-col transition">
                  <div className="flex gap-4 mb-3">
                    <div className="w-12 h-12 shrink-0 bg-yellow-500 rounded flex items-center justify-center text-2xl">{plug.icon}</div>
                    <div>
                      <h4 className="text-white font-bold text-lg flex items-center gap-2">{plug.name} <span className="text-yellow-500 text-xs">↗</span></h4>
                      <p className="text-xs text-gray-400 flex items-center gap-1">👤 Por <span className="text-yellow-500">{plug.author}</span></p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-4 flex-1">{plug.desc}</p>
                  <div className="flex gap-3 mb-4">
                    <div className="bg-[#11151d] border border-gray-700 rounded px-3 py-1 flex items-center gap-2 text-sm text-white"><span className="text-blue-400">⬇️</span> {plug.dls}</div>
                    <div className="bg-[#11151d] border border-gray-700 rounded px-3 py-1 flex items-center gap-2 text-sm text-white"><span className="text-yellow-500">⭐</span> {plug.stars}</div>
                  </div>
                  <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 rounded transition flex items-center justify-center gap-2 cursor-pointer">
                    <span>☁️</span> Instalar versión
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen text-gray-300 w-full overflow-hidden relative">
      
      <aside className="w-1/4 max-w-[280px] bg-[#1a1e27] border-r border-gray-800 flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-800"><h1 className="text-2xl font-extrabold text-white tracking-wider flex items-center gap-2">⛏️ MineHosting</h1></div>
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-4 h-4 rounded-sm ${estado === 'en_linea' ? 'bg-green-500' : estado === 'iniciando' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'}`}></div>
            <h2 className="text-xl font-bold text-white truncate">{config?.nombre || 'Mi Servidor'}</h2>
          </div>
          <p className="text-xs text-gray-400 truncate break-all block w-full border-b border-gray-700 pb-4 mb-4">🌍 {config?.dominio || 'play.minehosting.com'}</p>
          <div className="flex gap-2">
            <button onClick={encender} className="flex-1 bg-green-700/20 hover:bg-green-600 border border-green-600 text-green-500 hover:text-white py-2 rounded transition cursor-pointer">▶️</button>
            <button onClick={reiniciar} className="flex-1 bg-blue-700/20 hover:bg-blue-600 border border-blue-600 text-blue-500 hover:text-white py-2 rounded transition cursor-pointer">🔄</button>
            <button onClick={apagar} className="flex-1 bg-red-700/20 hover:bg-red-600 border border-red-600 text-red-500 hover:text-white py-2 rounded transition cursor-pointer">⏹️</button>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="text-xs font-bold text-gray-500 mb-2 ml-2 tracking-widest mt-2">GENERAL</p>
          <button onClick={() => setTab('panel')} className={`w-full flex items-center gap-3 px-3 py-2 rounded transition cursor-pointer ${tab === 'panel' ? 'bg-gray-800 border-l-2 border-yellow-500 text-white rounded-r' : 'hover:bg-gray-800/50'}`}><span>⊞</span> Panel</button>
          <button onClick={() => setTab('consola')} className={`w-full flex items-center gap-3 px-3 py-2 rounded transition cursor-pointer ${tab === 'consola' ? 'bg-gray-800 border-l-2 border-yellow-500 text-white rounded-r' : 'hover:bg-gray-800/50'}`}><span>&gt;_</span> Consola</button>
          <button onClick={() => setTab('configuracion')} className={`w-full flex items-center gap-3 px-3 py-2 rounded transition cursor-pointer ${tab === 'configuracion' ? 'bg-gray-800 border-l-2 border-yellow-500 text-white rounded-r' : 'hover:bg-gray-800/50'}`}><span>⚙️</span> Configuración</button>
          <p className="text-xs font-bold text-gray-500 mb-2 ml-2 tracking-widest mt-6">ADMINISTRACIÓN</p>
          <button onClick={() => setTab('archivos')} className={`w-full flex items-center gap-3 px-3 py-2 rounded transition cursor-pointer ${tab === 'archivos' ? 'bg-gray-800 border-l-2 border-yellow-500 text-white rounded-r' : 'hover:bg-gray-800/50'}`}><span>📁</span> Archivos</button>
          <button onClick={() => setTab('plugins')} className={`w-full flex items-center gap-3 px-3 py-2 rounded transition cursor-pointer ${tab === 'plugins' ? 'bg-gray-800 border-l-2 border-yellow-500 text-white rounded-r' : 'hover:bg-gray-800/50'}`}><span>🔌</span> Plugins</button>
        </nav>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-[#11151d] pb-24 md:pb-8">
        
        <div className="md:hidden flex justify-between items-center bg-[#1a1e27] p-4 rounded-lg border border-gray-800 mb-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${estado === 'en_linea' ? 'bg-green-500' : estado === 'iniciando' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="font-bold text-white text-sm truncate max-w-[150px]">{config?.nombre || 'Mi Servidor'}</span>
          </div>
          <div className="flex gap-2 text-sm">
            <button onClick={encender} className="bg-green-700/20 text-green-500 px-3 py-1 rounded">▶️</button>
            <button onClick={apagar} className="bg-red-700/20 text-red-500 px-3 py-1 rounded">⏹️</button>
          </div>
        </div>

        {renderContenido()}
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#1a1e27] border-t border-gray-800 flex justify-around items-center p-3 pb-6 z-50">
        <button onClick={() => setTab('panel')} className={`flex flex-col items-center gap-1 cursor-pointer ${tab === 'panel' ? 'text-yellow-500' : 'text-gray-500'}`}>
          <span className="text-xl">⊞</span><span className="text-[10px] font-bold">Panel</span>
        </button>
        <button onClick={() => setTab('consola')} className={`flex flex-col items-center gap-1 cursor-pointer ${tab === 'consola' ? 'text-yellow-500' : 'text-gray-500'}`}>
          <span className="text-xl">&gt;_</span><span className="text-[10px] font-bold">Consola</span>
        </button>
        <button onClick={() => setTab('configuracion')} className={`flex flex-col items-center gap-1 cursor-pointer ${tab === 'configuracion' ? 'text-yellow-500' : 'text-gray-500'}`}>
          <span className="text-xl">⚙️</span><span className="text-[10px] font-bold">Config</span>
        </button>
        <button onClick={() => setTab('archivos')} className={`flex flex-col items-center gap-1 cursor-pointer ${tab === 'archivos' ? 'text-yellow-500' : 'text-gray-500'}`}>
          <span className="text-xl">📁</span><span className="text-[10px] font-bold">Archivos</span>
        </button>
        <button onClick={() => setTab('plugins')} className={`flex flex-col items-center gap-1 cursor-pointer ${tab === 'plugins' ? 'text-yellow-500' : 'text-gray-500'}`}>
          <span className="text-xl">🔌</span><span className="text-[10px] font-bold">Plugins</span>
        </button>
      </nav>

    </div>
  );
}