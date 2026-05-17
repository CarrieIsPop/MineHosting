import { useState, useEffect } from 'react';

export default function Pago({ setVista, plan }) {
  const [metodoSeleccionado, setMetodoSeleccionado] = useState(null); 
  const [estadoPago, setEstadoPago] = useState('pendiente'); 
  
  const [precioBtc, setPrecioBtc] = useState(null);
  const [cargandoApi, setCargandoApi] = useState(false);

  if (!plan) {
    setVista('planes');
    return null;
  }

  const simularPagoTarjeta = (e) => {
    e.preventDefault();
    setEstadoPago('procesando');
    setTimeout(() => {
      setEstadoPago('exito');
    }, 2500);
  };

  const simularPagoCrypto = () => {
    setEstadoPago('procesando');
    setTimeout(() => {
      setEstadoPago('exito');
    }, 3500);
  };


  useEffect(() => {
    if (metodoSeleccionado === 'crypto') {
      setCargandoApi(true);
      fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(res => res.json())
        .then(data => {
          const precioActualBtc = data.bpi.USD.rate_float;
          const conversion = (parseFloat(plan.precio) / precioActualBtc).toFixed(6);
          setPrecioBtc(conversion);
          setCargandoApi(false);
        })
        .catch(err => {
          console.error("Error al obtener API:", err);
          setPrecioBtc("0.000150");
          setCargandoApi(false);
        });
    }
  }, [metodoSeleccionado, plan.precio]);


  if (estadoPago === 'exito') {
    return (
      <main className="p-8 max-w-2xl mx-auto mt-20 flex-grow w-full text-center text-white">
        <div className="bg-gray-800 p-10 rounded-2xl border border-green-500 shadow-xl shadow-green-500/20">
          <div className="text-6xl mb-6">✅</div>
          <h2 className="text-3xl font-bold text-green-400 mb-4">¡Pago Exitoso!</h2>
          <p className="text-gray-300 mb-8">
            Tu servidor <strong>{plan.nombre}</strong> se está desplegando. Recibirás un correo con la IP y las credenciales de acceso en breve.
          </p>
          <button 
            onClick={() => setVista('inicio')}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            Ir al Panel de Control 🚀
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="p-8 max-w-4xl mx-auto mt-10 flex-grow w-full text-white">
      <div className="flex flex-col md:flex-row gap-8">
        
        <div className="w-full md:w-1/3 bg-gray-800 p-6 rounded-2xl border border-gray-700 h-fit">
          <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-4">Resumen</h3>
          <div className="flex items-center gap-4 mb-4">
            <img src={plan.imagen} alt="Plan" className="w-12 h-12" />
            <div>
              <p className="font-semibold text-green-400">{plan.nombre}</p>
              <p className="text-sm text-gray-400">{plan.ram} RAM</p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-700 text-xl">
            <span className="font-bold">Total:</span>
            <span className="font-extrabold text-green-400">${plan.precio}</span>
          </div>
        </div>

        <div className="w-full md:w-2/3 bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-xl">
          
          {!metodoSeleccionado && (
            <>
              <h2 className="text-2xl font-bold text-white mb-6">Elige cómo pagar</h2>
              <div className="grid grid-cols-1 gap-4">
                <button onClick={() => setMetodoSeleccionado('tarjeta')} className="flex items-center justify-between bg-gray-900 border border-gray-700 hover:border-green-500 p-5 rounded-xl transition cursor-pointer">
                  <div className="flex items-center gap-4"><span className="text-3xl">💳</span><span className="font-bold text-lg">Tarjeta de Crédito / Débito</span></div>
                  <span className="text-gray-500">→</span>
                </button>
                <button onClick={() => setMetodoSeleccionado('crypto')} className="flex items-center justify-between bg-gray-900 border border-gray-700 hover:border-green-500 p-5 rounded-xl transition cursor-pointer">
                  <div className="flex items-center gap-4"><span className="text-3xl">₿</span><span className="font-bold text-lg">Bitcoin (Vía API Real)</span></div>
                  <span className="text-gray-500">→</span>
                </button>
              </div>
            </>
          )}

          {metodoSeleccionado === 'tarjeta' && (
            <>
              <div className="flex items-center gap-4 mb-6">
                <button onClick={() => setMetodoSeleccionado(null)} className="text-gray-400 hover:text-white transition">← Volver</button>
                <h2 className="text-2xl font-bold text-white">Pago con Tarjeta</h2>
              </div>
              <form onSubmit={simularPagoTarjeta} className="space-y-4">
                <input type="text" required placeholder="Steve Minecraft" className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-green-500 outline-none" />
                <input type="text" required maxLength="16" placeholder="4242 4242 4242 4242" className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-green-500 outline-none font-mono" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" required maxLength="5" placeholder="12/28" className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-green-500 outline-none" />
                  <input type="password" required maxLength="3" placeholder="***" className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-green-500 outline-none text-center" />
                </div>
                <button type="submit" disabled={estadoPago === 'procesando'} className={`w-full text-white font-bold py-4 rounded-xl shadow-lg mt-6 text-lg flex justify-center items-center gap-2 ${estadoPago === 'procesando' ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500 cursor-pointer shadow-green-500/20'}`}>
                  {estadoPago === 'procesando' ? '⏳ Procesando pago...' : `Pagar $${plan.precio}`}
                </button>
              </form>
            </>
          )}

          {metodoSeleccionado === 'crypto' && (
            <>
              <div className="flex items-center gap-4 mb-6 border-b border-gray-700 pb-4">
                <button onClick={() => setMetodoSeleccionado(null)} className="text-gray-400 hover:text-white transition">← Volver</button>
                <h2 className="text-2xl font-bold text-white">Depósito Bitcoin</h2>
              </div>

              {cargandoApi ? (
                <div className="text-center py-10 animate-pulse text-green-400 font-semibold">
                  Obteniendo precio del Bitcoin en tiempo real... 📡
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <p className="text-gray-400 mb-2">Envía exactamente esta cantidad:</p>
                  <div className="text-4xl font-mono text-orange-400 font-bold mb-6 bg-gray-900 px-6 py-3 rounded-xl border border-orange-500/30">
                    {precioBtc} BTC
                  </div>

                  <div className="bg-white p-3 rounded-xl mb-6">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh?amount=${precioBtc}`} 
                      alt="Código QR Bitcoin" 
                      className="w-40 h-40"
                    />
                  </div>

                  <p className="text-sm text-gray-400 mb-2">A esta dirección de red (Bitcoin):</p>
                  <code className="bg-gray-900 p-3 rounded-lg border border-gray-700 text-sm text-gray-300 w-full mb-8 break-all select-all">
                    bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                  </code>

                  <button 
                    onClick={simularPagoCrypto}
                    disabled={estadoPago === 'procesando'}
                    className={`w-full text-white font-bold py-4 rounded-xl shadow-lg text-lg flex justify-center items-center gap-2 ${estadoPago === 'procesando' ? 'bg-gray-600 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-500 cursor-pointer shadow-orange-500/20'}`}
                  >
                     {estadoPago === 'procesando' ? '⏳ Esperando confirmación en Blockchain...' : 'Ya realicé la transferencia'}
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </main>
  );
}