import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../services/db';
import './style.css'; // Asegúrate de tener el archivo de estilos CSS

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            
            navigate('/');
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                setError('Usuario no encontrado. Por favor, verifica tus credenciales o registra una cuenta');
            }else if(error.code === 'auth/wrong-password'){
                setError('La contraseña es incorrecta, verifique e intente nuevamente');
            }else {
                setError(error.message);
            }
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Iniciar Sesión</h2>
            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="login-input"
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
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Iniciar Sesión</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <p className='registro'>¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
        </div>
    );
};

export default Login;
