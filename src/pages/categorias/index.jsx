import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import datosVuelos from '../../vuelos.json';
import datosHoteles from '../../hoteles.json';
import ItemListContainer from '../../components/itemListContainer/itemListContainer';
import './style.scss';

const Categorias = () => {
    const { tipo } = useParams();
    const [titulo, setTitulo] = useState('Categorías'); // Título inicial

    useEffect(() => {
        if (tipo === 'vuelos') {
        setTitulo('Vuelos'); // Actualizar el título si el tipo es "vuelos"
        } else if (tipo === 'alojamientos') {
        setTitulo('Alojamientos'); // Actualizar el título si el tipo es "alojamientos"
        }
    }, [tipo]);

    let datos;
    if (tipo === 'vuelos') {
        datos = datosVuelos;
    } else if (tipo === 'alojamientos') {
        datos = datosHoteles;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', height: '100vh' }}>
        <h1 style={{ marginTop: '60px', marginBottom: '60px', fontSize: '48px', fontWeight: '300'}}>{titulo}</h1> {/* Mostrar el título */}
        <ItemListContainer datos={datos} />
        </div>
    );
};

export default Categorias;
