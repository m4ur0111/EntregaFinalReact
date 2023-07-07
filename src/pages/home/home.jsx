import React from "react";
import './style.scss';
import BasicTooltip from "../../components/Categorias";
import Tarjetas from "../../components/Cartas/cartas";

function Home(props){
    return(
        <>
            <div className='home'>
                <div className="textoMain">
                    <h1>{props.titulo}</h1>
                </div>
                <BasicTooltip />
                <div className="contenedor-texto">
                    <h2>Los mejores destinos en un solo lugar</h2>
                </div>
                <Tarjetas />
            </div>
        </>
    );
}

export default Home;