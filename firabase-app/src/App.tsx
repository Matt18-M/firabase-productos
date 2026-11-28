import './App.css';
import { VehiculoListaPaginada } from './components/VehiculoListaPaginada';

function App() {

  return (
    <div className="app-container">

      <header className="app-header">
        <h1>Sistema de Vehículos</h1>
      </header>

      <main className="app-card">
        <VehiculoListaPaginada />
      </main>

      <footer className="app-footer">
        <p>Proyecto académico | React + TypeScript + Firebase</p>
      </footer>

    </div>
  );
}

export default App;
