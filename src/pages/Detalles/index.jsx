import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/db';
import ItemDetail from '../../components/itemDetail/itemDetail';

const Detalles = () => {
  const { tipo, id } = useParams();
  const [nombre, setNombre] = useState('');
  const [datoSeleccionado, setDatoSeleccionado] = useState(null);

  useEffect(() => {
    const obtenerDatoSeleccionado = async () => {
      const itemDb = doc(db, 'items', id);
      const product = await getDoc(itemDb);

      if (product.exists()) {
        setNombre(product.data().nombre);
        setDatoSeleccionado({ id: product.id, ...product.data() });
      }
    };

    obtenerDatoSeleccionado();
  }, [id]);

  return (
    <div className="contenedor-general">
      <div className="detalles-container">
        <p className="titulo-viaje">
          {tipo === 'alojamientos' ? 'Alojamiento:' : 'Vuelo:'} {nombre}
        </p>
      </div>
      <h2 className="titulo-detalles">Detalles del {tipo}</h2>
      {datoSeleccionado && <ItemDetail tipo={tipo} datoSeleccionado={datoSeleccionado} />}
      {/* Renderizar el componente ItemDetail y pasar las propiedades necesarias */}
    </div>
  );
};

export default Detalles;
