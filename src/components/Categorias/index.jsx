import * as React from 'react';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import KingBedIcon from '@mui/icons-material/KingBed';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './style.scss';

export default function BasicTooltip() {
    return (
        <div className='categoriasIcono'>
        <h1 className='titulo'>Categorías</h1>
        <div className='contenedorIconos'>
            <Link to="/categorias/vuelos">
            <Button variant="contained" size='large' startIcon={<FlightTakeoffIcon />} style={{ backgroundColor: '#1d837a' }}>
                Vuelos
            </Button>
            </Link>

            <Link to="/categorias/alojamientos">
            <Button variant="contained" size='large' startIcon={<KingBedIcon />} style={{ backgroundColor: '#1d837a' }}> 
                Alojamientos
            </Button>
            </Link>

        </div>
        </div>
    );
}