import { useState } from 'react';
import type {
    DocumentData,
    QueryDocumentSnapshot
} from 'firebase/firestore';
import { obtenerVehiculosPaginados, type Vehiculo } from '../services/vehiculoService';

export const VehiculoListaPaginada = () => {

    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const [ultimoDocumento, setUltimoDocumento] = useState<QueryDocumentSnapshot<DocumentData> | undefined>(undefined);
    const [paginaActual, setPaginaActual] = useState(0);
    const [paginas, setPaginas] = useState<Vehiculo[][]>([]);
    const [hayMas, setHayMas] = useState(true);
    const [cargando, setCargando] = useState(false);

    const cargarPrimeraPagina = async () => {

        setCargando(true);

        try {
            const resultado = await obtenerVehiculosPaginados();

            console.log("Vehículos recibidos:", resultado.vehiculos);
            console.log("Cantidad recibida:", resultado.vehiculos.length);

            setVehiculos(resultado.vehiculos);
            setUltimoDocumento(resultado.ultimoDocumento);
            setPaginas([resultado.vehiculos]);
            setPaginaActual(1);
            setHayMas(resultado.vehiculos.length === 10);

        } catch (error) {
            console.error("Error al cargar vehículos: ", error);
        } finally {
            setCargando(false);
        }
    };

    const siguientePagina = async () => {

        if (cargando) return;

        if (paginaActual < paginas.length) {

            const siguiente = paginaActual + 1;

            setPaginaActual(siguiente);
            setVehiculos(paginas[siguiente - 1]);

            return;
        }

        if (!ultimoDocumento || !hayMas) return;

        setCargando(true);

        try {
            const resultado = await obtenerVehiculosPaginados(ultimoDocumento);

            if (resultado.vehiculos.length > 0) {

                setVehiculos(resultado.vehiculos);
                setUltimoDocumento(resultado.ultimoDocumento);
                setPaginas((anteriores) => [...anteriores, resultado.vehiculos]);
                setPaginaActual((actual) => actual + 1);
                setHayMas(resultado.vehiculos.length === 10);

            } else {
                setHayMas(false);
            }

        } catch (error) {
            console.error("Error al cargar la siguiente página: ", error);
        } finally {
            setCargando(false);
        }
    };

    const anteriorPagina = () => {

        if (paginaActual > 1) {

            const anterior = paginaActual - 1;

            setPaginaActual(anterior);
            setVehiculos(paginas[anterior - 1]);
        }
    };

    return (
        <div className="vehiculos-paginados">

            <div className="titulo-lista">
                <h2>Vehículos Paginados</h2>
                <p>Consulta de registros mediante Firebase Firestore</p>
            </div>

            <div className="pagina-indicador">
                <span>PÁGINA ACTUAL</span>
                <strong>{paginaActual}</strong>
                <span>{paginas[paginaActual - 1]?.length ?? 0} registros</span>
            </div>

            <button onClick={cargarPrimeraPagina} disabled={cargando}>
                Cargar Primera Página
            </button>

            <div className="vehiculos-grid">

                {vehiculos.map((vehiculo) => (
                    <div className="vehiculo-item" key={vehiculo.id}>
                        <h3>{vehiculo.marca} {vehiculo.modelo}</h3>
                        <p><span>Precio:</span> $ {vehiculo.precio}</p>
                        <p><span>Stock:</span> {vehiculo.stock}</p>
                        <p><span>Año:</span> {vehiculo.anio}</p>
                        <p><span>Tipo:</span> {vehiculo.tipo}</p>
                    </div>
                ))}

            </div>

            {vehiculos.length === 0 && !cargando && (
                <p className="mensaje-carga">Presiona Cargar Primera Página para mostrar los vehículos.</p>
            )}

            <div className="paginacion-botones">

                <button
                    onClick={anteriorPagina}
                    disabled={paginaActual <= 1 || cargando}
                >
                    Anterior
                </button>

                <button
                    onClick={siguientePagina}
                    disabled={cargando || (paginaActual === paginas.length && !hayMas)}
                >
                    {cargando ? 'Cargando...' : 'Siguiente'}
                </button>

            </div>

        </div>
    );
};
