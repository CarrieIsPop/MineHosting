# ⛏️ MineHosting - E-commerce de Servidores de Minecraft

Una plataforma web interactiva desarrollada para la simulación de compra y alquiler de servidores de hosting para Minecraft. 

## 🚀 Características Principales

* **Navegación Fluida (SPA):** Renderizado condicional de componentes sin recargar la página usando estados de React.
* **Diseño Modular y Responsivo:** Construido con Tailwind CSS para una experiencia de usuario (UX) moderna, con temática oscura ("gamer") y adaptable a dispositivos móviles.
* **Configuración Dinámica:** Formulario interactivo que permite al usuario personalizar el nombre, dominio, entorno (Java/Bedrock), ubicación del centro de datos y subir un icono (con vista previa en tiempo real usando `URL.createObjectURL`).
* **Pasarelas de Pago Simuladas:**
    * **Tarjeta de Crédito:** Formulario de checkout tradicional con validaciones y simulación de procesamiento.
    * **Criptomonedas (Live):** Integración con la API pública de **CoinDesk** para la conversión del precio del plan a Bitcoin (BTC) en tiempo real, junto con la API de **QRServer** para la generación dinámica de códigos QR de depósito.

## 🛠️ Tecnologías Utilizadas

* **Framework:** React (usando la configuración moderna de React Compiler)
* **Build Tool:** Vite
* **Estilos:** Tailwind CSS v4
* **APIs Externas:** CoinDesk API (Precios Crypto) y QRServer API (Generación de QR)

- Panel de control simulado estilo Pterodactyl integrado.