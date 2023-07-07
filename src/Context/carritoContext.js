import React, { createContext, useState } from 'react';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (dato) => {
        setCarrito((prevCarrito) => [...prevCarrito, dato]);
        console.log('Datos agregados al carrito:', [...carrito, dato]);
    };

    const limpiarCarrito = () => {
        setCarrito([]);
        console.log('Carrito limpiado');
    };

    const eliminarDelCarrito = (id) => {
        const carritoActualizado = carrito.filter((producto) => producto.id !== id);
        setCarrito(carritoActualizado);
    };

    const value = {
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        limpiarCarrito,
    };

    return <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>;
};
