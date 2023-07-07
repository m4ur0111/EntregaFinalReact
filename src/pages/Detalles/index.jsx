import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import hoteles from '../../hoteles.json';
import vuelos from '../../vuelos.json';
import './style.scss';
import Button from 'react-bootstrap/Button';
import Alert from '@mui/material/Alert';
import { CarritoContext } from '../../Context/carritoContext';

const Detalles = () => {
  const { tipo, id } = useParams();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const [nombre, setNombre] = useState('');
  const [datoSeleccionado, setDatoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mostrarError, setMostrarError] = useState(false);

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
      setDatoSeleccionado(dato);
    }
  }, [tipo, id]);

  let detallesTitulo;
  let detallesContenido;

  if (tipo === 'alojamientos') {
    detallesTitulo = 'Detalles del Alojamiento';
    const hotel = hoteles.find((hotel) => hotel.id === parseInt(id));

    const divStyle = {
      background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${hotel.imagen})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '550px',
      height: '250px',
      borderRadius: '12px',
      marginBottom: '50px',
    };

    if (!hotel) {
      detallesContenido = <div>No se encontró el alojamiento</div>;
    } else {
      detallesContenido = (
        <div className="contenedor-datos">
          <div className="detalles-container" style={divStyle}>
            <p className="titulo-viaje">Destino: {hotel.nombre}</p>
          </div>
          <p>
            <span>Categoria:</span> {hotel.categoria}
          </p>
          <p>
            <span>Ubicación:</span> {hotel.ubicacion}
          </p>
          <p>
            <span>Incluye comida:</span> {hotel.incluyeComida ? 'Sí' : 'No'}
          </p>
          <p>
            <span>Incluye transporte:</span> {hotel.incluyeTransporte ? 'Sí' : 'No'}
          </p>
          <p>
            <span>Precio:</span> {hotel.precio} USD
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
      width: '550px',
      height: '250px',
      borderRadius: '12px',
      marginBottom: '50px',
    };

    if (!vuelo) {
      detallesContenido = <div>No se encontró el vuelo</div>;
    } else {
      detallesContenido = (
        <div className="contenedor-datos">
          <div className="detalles-container" style={divStyle2}>
            <p className="titulo-viaje">Destino: {vuelo.nombre}</p>
          </div>
          <p>
            <span>Categoria:</span> {vuelo.categoria}
          </p>
          <p>
            <span>Duración:</span> {vuelo.duracion}
          </p>
          <p>
            <span>Incluye comida:</span> {vuelo.incluyeComida ? 'Sí' : 'No'}
          </p>
          <p>
            <span>Incluye transporte:</span> {vuelo.incluyeTransporte ? 'Sí' : 'No'}
          </p>
          <p>
            <span>Precio:</span> {vuelo.precio} USD
          </p>
        </div>
      );
    }
  } else {
    return <div>No se encontró el tipo de datos</div>;
  }

  const handleCantidadChange = (e) => {
    const nuevaCantidad = parseInt(e.target.value);

    if (nuevaCantidad > 5) {
      setMostrarError(true);
    } else {
      setCantidad(nuevaCantidad);
      setMostrarError(false);
    }
  };

  const handleClickAgregar = () => {
    const producto = {
      ...datoSeleccionado,
      cantidad: cantidad,
    };

    for (let i = 0; i < cantidad; i++) {
      agregarAlCarrito(producto);
    }

    setMostrarAlerta(true);
    console.log('Datos agregados al carrito');
  };

  return (
    <div className="contenedor-general">
      <div className="detalles-container">
        <p className="titulo-viaje">
          {tipo === 'alojamientos' ? 'Alojamiento:' : 'Vuelo:'} {nombre}
        </p>
      </div>
      <h2 className="titulo-detalles">{detallesTitulo}</h2>
      {detallesContenido}

      <div className="cantidad-container">
        <label htmlFor="cantidad">Cantidad:</label>
        <input
          type="number"
          id="cantidad"
          name="cantidad"
          min="1"
          max="5"
          value={cantidad}
          onChange={handleCantidadChange}
          className="cantidad-input"
        />
      </div>
      {mostrarError && <p className="error-mensaje">La cantidad máxima permitida es 5</p>}

      <Button variant="primary" onClick={handleClickAgregar} style={{ marginBottom: '20px' }}>
        Agregar al carrito
      </Button>

      {mostrarAlerta && (
        <Alert severity="success" onClose={() => setMostrarAlerta(false)}>
          Agregado al carrito correctamente!
        </Alert>
      )}
    </div>
  );
};

export default Detalles;
