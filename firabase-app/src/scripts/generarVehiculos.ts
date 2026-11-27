import { db } from '../firabase';
import { collection, addDoc } from 'firebase/firestore';

const vehiculos = [
    { marca: "Toyota", modelo: "Corolla", precio: 24500, stock: 8, anio: 2025, tipo: "Sedan" },
    { marca: "Toyota", modelo: "RAV4", precio: 38000, stock: 12, anio: 2024, tipo: "SUV" },
    { marca: "Chevrolet", modelo: "Colorado", precio: 42000, stock: 5, anio: 2025, tipo: "Pickup" },
    { marca: "Hyundai", modelo: "Accent", precio: 18500, stock: 15, anio: 2023, tipo: "Sedan" },
    { marca: "Kia", modelo: "Sportage", precio: 35000, stock: 7, anio: 2026, tipo: "SUV" },
    { marca: "Ford", modelo: "Ranger", precio: 48000, stock: 3, anio: 2024, tipo: "Pickup" },
    { marca: "Mazda", modelo: "Mazda 3", precio: 27000, stock: 10, anio: 2025, tipo: "Hatchback" },
    { marca: "Nissan", modelo: "Sentra", precio: 22000, stock: 0, anio: 2022, tipo: "Sedan" },
    { marca: "Honda", modelo: "CR-V", precio: 39000, stock: 6, anio: 2026, tipo: "SUV" },
    { marca: "Mitsubishi", modelo: "L200", precio: 45000, stock: 9, anio: 2023, tipo: "Pickup" },
    { marca: "Volkswagen", modelo: "Golf", precio: 26000, stock: 4, anio: 2024, tipo: "Hatchback" },
    { marca: "Chevrolet", modelo: "Onix", precio: 17000, stock: 20, anio: 2025, tipo: "Hatchback" },
    { marca: "Renault", modelo: "Duster", precio: 28000, stock: 11, anio: 2022, tipo: "SUV" },
    { marca: "Toyota", modelo: "Hilux", precio: 52000, stock: 2, anio: 2026, tipo: "Pickup" },
    { marca: "Suzuki", modelo: "Swift", precio: 16000, stock: 14, anio: 2021, tipo: "Hatchback" },
    { marca: "Hyundai", modelo: "Elantra", precio: 24000, stock: 8, anio: 2023, tipo: "Sedan" },
    { marca: "Kia", modelo: "Sorento", precio: 55000, stock: 0, anio: 2026, tipo: "SUV" },
    { marca: "Ford", modelo: "Maverick", precio: 41000, stock: 13, anio: 2025, tipo: "Pickup" },
    { marca: "Mazda", modelo: "CX-30", precio: 33000, stock: 5, anio: 2024, tipo: "SUV" },
    { marca: "Nissan", modelo: "March", precio: 15500, stock: 18, anio: 2020, tipo: "Hatchback" }
];

const generarVehiculos = async () => {
    try {
        for (const vehiculo of vehiculos) {
            const docRef = await addDoc(collection(db, "vehiculos"), vehiculo);
            console.log("Vehículo agregado:", vehiculo.marca, vehiculo.modelo, docRef.id);
        }

        console.log("Se registraron los 20 vehículos correctamente.");

    } catch (error) {
        console.error("Error al generar vehículos:", error);
    }
};

generarVehiculos();
