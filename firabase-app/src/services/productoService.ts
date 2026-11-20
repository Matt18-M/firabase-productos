import { db } from '../firabase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
export interface Producto {
    id: string;
    nombre: string;
    precio: number;
    stock: number;
}

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


    export const obtenerProductos = async (): Promise<Producto[]> => {
        const querySnapshot = await getDocs(collection(db, "productos"));
        
        const productos = querySnapshot.docs.map((docs) => ({
            id: docs.id,
            ...docs.data() 
            })) as Producto[];
        
        return productos;
    }