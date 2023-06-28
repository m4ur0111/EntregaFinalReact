import React from 'react';
import './global.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/home/home';
import Detalles from './pages/Detalles';
import Categorias from './pages/categorias/index';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home titulo="La mejor página para comparar precios!" />} />
        <Route path="/detallesVuelos/:tipo/:id" element={<Detalles />} />
        <Route path="/detallesAlojamientos/:tipo/:id" element={<Detalles />} />
        <Route path="/categorias/:tipo" element={<Categorias />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
