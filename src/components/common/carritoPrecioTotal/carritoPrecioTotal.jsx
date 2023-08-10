import React from 'react';

const CarritoPrecioTotal = ({ productos }) => {
    const precioTotal = productos.reduce((total, producto) => {
        return total + producto.precio * producto.cantidad;
    }, 0);

    return (
        <div className="carrito-precio-total">
        <span className="carrito-precio-total-label">Precio Total:</span>
        <span className="carrito-precio-total-valor">${precioTotal.toFixed(2)}</span>
        </div>
    );
};

export default CarritoPrecioTotal;
