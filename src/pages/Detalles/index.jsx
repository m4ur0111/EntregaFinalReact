import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import hoteles from '../../hoteles.json';
import vuelos from '../../vuelos.json';
import TicketSelector from '../../components/common/selectorCant/selectorCant';
import './style.scss';

const Detalles = () => {
  const { tipo, id } = useParams();
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    let datos;
    if (tipo === 'vuelos') {
      datos = vuelos;
    } else if (tipo === 'alojamientos') {
      datos = hoteles;
    }

    const dato = datos.find((dato) => dato.id === parseInt(id));
    if (dato) {
      setNombre(dato.nombre);
    }
  }, [tipo, id]);

  let detallesTitulo;
  let detallesContenido;

  if (tipo === 'hotel') {
    detallesTitulo = 'Detalles del Alojamiento';
    const hotel = hoteles.find((hotel) => hotel.id === parseInt(id));

    if (!hotel) {
      detallesContenido = <div>No se encontró el alojamiento</div>;
    } else {
      detallesContenido = (
        <div className="contenedor-datos">
          <p>
            <span>Nombre:</span> {hotel.nombre}
          </p>
          <p>
            <span>Precio:</span> {hotel.precio} USD
          </p>
          <p>
            <span>Categoría:</span> {hotel.categoria}
          </p>
          <p>
            <span>Ubicación:</span> {hotel.ubicacion}
          </p>
          <p>
            <span>Incluye transporte:</span> {hotel.incluyeTransporte ? 'Sí' : 'No'}
          </p>
          <p>
            <span>Descripción:</span> {hotel.descripcion}
          </p>
        </div>
      );
    }
  } else if (tipo === 'vuelos') {
    detallesTitulo = 'Detalles del Vuelo';
    const vuelo = vuelos.find((vuelo) => vuelo.id === parseInt(id));

    const divStyle2 = {
      background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${vuelo.imagen})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '950px',
      height: '450px',
      borderRadius: '12px',
      marginBottom: '50px',
  };

    if (!vuelo) {
      detallesContenido = <div>No se encontró el vuelo</div>;
    } else {
      detallesContenido = (
        <div className="contenedor-datos">
          <div className="detalles-container" style={divStyle2}>
            <p className='titulo-viaje'>Destino: {vuelo.nombre}</p>
          </div>
          <p><span>Categoria:</span> {vuelo.categoria}</p>
          <p><span>Duración:</span> {vuelo.duracion}</p>
          <p><span>Incluye comida:</span> {vuelo.incluyeComida ? 'Sí' : 'No'}</p>
          <p><span>Incluye transporte:</span> {vuelo.incluyeTransporte ? 'Sí' : 'No'}</p>
          <p><span>Precio:</span> {vuelo.precio} USD</p>
        </div>
      );
    }
  } else {
    return <div>No se encontró el tipo de datos</div>;
  }

  return (
    <div className="contenedor-general">
      <div className="detalles-container">
        <p className="titulo-viaje">
          {tipo === 'hoteles' ? 'Alojamiento:' : 'Vuelo:'} {nombre}
        </p>
      </div>
      <h2 className="titulo-detalles">{detallesTitulo}</h2>
      {detallesContenido}
      <TicketSelector />
    </div>
  );
};

export default Detalles;
