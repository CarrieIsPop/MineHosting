import { useState } from 'react'
import Navbar from './components/navbar'
import Home from './components/home'
import Services from './components/services'
import Contact from './components/contact'
import Configuracion from './components/configuracion'
import Pago from './components/pago'

function App() {
  const [vista, setVista] = useState('inicio')
  const [planSeleccionado, setPlanSeleccionado] = useState(null)

  const renderContenido = () => {
    switch (vista) {
      case 'inicio':
        return <Home setVista={setVista} />;
      case 'planes':
        return <Services setVista={setVista} setPlanSeleccionado={setPlanSeleccionado} />;
      case 'configuracion':
        return <Configuracion setVista={setVista} plan={planSeleccionado} />;
      case 'pago':
        return <Pago setVista={setVista} plan={planSeleccionado} />; // <-- La nueva vista
      case 'contacto':
        return <Contact />;
      default:
        return <Home setVista={setVista} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 font-sans">
      <Navbar setVista={setVista} />
      {renderContenido()}
    </div>
  )
}

export default App