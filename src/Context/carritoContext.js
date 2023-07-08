import React, { createContext, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../services/db';

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

    const obtenerProductoPorId = async (id) => {
        const itemDb = doc(db, 'items', id);
        const product = await getDoc(itemDb);

        if (product.exists()) {
        return product.data();
        } else {
        return null;
        }
    };

    const value = {
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        limpiarCarrito,
        obtenerProductoPorId,
    };

    return <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>;
};
