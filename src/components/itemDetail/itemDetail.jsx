import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from '@mui/material/Alert';
import { CarritoContext } from '../../Context/carritoContext';
import './style.scss'; // Importa el archivo de estilos

const ItemDetail = ({ tipo, datoSeleccionado }) => {
    const { carrito } = useContext(CarritoContext);
    const [cantidad, setCantidad] = useState(1);
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mostrarError, setMostrarError] = useState(false);
    const { agregarAlCarrito } = useContext(CarritoContext);

    const handleCantidadChange = (e) => {
        const nuevaCantidad = parseInt(e.target.value);
        setCantidad(nuevaCantidad);
        setMostrarError(nuevaCantidad > 5);
    };

    const handleClickAgregar = () => {
        const cantidadExistenteEnCarrito = carrito.reduce((total, item) => {
        if (item.id === datoSeleccionado.id) {
            return total + item.cantidad;
        }
        return total;
        }, 0);

        if (cantidad + cantidadExistenteEnCarrito > 5) {
        setMostrarError(true);
        return;
        }

        for (let i = 0; i < cantidad; i++) {
        const producto = {
            ...datoSeleccionado,
            cantidad: 1,
        };
        agregarAlCarrito(producto);
        }

        setMostrarAlerta(true);
    };

    const divStyle = {
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${datoSeleccionado.imagen})`, // Corregido aquí
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '600px',
        height: '300px',
        borderRadius: '12px',
        marginBottom: '50px',
    };

    return (
        <div className="contenedor-general">
        <div className="detalles-container" style={divStyle}>
            <p className="titulo-viaje">Destino: {datoSeleccionado.nombre}</p>
        </div>
        <p><span className='tit-desc'>Categoria:</span> {datoSeleccionado.categoria}</p>
        <p><span className='tit-desc'>Precio:</span> ${datoSeleccionado.precio}</p>
        <p><span className='tit-desc'>Tipo:</span> {datoSeleccionado.tipo}</p>
        <p><span className='tit-desc'>Duración:</span> {datoSeleccionado.duracion}</p>
        <p><span className='tit-desc'>Descripción:</span> {datoSeleccionado.descripcion}</p>

        {/* Input para la cantidad */}
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
        {mostrarError && <p className="error-mensaje">La cantidad máxima permitida por cuenta es 5</p>}

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

export default ItemDetail;
