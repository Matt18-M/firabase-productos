import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import { crearProducto } from '../services/productoService';

function ProductoForm() {

    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");

    const guardarProducto = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();

        try {
        await crearProducto(
            nombre,
            Number(precio),
            Number(stock)
        );

        console.log("Producto agregado correctamente");

        // Limpiar los campos del formulario
        setNombre("");
        setPrecio("");
        setStock("");

        } catch (e) {
        console.error("Error al agregar el documento: ", e);
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

            <button type="submit">Agregar Producto</button>

        </form>
        </div>
    );
    }

export default ProductoForm;
