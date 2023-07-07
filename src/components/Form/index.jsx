import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './index.scss'

const Form = () => {

    return (
        <>
            <h1 className="titulo-form">Finalizar Compra</h1>
            <form className="form-container">
                <TextField id="nombre" label="Nombre" variant="outlined" className="form-input" />
                <TextField id="apellido" label="Apellido" variant="outlined" className="form-input" />
                <TextField id="email" label="Email" variant="outlined" className="form-input" />
                <TextField id="validarEmail" label="Repetir Email" variant="outlined" className="form-input" />
                <TextField id="numero" label="Telefono" variant="outlined" className="form-input" />
                <Button variant="contained" color="primary" className="form-button">
                    Comprar
                </Button>
            </form>
        </>
    );
}

export default Form;
