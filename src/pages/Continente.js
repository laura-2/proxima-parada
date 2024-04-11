import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import { getViagens } from "../servicos/viagens";
import axios from "axios";
import { paises } from "../paises";
import { useParams } from "react-router-dom";

export default function Continente(){
    const {nomeContinente} = useParams()
    const [viagens, setViagens] = useState([]);
    useEffect(()=>{
        fetchViagens()
     }, [])
 
     async function fetchViagens(){
         const viagensDaAPI = await getViagens()
         setViagens(viagensDaAPI);
     }

     const [region, setRegion] = useState([])
    useEffect(() => {
        axios.get('https://restcountries.com/v2/all')
        .then(response => {
            setRegion(response.data);
        })
        .catch(error => {
            console.error('Error fetching countries:', error);
        });
    }, []);

        function obterContinente(pais) {
            const paisesPortugues = paises.find(item => item.nome === pais)?.nome;
            if (!paisesPortugues) return ""
            const continenteInfo = region.find(item => item.translations.pt.toLowerCase() === paisesPortugues.toLowerCase());
            return continenteInfo ? continenteInfo.region : "Continente não encontrado";
        }

    return (<>
        <Header />
        <div className="bg-blue-950 py-5">
        {viagens.filter(continente => obterContinente(continente.pais) === nomeContinente).length > 0 ?
        viagens.filter(continente => obterContinente(continente.pais) === nomeContinente)
        .map((viagem, index) => {
                return <Card {...viagem} key={index}/>  
            }) : <p className="text-white text-center text-xl">Sem registros de viagem</p>
        }
        </div>
        </>
    )

}