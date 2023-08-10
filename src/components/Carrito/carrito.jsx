import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarritoContext } from '../../Context/carritoContext';
import './index.scss';
import CarritoListaProductos from '../common/carritoListaProductos/carritoListaProductos';
import CarritoPrecioTotal from '../common/carritoPrecioTotal/carritoPrecioTotal';

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

  const handleFinalizarCompra = () => {
    navigate(`/finalizar`, { state: { productos } });
  };

  const handleEliminarProducto = (id) => {
    eliminarDelCarrito(id);
  };  

  return (
    <div className="carrito-container">
      <h1 className="carrito-title">Carrito de compras</h1>
      {carrito.length === 0 ? (
        <>
          <p className="carrito-empty">El carrito está vacío</p>
          <button className="carrito-button" onClick={() => navigate('/')}>
            Volver a Inicio
          </button>
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
            <>
              <CarritoListaProductos productos={productos} handleEliminarProducto={handleEliminarProducto} />
              <CarritoPrecioTotal productos={productos} />
              <button className="carrito-button" onClick={handleFinalizarCompra}>
                Finalizar Compra
              </button>
              <button className="carrito-button" onClick={limpiarCarrito}>
                Limpiar Carrito
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Carrito;
