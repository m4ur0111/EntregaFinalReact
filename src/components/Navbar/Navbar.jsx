import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import Container from 'react-bootstrap/Container';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import imagen from './img/logo-completo.png';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import CartWidget from '../CartWidget/carrito';

function BasicExample() {
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
                    <NavLink exact to="/" className="link">Inicio</NavLink>
                    <NavLink to="/categorias/vuelos" className="link">Vuelos</NavLink>
                    <NavLink to="/categorias/alojamientos" className="link">Alojamientos</NavLink>
                    <CartWidget />
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BasicExample;
