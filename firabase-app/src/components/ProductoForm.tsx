import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import { actualizarProducto, crearProducto, type Producto } from '../services/productoService';

interface Props {
    productoEditar: Producto | null;
}

export const ProductoForm = ({ productoEditar }: Props) => {

    const [nombre, setNombre] = useState(productoEditar ? productoEditar.nombre ?? "" : "");
    const [precio, setPrecio] = useState(productoEditar ? productoEditar.precio.toString() : "");
    const [stock, setStock] = useState(productoEditar ? productoEditar.stock.toString() : "");
    const [categoria, setCategoria] = useState(productoEditar ? productoEditar.categoria ?? "" : "");

    const guardarProducto = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {

            if (productoEditar) {
                await actualizarProducto(
                    productoEditar.id,
                    nombre,
                    Number(precio),
                    Number(stock),
                    categoria
                );
                console.log("Producto actualizado");
            } else {
                await crearProducto(
                    nombre,
                    Number(precio),
                    Number(stock),
                    categoria

                );

                console.log("Producto agregado correctamente");
            }

            setNombre("");
            setPrecio("");
            setStock("");

        } catch (e) {
            console.error("Error al guardar el documento: ", e);
        }
    };

    return (
        <div className="App">
            <h1>Formulario de Productos</h1>

            <form onSubmit={guardarProducto}>

                <label htmlFor="nombre">Nombre:</label>
                <input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />

                <br />

                <label htmlFor="precio">Precio:</label>
                <input
                    type="number"
                    id="precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    required
                />

                <br />

                <label htmlFor="stock">Stock:</label>
                <input
                    type="number"
                    id="stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                />

                <br />

                <label htmlFor="categoria">Categoria:</label>
                <input
                    type="text"
                    id="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                />

                <br />
                <button type="submit">
                    {productoEditar ? "Actualizar Producto" : "Agregar Producto"}
                </button>

            </form>
        </div>
    );
};

export default ProductoForm;
