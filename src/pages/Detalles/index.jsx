import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/db';
import './style.scss';
import Button from 'react-bootstrap/Button';
import Alert from '@mui/material/Alert';
import { CarritoContext } from '../../Context/carritoContext';

const Detalles = () => {
  const { tipo, id } = useParams();
  const [nombre, setNombre] = useState('');
  const [datoSeleccionado, setDatoSeleccionado] = useState(null);
  const { agregarAlCarrito } = useContext(CarritoContext);
  const [cantidad, setCantidad] = useState(1);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mostrarError, setMostrarError] = useState(false);

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

  const renderDetallesContenido = () => {
    if (!datoSeleccionado) {
      return <div>No se encontró el {tipo}</div>;
    }

    const {
      nombre,
      categoria,
      ubicacion,
      incluyeComida,
      incluyeTransporte,
      precio,
      descripcion,
      imagen,
      duracion
    } = datoSeleccionado;

    const divStyle = {
      background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imagen})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '550px',
      height: '250px',
      borderRadius: '12px',
      marginBottom: '50px',
    };

    return (
      <div className="contenedor-datos">
        <div className="detalles-container" style={divStyle}>
          <p className="titulo-viaje">Destino: {nombre}</p>
        </div>
        <p>
          <span>Categoria:</span> {categoria}
        </p>
        {tipo === 'alojamientos' && (
          <>
            <p>
              <span>Ubicación:</span> {ubicacion}
            </p>
            <p>
              <span>Incluye comida:</span> {incluyeComida ? 'Sí' : 'No'}
            </p>
            <p>
              <span>Incluye transporte:</span> {incluyeTransporte ? 'Sí' : 'No'}
            </p>
          </>
        )}
        {tipo === 'vuelos' && (
          <>
            <p>
              <span>Duración:</span> {duracion}
            </p>
          </>
        )}
        <p>
          <span>Precio:</span> {precio} USD
        </p>
        <p>
          <span>Descripción:</span> {descripcion}
        </p>
      </div>
    );
  };

  const handleCantidadChange = (e) => {
    const nuevaCantidad = parseInt(e.target.value);
    setCantidad(nuevaCantidad);
    setMostrarError(nuevaCantidad > 5);
  };

  const handleClickAgregar = () => {
    for (let i = 0; i < cantidad; i++) {
      const producto = {
        ...datoSeleccionado,
        cantidad: 1,
      };
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
      <h2 className="titulo-detalles">Detalles del {tipo}</h2>
      {renderDetallesContenido()}

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
