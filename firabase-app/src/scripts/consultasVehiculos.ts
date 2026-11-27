import { db } from '../firabase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

export const consulta1 = async () => {
    try {
        const consulta = query(
            collection(db, "vehiculos"),
            where("stock", ">", 0),
            orderBy("precio", "asc")
        );

        const querySnapshot = await getDocs(consulta);

        const vehiculos = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        console.log("Vehículos disponibles ordenados por precio:", vehiculos);

    } catch (error) {
        console.error("Error en la consulta 1:", error);
    }
};

consulta1();


export const consulta2 = async () => {
    try {
        const consulta = query(
            collection(db, "vehiculos"),
            where("tipo", "==", "SUV"),
            where("stock", ">", 0),
            orderBy("precio", "asc")
        );

        const querySnapshot = await getDocs(consulta);

        const vehiculos = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        console.log("CONSULTA 2 - SUV disponibles:", vehiculos);

    } catch (error) {
        console.error("Error en la consulta 2:", error);
    }
};


export const consulta3 = async () => {
    try {
        const consulta = query(
            collection(db, "vehiculos"),
            where("precio", ">=", 20000),
            where("precio", "<=", 40000),
            where("stock", ">", 0),
            orderBy("precio", "asc")
        );

        const querySnapshot = await getDocs(consulta);

        const vehiculos = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        console.log("CONSULTA 3 - Vehículos entre $20.000 y $40.000:", vehiculos);

    } catch (error) {
        console.error("Error en la consulta 3:", error);
    }
};


export const consulta4 = async () => {
    try {
        const consulta = query(
            collection(db, "vehiculos"),
            where("tipo", "==", "Sedan"),
            where("anio", ">=", 2023),
            where("stock", ">", 0),
            orderBy("anio", "desc")
        );

        const querySnapshot = await getDocs(consulta);

        const vehiculos = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        console.log("CONSULTA 4 - Sedan desde 2023:", vehiculos);

    } catch (error) {
        console.error("Error en la consulta 4:", error);
    }
};
