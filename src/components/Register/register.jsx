import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/db';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './style.css'; // Asegúrate de tener el archivo de estilos CSS
import { Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // Mostrar mensaje de registro exitoso
            Swal.fire({
                title: 'Registro Exitoso',
                text: 'Usuario registrado correctamente.',
                icon: 'success',
                timer: 3000, // Duración del mensaje en milisegundos
                showConfirmButton: false
            }).then(() => {
                // Redirigir a la página de inicio de sesión
                window.location.href = '/login'; // Cambia '/login' por la ruta correcta
            });
        } catch (error) {
            // Verificar el tipo de error
            if (error.code === 'auth/weak-password') {
                setError('La contraseña debe tener al menos 6 caracteres.');
            } else if (error.code === 'auth/email-already-in-use') {
                setError('El correo electrónico ya está en uso. Por favor, inicia sesión.');
            } else {
                setError(error.message);
            }
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Registro de Usuario</h2>
            <form onSubmit={handleRegister} className="register-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="register-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        className="register-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="register-button">Registrarse</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <p className='inicio-sesion'>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
        </div>
    );
};

export default Register;
