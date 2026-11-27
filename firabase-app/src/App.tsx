import './App.css';
import { obtenerProductosDisponibles } from './services/productoService';
import { consulta1, consulta2, consulta3, consulta4 } from './scripts/consultasVehiculos';

function App() {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '250px' }}>
      <button onClick={async () => {
        const productosDeConsulta = await obtenerProductosDisponibles();
        console.log("Productos obtenidos: ", productosDeConsulta);
      }}>
        Consultar productos
      </button>

      <button onClick={async () => {
        await consulta1();
      }}>
        Consulta 1 - Vehículos disponibles
      </button>

      <button onClick={async () => {
        await consulta2();
      }}>
        Consulta 2 - SUV disponibles
      </button>

      <button onClick={async () => {
        await consulta3();
      }}>
        Consulta 3 - Vehículos por precio
      </button>

      <button onClick={async () => {
        await consulta4();
      }}>
        Consulta 4 - Sedan desde 2023
      </button>
    </div>
  );
}

export default App;
