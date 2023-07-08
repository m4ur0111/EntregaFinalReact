import React from 'react';
import { useParams } from 'react-router-dom';
import './index.css';

const Pago = () => {
    const { id } = useParams();

    return (
        <>
            <div className="pago-container">
                <h1 className="pago-title">Pago Realizado Correctamente</h1>
                <p className="pago-id">ID de Pago: {id}</p>
            </div>

        </>
    );
};

export default Pago;
