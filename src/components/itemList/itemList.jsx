import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './style.scss'; // Importar los estilos de SCSS

const ItemList = ({ items, detallesPath }) => {
    const { tipo } = useParams();

    return (
        <div className="tarjetas-container">
            {items.map((item) => (
                <Card key={item.id} sx={{ maxWidth: 500 }} className="tarjeta">
                    <CardMedia sx={{ height: 180 }} image={item.imagen} title={item.nombre} />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" className="destino">
                            {item.nombre}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className="precio">
                            Precio: {item.precio} USD
                        </Typography>
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

export default ItemList;
