import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import imagen from './img/logo-completo.png';
import * as React from 'react';
import { auth } from '../../services/db'
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut, getAuth, onAuthStateChanged } from 'firebase/auth';
import Tooltip from '@mui/material/Tooltip';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; 
import CartWidget from '../CartWidget/carrito';
import './style.scss';

function BasicExample() {
    const [user, setUser] = React.useState(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <Navbar expand="lg" className="contenedor-nav">
            <Container>
                <NavLink to="/" className="Logo">
                    <Navbar.Brand>
                        <img src={imagen} alt="Logo de la empresa" />
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto mobile-respon">
                        <NavLink exact="true" to="/" className="link">Inicio</NavLink>
                        <NavLink to="/categorias/vuelos" className="link">Vuelos</NavLink>
                        <NavLink to="/categorias/alojamientos" className="link">Alojamientos</NavLink>
                        <CartWidget />
                        <div className="tooltip-content">
                            {user ? (
                                <>
                                    <Tooltip title="Perfil">
                                        <NavLink to="/perfil" className="link">
                                            <PersonIcon style={{ color: '#1d837a' }} />
                                        </NavLink>
                                    </Tooltip>
                                    <Tooltip title="Cerrar Sesión">
                                        <button className="btn-logout" onClick={handleLogout}>
                                            <ExitToAppIcon style={{ color: 'red' }} />
                                        </button>
                                    </Tooltip>
                                </>
                            ) : (
                                <Tooltip title="Perfil">
                                    <NavLink to="/login" className="link">
                                        <PersonIcon style={{ color: '#1d837a' }} />
                                    </NavLink>
                                </Tooltip>
                            )}
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BasicExample;
