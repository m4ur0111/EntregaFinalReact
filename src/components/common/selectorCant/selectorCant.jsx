import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import './style.scss';

const TicketSelector = () => {

  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(0);
  const [error, setError] = useState(false);

  const decrementarCantidad = () => {
    if (cantidadSeleccionada > 1) {
      setCantidadSeleccionada(cantidadSeleccionada - 1);
      setError(false);
    }
  };

  const incrementarCantidad = () => {
    if (cantidadSeleccionada < 5) {
      setCantidadSeleccionada(cantidadSeleccionada + 1);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleConfirmar = () => {
    console.log({cantidadSeleccionada})
  };

  const mensajeError = () => {
    if (error) {
      return (
        <p className="error-message" style={{ color: 'red', fontWeight: 'bold', marginTop: '10px' }}>
          No se pueden seleccionar más de 5 tickets.
        </p>
      );
    }
    return null;
  };

  return (
    <div className="ticket-selector">
      <h2>Selecciona la cantidad de tickets:</h2>
      <h5>Cant máxima 5 por persona</h5>
      <div className="quantity-container">
        <button className="quantity-button" onClick={decrementarCantidad}>
          -
        </button>
        <span className="quantity">{cantidadSeleccionada}</span>
        <button className="quantity-button" onClick={incrementarCantidad}>
          +
        </button>
      </div>
      {mensajeError()}
      <Button
        variant="contained"
        size="large"
        startIcon={<CheckIcon />}
        style={{ backgroundColor: '#1d837a' }}
        onClick={handleConfirmar}
      >
        Confirmar
      </Button>
    </div>
  );
};

export default TicketSelector;
