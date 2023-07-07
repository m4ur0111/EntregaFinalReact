import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { db } from '../../services/db';
import './style.scss';
import { getDocs } from 'firebase/firestore';

const Tarjetas = () => {
    const { tipo } = useParams();

    const [datosMostrar, setDatosMostrar] = useState([]);
    const detallesPath = tipo === 'vuelos' ? '/detallesVuelos' : '/detallesAlojamientos';

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const querySnapshot = await getDocs(db.collection('hoteles')); // Reemplaza 'hoteles' con el nombre de tu colección en Firestore
                const datos = querySnapshot.docs.map((doc) => doc.data());
                setDatosMostrar(datos);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        obtenerDatos();
    }, []);

    if (datosMostrar.length === 0) {
        return <div>No se encontraron datos</div>;
    }

    return (
        <div className="tarjetas-container">
            {datosMostrar.map((viaje) => (
                <Card key={viaje.id} sx={{ maxWidth: 500 }} className="tarjeta">
                    <CardMedia sx={{ height: 180 }} image={viaje.imagen} title={viaje.destino} />
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
