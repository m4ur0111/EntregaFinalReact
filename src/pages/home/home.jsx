import React from "react";
import './style.scss';
import Tarjetas from "../../components/Cartas/cartas";
import BasicTooltip from "../../components/Categorias";

function Home(props){
    return(
        <div className='home'>
            <div className="textoMain">
                <h1>{props.titulo}</h1>
            </div>
            <BasicTooltip />
            <Tarjetas />
        </div>
    );
}

export default Home;