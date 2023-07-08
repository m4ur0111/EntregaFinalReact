import React, { useContext, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import './index.scss'
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../services/db';
import { CarritoContext } from "../../Context/carritoContext";

const Form = () => {
    const navigate = useNavigate(); // Agregar el hook useNavigate

    const { limpiarCarrito } = useContext(CarritoContext);

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [validarEmail, setValidarEmail] = useState('');
    const [numero, setNumero] = useState('');
    const [error, setError] = useState('');

    const handleFinalizarCompra = async () => {
        // Lógica para finalizar la compra y obtener el id de pago
        try {
            const orden = {
                productos: [],
                total: 0,
                fecha: new Date().toISOString()
            };

            const orderRef = await addDoc(collection(db, 'ordenes'), {
                data: orden
            });

            const idPago = orderRef.id;
            console.log('Orden guardada correctamente con ID:', idPago);
            
            // Vaciar el carrito
            limpiarCarrito();

            navigate(`/finalizado/${idPago}`);
        } catch (error) {
            console.error('Error al finalizar la compra:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar campos requeridos
        if (!nombre || !apellido || !email || !validarEmail || !numero) {
            setError('Todos los campos son requeridos');
            return;
        }

        // Validar que los emails coincidan
        if (email !== validarEmail) {
            setError('Los campos de email no coinciden');
            return;
        }

        handleFinalizarCompra();
        // Resto de la lógica para enviar el formulario
        console.log('Formulario enviado');
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
                    id="email"
                    label="Email"
                    variant="outlined"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="validarEmail"
                    label="Repetir Email"
                    variant="outlined"
                    className="form-input"
                    value={validarEmail}
                    onChange={(e) => setValidarEmail(e.target.value)}
                />
                <TextField
                    id="numero"
                    label="Telefono"
                    variant="outlined"
                    className="form-input"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
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
