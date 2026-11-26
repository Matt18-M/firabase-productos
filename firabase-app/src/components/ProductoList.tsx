import { useState, useEffect } from 'react';
import { escucharProductos, eliminarProducto, type Producto } from '../services/productoService';

interface Props {
    onEditar: (producto: Producto) => void;
}

export const ProductoList = ({ onEditar }: Props) => {

    const [productos, setProductos] = useState<Producto[]>([]);

    useEffect(() => {

        const unsubscribe = escucharProductos((datos) => {
            setProductos(datos);
        });

        return () => {
            unsubscribe();
        };

    }, []);

    const handleEliminar = async (id: string) => {
        try {
            await eliminarProducto(id);
            console.log("Producto eliminado correctamente");
        } catch (error) {
            console.error("Error al eliminar el producto: ", error);
        }
    };

    return (
        <div>
            <h2>Lista de Productos</h2>

            <ul>
                {productos.map((producto) => (
                    <li key={producto.id}>
                        <strong>{producto.nombre}</strong> -
                        ${producto.precio.toFixed(2)}
                        (Stock: {producto.stock})
                        <button onClick={() => onEditar(producto)}>Editar</button>
                        <button onClick={() => handleEliminar(producto.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
