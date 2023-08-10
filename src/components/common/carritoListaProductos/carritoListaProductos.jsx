import React from 'react';

const CarritoListaProductos = ({ productos, handleEliminarProducto }) => {
    return (
        <ul className="carrito-list">
        {productos.map((producto) => (
            <li key={producto.id} className="carrito-item">
            <span className="carrito-nombre">{producto.nombre}</span>
            <span className="carrito-cantidad">{producto.cantidad}</span>
            <span className="carrito-precio">${producto.precio}</span>
            <span className="carrito-categoria">{producto.categoria}</span>
            <span className="carrito-tipo">{producto.tipo}</span>
            <button
                className="carrito-button-eliminar"
                onClick={() => handleEliminarProducto(producto.id)}
            >
                Eliminar
            </button>
            </li>
        ))}
        </ul>
    );
};

export default CarritoListaProductos;
