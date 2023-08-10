import React, { useEffect, useState } from 'react';
import { db } from '../../services/db';
import { collection, getDocs, query, where } from 'firebase/firestore';
import './style.css'; 

const ProfileOrders = ({ customerId }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(customerId)

    const fetchOrders = async () => {
        const ordersRef = collection(db, 'ordenes');
        const customerOrdersQuery = query(ordersRef, where('data.userId', '==', customerId)); 

        try {
            const querySnapshot = await getDocs(customerOrdersQuery);
            const ordersData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setOrders(ordersData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    return (
        <div className="profile-orders-container">
            <h2 className="profile-orders-heading">Lista de Órdenes</h2>
            {loading ? (
                <p className="loading-message">Cargando órdenes...</p>
            ) : orders.length === 0 ? (
                <p className="no-orders-message">No se han encontrado órdenes para este cliente.</p>
            ) : (
                <ul className="orders-list">
                    {orders.map((order) => (
                        <li key={order.id} className="order-item">
                            <p className="order-id"><strong>ID del Pedido:</strong> {order.id}</p>
                            <p className="order-date"><strong>Fecha:</strong> {order.data.fecha}</p>
                            <p className="order-total"><strong>Total:</strong> ${order.data.total ? order.data.total.toFixed(2) : 'N/A'}</p>
                            <p className="order-products"><strong>Productos:</strong></p>
                            <ul className="product-list">
                                {order.data.productos.map((producto, prodIndex) => (
                                    <li key={prodIndex} className="product-item">
                                        <p><strong>Nombre:</strong> {producto.nombre}</p>
                                        <p><strong>Cantidad:</strong> {producto.cantidad}</p>
                                        <p><strong>Categoría:</strong> {producto.categoria}</p>
                                        <p><strong>Descripción:</strong> {producto.descripcion}</p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );      
};

export default ProfileOrders;
