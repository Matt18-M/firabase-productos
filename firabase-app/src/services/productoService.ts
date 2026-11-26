import { db } from '../firabase';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore';

export interface Producto {
    id: string;
    nombre: string;
    precio: number;
    stock: number;
    categoria: string;
}

export const crearProducto = async (
    nombre: string,
    precio: number,
    stock: number,
    categoria: string
) => {
    try {
        const docRef = await addDoc(collection(db, "productos"), {
            nombre,
            precio,
            stock,
            categoria
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
};

// NUEVA FUNCIÓN: ESCUCHAR PRODUCTOS EN TIEMPO REAL
export const escucharProductos = (
    callback: (productos: Producto[]) => void
) => {
    const productosRef = collection(db, "productos");

    const unsubscribe = onSnapshot(productosRef, (querySnapshot) => {
        const productos = querySnapshot.docs.map((docs) => ({
            id: docs.id,
            ...docs.data()
        })) as Producto[];

        callback(productos);
    }, (error) => {
        console.error("Error al escuchar los productos: ", error);
    });

    return unsubscribe;
};

export const actualizarProducto = async (
    id: string,
    nombre: string,
    precio: number,
    stock: number,
    categoria: string
) => {
    const productoRef = doc(db, "productos", id);

    await updateDoc(productoRef, {
        nombre,
        precio,
        stock,
        categoria
    });
};

export const eliminarProducto = async (id: string) => {
    const productoRef = doc(db, "productos", id);
    await deleteDoc(productoRef);
};
