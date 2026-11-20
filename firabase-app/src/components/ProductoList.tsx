import { useState, useEffect } from 'react';
import { obtenerProductos, type Producto } from '../services/productoService';

interface Props {
    onEditar: (producto: Producto) => void;
}

export const ProductoList = ({ onEditar }: Props) => {

    const [productos, setProductos] = useState<Producto[]>([]);

    useEffect(() => {

        const cargarProductos = async () => {
            try {
                const datos = await obtenerProductos();
                setProductos(datos);
            } catch (error) {
                console.error("Error al obtener los productos: ", error);
            }
        };

        cargarProductos();

    }, []);

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
                    </li>
                ))}
            </ul>
        </div>
    );
};
