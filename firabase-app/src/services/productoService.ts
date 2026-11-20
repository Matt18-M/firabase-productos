import { db } from '../firabase';
import { collection, addDoc } from 'firebase/firestore';

export const crearProducto = async (
    nombre: string,
    precio: number,
    stock: number
    ) => {

    try {
        const docRef = await addDoc(collection(db, "productos"), {
        nombre,
        precio,
        stock
        });

        console.log("Documento agregado con ID: ", docRef.id);

        return docRef.id;

    } catch (error) {
        console.error("Error al agregar el documento: ", error);
        throw error;
    }

    };
