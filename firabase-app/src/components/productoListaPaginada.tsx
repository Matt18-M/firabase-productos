import { useState } from 'react';
import type {
    DocumentData,
    QueryDocumentSnapshot
} from 'firebase/firestore';
import { obtenerProductosPaginados, type Producto } from '../services/productoService';

export const ProductoListaPaginada = () => {

    const [productos, setProductos] = useState<Producto[]>([]);
    const [ultimoDocumento, setUltimoDocumento] = useState<QueryDocumentSnapshot<DocumentData> | undefined>(undefined);

    const cargarPrimeraPagina = async () => {

        const resultado = await obtenerProductosPaginados();

        setProductos(resultado.productos);
        setUltimoDocumento(resultado.ultimoDocumento);
    };

    const siguientePagina = async () => {
        if (ultimoDocumento) return;

        const resultado = await obtenerProductosPaginados(ultimoDocumento);
        
        setProductos(resultado.productos);
        setUltimoDocumento(resultado.ultimoDocumento);
    };
        
        return(
            <div>
                <h2>Productos Paginados</h2>
                <button onClick={cargarPrimeraPagina}>Cargar Primera Página</button>
                {productos.map((producto) => (
                    <div>
                        <div key={producto.id}>
                            <h3>{producto.nombre}</h3>
                            <p>Precio: $ {producto.precio}</p>
                            <p>Stock: {producto.stock}</p>
                            <p>Categoría: {producto.categoria}</p>
                        </div>
                        
                        <div>
                            <button onClick={siguientePagina} disabled={!ultimoDocumento}>
                                Siguiente Página
                            </button>
                        </div>
                    </div>
                ))}
                

            </div>
        )

    }
