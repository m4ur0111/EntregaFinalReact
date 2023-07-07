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
import { CarritoProvider } from './Context/carritoContext';


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
            </Routes>
          </CarritoProvider>
      </BrowserRouter>
  );
}

export default App;
