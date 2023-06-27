import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import './style.scss'; 

const TicketSelector = () => {
    const [cantidad, setCantidad] = useState(1);

    const decrementarCantidad = () => {
        if (cantidad > 1) {
        setCantidad(cantidad - 1);
        }
    };

    const incrementarCantidad = () => {
        setCantidad(cantidad + 1);
    };

    return (
        <div className="ticket-selector">
            <h2>Selecciona la cantidad de tickets:</h2>
            <div className="quantity-container">
                <button className="quantity-button" onClick={decrementarCantidad}>
                -
                </button>
                <span className="quantity">{cantidad}</span>
                <button className="quantity-button" onClick={incrementarCantidad}>
                +
                </button>
            </div>
            <Button variant="contained" size='large' startIcon={<CheckIcon />} style={{ backgroundColor: '#1d837a' }}> 
                Confirmar
            </Button>
        </div>
    );
};

export default TicketSelector;
