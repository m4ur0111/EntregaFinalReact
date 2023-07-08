import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CarritoContext } from '../../Context/carritoContext';
import './index.scss';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../services/db';

const Carrito = () => {
  const { carrito, limpiarCarrito, eliminarDelCarrito, obtenerProductoPorId } = useContext(CarritoContext);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerProductos = async () => {
      const productosPromises = carrito.map(async (producto) => {
        const productData = await obtenerProductoPorId(producto.id);
        return { id: producto.id, ...productData, cantidad: producto.cantidad };
      });

      const productosData = await Promise.all(productosPromises);

      // Agrupar productos por su ID y sumar las cantidades
      const productosAgrupados = productosData.reduce((agrupados, producto) => {
        const existente = agrupados.find((p) => p.id === producto.id);
        if (existente) {
          existente.cantidad += producto.cantidad;
        } else {
          agrupados.push(producto);
        }
        return agrupados;
      }, []);

      setProductos(productosAgrupados);
      setLoading(false);
    };

    obtenerProductos();
  }, [carrito, obtenerProductoPorId]);

  const handleFinalizarCompra = async () => {
    // Lógica para finalizar la compra y obtener el id de pago
    try {
      const orden = {
        productos: productos,
        total: productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0),
        fecha: new Date().toISOString()
      };

      const orderRef = await addDoc(collection(db, 'ordenes'), {
        data: orden
      });

      const idPago = orderRef.id;
      console.log('Orden guardada correctamente con ID:', idPago);

      // Redirigir al formulario de compra
      navigate(`/finalizar/${idPago}`);
    } catch (error) {
      console.error('Error al finalizar la compra:', error);
    }
  };

  const handleEliminarProducto = (id) => {
    eliminarDelCarrito(id);
  };

  // Calcular el precio total de todos los productos
  const precioTotal = productos.reduce((total, producto) => {
    return total + producto.precio * producto.cantidad;
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
          {loading ? (
            <p className="carrito-loading">Cargando productos...</p>
          ) : (
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
          )}
          <div className="carrito-precio-total">
            <span className="carrito-precio-total-label">Precio Total:</span>
            <span className="carrito-precio-total-valor">${precioTotal.toFixed(2)}</span>
          </div>
          <button className="carrito-button" onClick={handleFinalizarCompra}>
            Finalizar Compra
          </button>
          <button className="carrito-button" onClick={limpiarCarrito}>
            Limpiar Carrito
          </button>
        </>
      )}
    </div>
  );
};

export default Carrito;
