import React, { useContext } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from 'react-router-dom';
import './index.css';
import { CarritoContext } from '../../Context/carritoContext';
import Tooltip from '@mui/material/Tooltip';

function CartWidget() {
    const { carrito } = useContext(CarritoContext);

    // Obtener la cantidad de ítems diferentes en el carrito
    const cantidadCarrito = new Set(carrito.map(item => item.id)).size;

    return (
        <Tooltip title="Carrito">
        <NavLink to="/carrito" className="cart-button">
            <ShoppingCartIcon style={{ color: 'black' }} />
            <span className="cart-quantity">{cantidadCarrito}</span>
        </NavLink>
        </Tooltip>
    );
}

export default CartWidget;
