import React, { useContext, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import './index.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../services/db';
import { CarritoContext } from '../../Context/carritoContext';

const Form = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Obtener la ubicación actual

    const { limpiarCarrito } = useContext(CarritoContext);

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            setUser(user);
        }
        });
        return () => unsubscribe();
    }, []);

    const handleFinalizarCompra = async () => {
        try {
        // Obtener los datos de los productos desde la ubicación
        const productos = location.state.productos;

        const orden = {
            userId: user.uid,
            productos: productos,
            total: productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0),
            fecha: new Date().toISOString(),
        };

        const orderRef = await addDoc(collection(db, 'ordenes'), {
            data: orden,
        });

        const idPago = orderRef.id;
        console.log('Orden guardada correctamente con ID:', idPago);

        limpiarCarrito();

        navigate(`/finalizado/${idPago}`);
        } catch (error) {
        console.error('Error al finalizar la compra:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            setError('Debes iniciar sesión para finalizar la compra');
            return;
        }

        if (!nombre || !apellido || !telefono || !email) {
        setError('Todos los campos son requeridos');
        return;
        }

        if (user && email !== user.email) {
        setError('El email no coincide con el email del usuario registrado');
        return;
        }

        handleFinalizarCompra();
        setError('');
    };

    return (
        <>
            <h1 className="titulo-form">Finalizar Compra</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <TextField
                    id="nombre"
                    label="Nombre"
                    variant="outlined"
                    className="form-input"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <TextField
                    id="apellido"
                    label="Apellido"
                    variant="outlined"
                    className="form-input"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                />
                <TextField
                    id="telefono"
                    label="Teléfono"
                    variant="outlined"
                    className="form-input"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                />
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {error && <Alert severity="error" className="form-alert">{error}</Alert>}
                <Button variant="contained" color="primary" className="form-button" type="submit">
                    Confirmar Pedido
                </Button>
            </form>
        </>
    );
}

export default Form;
