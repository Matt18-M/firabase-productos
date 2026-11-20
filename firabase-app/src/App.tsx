import './App.css';
import ProductoForm from './components/ProductoForm';
import { ProductoList } from './components/ProductoList';
import { useState } from 'react';
import type { Producto } from './services/productoService';

function App() {

  const [productosEditar, setProductosEditar] = useState<Producto | null>(null);

  return (
    <div className="App">
      <ProductoForm key={productosEditar?.id ?? 'nuevo'} productoEditar={productosEditar} />
      <ProductoList onEditar={setProductosEditar} />
    </div>
  );

}

export default App;
