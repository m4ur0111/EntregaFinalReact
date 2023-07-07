import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CarritoContext } from '../../Context/carritoContext';
import './index.scss';

const Carrito = () => {
    const { carrito, limpiarCarrito, eliminarDelCarrito } = useContext(CarritoContext);

    const handleEliminarProducto = (id) => {
        eliminarDelCarrito(id);
    };

    // Calcular la cantidad total de productos seleccionados
    const cantidadProductos = carrito.reduce((contador, producto) => {
        contador[producto.id] = (contador[producto.id] || 0) + 1;
        return contador;
    }, {});

    // Calcular el precio total de todos los productos
    const precioTotal = carrito.reduce((total, producto) => {
        return total + producto.precio;
    }, 0);

    return (
        <div className="carrito-container">
            <h1 className="carrito-title">Carrito de compras</h1>
            {carrito.length === 0 ? (
                <>
                    <p className="carrito-empty">El carrito está vacío</p>
                    <NavLink to="/" className="carrito-button">
                        Volver a Inicio
                    </NavLink>
                </>
            ) : (
                <>
                    <div className="carrito-titulos">
                        <span className="carrito-titulo">Destino</span>
                        <span className="carrito-titulo">Cantidad</span>
                        <span className="carrito-titulo">Precio</span>
                        <span className="carrito-titulo">Categoria</span>
                        <span className="carrito-titulo">Tipo</span>
                        <span className="carrito-titulo">Acciones</span>
                    </div>
                    <ul className="carrito-list">
                        {Object.keys(cantidadProductos).map((id) => {
                            const producto = carrito.find((p) => p.id === parseInt(id));
                            return (
                                <li key={id} className="carrito-item">
                                    <span className="carrito-nombre">{producto.nombre}</span>
                                    <span className="carrito-cantidad">{cantidadProductos[id]}</span>
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
                            );
                        })}
                    </ul>
                    <div className="carrito-precio-total">
                        <span className="carrito-precio-total-label">Precio Total:</span>
                        <span className="carrito-precio-total-valor">${precioTotal}</span>
                    </div>
                    <NavLink to="/finalizar" className="carrito-navlink">
                        <button className="carrito-button">Finalizar Compra</button>
                    </NavLink>
                    <button className="carrito-button" onClick={limpiarCarrito}>
                        Limpiar Carrito
                    </button>
                </>
            )}
        </div>
    );
};

export default Carrito;
