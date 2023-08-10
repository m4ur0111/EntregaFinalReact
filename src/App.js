import React from 'react';
import './global.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/home/home';
import Detalles from './pages/Detalles';
import Categorias from './pages/categorias/index';
import Carrito from './components/Carrito/carrito';
import Form from './components/Form';
import Pago from './components/pagoFinalizado';
import { CarritoProvider } from './Context/carritoContext';
import Register from './components/Register/register';
import Login from './components/Login/login';
import Profile from './components/Perfil/perfil';

function App() {
  return (
      <BrowserRouter>
        <CarritoProvider>
          <Navbar />
            <Routes>
              <Route path="/" element={<Home titulo="La mejor página para comparar precios!" />} />
              <Route path="/detallesVuelos/:tipo/:id" element={<Detalles />} />
              <Route path="/detallesAlojamientos/:tipo/:id" element={<Detalles />} />
              <Route path="/categorias/:tipo" element={<Categorias />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/finalizar" element={<Form />} />
              <Route path="/finalizado/:id" element={<Pago />} />
              <Route path="/registro" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="perfil" element={<Profile />} />
            </Routes>
          </CarritoProvider>
      </BrowserRouter>
  );
}

export default App;
