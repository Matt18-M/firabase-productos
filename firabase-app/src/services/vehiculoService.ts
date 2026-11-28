import { db } from '../firabase';
import {
    collection,
    getDocs,
    query,
    orderBy,
    limit,
    startAfter,
    type QueryDocumentSnapshot,
    type DocumentData
} from 'firebase/firestore';

export interface Vehiculo {
    id: string;
    marca: string;
    modelo: string;
    precio: number;
    stock: number;
    anio: number;
    tipo: string;
}

export const obtenerVehiculosPaginados = async (
    ultimoDocumento?: QueryDocumentSnapshot<DocumentData>
) => {

    let consulta;

    if (ultimoDocumento) {
        consulta = query(
            collection(db, "vehiculos"),
            orderBy("marca", "asc"),
            startAfter(ultimoDocumento),
            limit(10)
        );
    } else {
        consulta = query(
            collection(db, "vehiculos"),
            orderBy("marca", "asc"),
            limit(10)
        );
    }

    const snapshot = await getDocs(consulta);

    const vehiculos = snapshot.docs.map((documentos) => ({
        id: documentos.id,
        ...documentos.data()
    })) as Vehiculo[];

    const nuevoUltimoDoc = snapshot.docs[snapshot.docs.length - 1];

    return {
        vehiculos,
        ultimoDocumento: nuevoUltimoDoc
    };
};
