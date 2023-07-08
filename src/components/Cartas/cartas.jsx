import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/db';
import './style.scss';

const Tarjetas = () => {
    const { tipo } = useParams();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const obtenerItems = async () => {
        let collectionRef;

        if (tipo === 'vuelos') {
            collectionRef = query(collection(db, 'items'), where('tipo', '==', 'Vuelo'));
        } else if (tipo === 'alojamientos') {
            collectionRef = query(collection(db, 'items'), where('tipo', '==', 'Hotel'));
        } else {
            collectionRef = collection(db, 'items');
        }

        try {
            const querySnapshot = await getDocs(collectionRef);
            const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
            }));
            setItems(data);
        } catch (error) {
            console.log(error);
        }
        };

        obtenerItems();
    }, [tipo]);

    let detallesPath;

    if (tipo === 'vuelos') {
        detallesPath = '/detallesVuelos';
    } else if (tipo === 'alojamientos') {
        detallesPath = '/detallesAlojamientos';
    } else {
        detallesPath = ''; // Actualiza el valor según la ruta de detalles correspondiente
    }

    return (
        <div className="tarjetas-container">
        {items.map((item) => (
            <Card key={item.id} sx={{ maxWidth: 500 }} className="tarjeta">
            <CardMedia
                sx={{ height: 180 }}
                image={item.imagen} // Reemplaza con la propiedad de imagen de tu objeto de datos
                title={item.nombre}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {item.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Precio: {item.precio} USD
                </Typography>
                {/* Resto del contenido de la tarjeta */}
            </CardContent>
            <CardActions className="seccion-boton">
                <Link to={`${detallesPath}/${tipo}/${item.id}`}>
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
