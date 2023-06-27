import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import datosVuelos from '../../vuelos.json';
import datosHoteles from '../../hoteles.json';
import './style.scss';

const Tarjetas = () => {
    const { tipo } = useParams();

    let datosMostrar;
    let detallesPath;

    if (tipo === 'vuelos') {
        datosMostrar = datosVuelos;
        detallesPath = '/detallesVuelos';
    } else if (tipo === 'alojamientos') {
        datosMostrar = datosHoteles;
        detallesPath = '/detallesAlojamientos';
    } else {
        return <div>No se encontró el tipo de datos</div>;
    }

    return (
        <div className="tarjetas-container">
        {datosMostrar.map((viaje) => (
            <Card key={viaje.id} sx={{ maxWidth: 500 }} className="tarjeta">
            <CardMedia
                sx={{ height: 180 }}
                image={viaje.imagen} // Reemplaza con la propiedad de imagen de tu objeto de datos
                title={viaje.destino}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {viaje.destino}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Precio: {viaje.precio} USD
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Categoría: {viaje.categoria}
                </Typography>
            </CardContent>
            <CardActions className="seccion-boton">
            <Link to={`${detallesPath}/${tipo}/${viaje.id}`}>
                <Button variant="contained" size="large" style={{ backgroundColor: '#1d837a' }}>
                    Ver Más
                </Button>
                </Link>
            </CardActions>
            </Card>
        ))}
        </div>
    );
};

export default Tarjetas;
