import React, {useState, useEffect} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import axios from "axios";
import star from "../../assets/estrela.png"
import { getViagens } from "../../servicos/viagens";
import { paises } from "../../paises";
import 'swiper/css';
//import 'swiper/css/navigation';
import 'swiper/css/pagination';
//'import 'swiper/css/scrollbar';

export default function Carousel(){
    const [flag, setFlag] = useState([])
    const [viagens, setViagens] = useState([]);
    useEffect(()=>{
        fetchViagens()
     }, [])
 
     async function fetchViagens(){
         const viagensDaAPI = await getViagens()
         setViagens(viagensDaAPI);
     }
    useEffect(() => {
        axios.get('https://restcountries.com/v2/all')
        .then(response => {
            setFlag(response.data);
        })
        .catch(error => {
            console.error('Error fetching countries:', error);
        });
    }, []);
    const getCountryFlagUrl = (countryName) => {
        const country = paises.find(pais => pais.nome === countryName);
        if (country) {
            return `https://flagsapi.com/${country.sigla}/flat/64.png`;
        } 
    }
    const getCountryCode = (countryName) => {
        const country = paises.find(pais => pais.nomeIngles === countryName.toUpperCase());
        if (country) {
            return country.nome + " - " + country.sigla
        } 
    }
    
    return(
        <div className="bg-white break-keep">
            <h2 className="text-center bg-white text-amber-500 uppercase font-bold py-5 text-3xl">Países mais visitados</h2>
            <Swiper
                style={{
                    "--swiper-pagination-color": "#326589",
                    "--swiper-pagination-bullet-inactive-color": "#999999",
                    "--swiper-pagination-bullet-inactive-opacity": "0.5",
                    "--swiper-pagination-bullet-size": "6px",
                    "--swiper-pagination-bullet-horizontal-gap": "2px"
                  }}
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={20}
                slidesPerView={2}
                navigation
                pagination={{ clickable: false }}
                scrollbar={{ draggable: true }}
                >
                    <div className="w-full h-56">
                    
                        {flag.slice(2, 25).map(country => (
                            <SwiperSlide key={country.alpha2Code} className="mb-10">
                            <div className="w-full">
                                <img className="w-full" src={getCountryCode(country.name) ? country.flags.svg : "-"} alt={country.name} />
                            </div>
                            <p className="text-blue-950 font-medium pt-3 text-center break-keep">{getCountryCode(country.name)}</p>
                            
                        </SwiperSlide>
                        ))}
                    </div>
                </Swiper>
                {viagens
                .slice(6, 7)
                .map((card, index) => (
                <div className="bg-blue-950 rounded-lg my-1 mx-5 p-3" key={index}>
                    <div>
                        <div>
                            <h3 className="text-center text-amber-500 font-bold m-2 text-2xl break-keep">Talvez você se interesse por visitar...</h3>
                            <div className="flex justify-center items-center">
                            <h2 className="text-center text-white font-bold text-xl">{card.cidade} - {card.pais}</h2>
                            <img alt="paises" src={`https://flagsapi.com/${getCountryFlagUrl(card.pais)}`} className="px-3"/>
                            </div>
                            <p className="text-center text-white text-base my-2">Data da viagem: <strong className="text-center text-white text-xl font-bold">{card.date}</strong></p>
                            <p className="text-center text-white text-base my-2">Avaliação: <strong className="text-white text-center text-xl font-bold">{card.nota}</strong></p>
                        </div>
                    </div>
                    <p className="text-center text-white text-base my-2">Comentário: <strong className="text-base text-center-text-white first-letter:uppercase">{card.descricao}</strong></p>
                </div>
                ))}
      

            <h2 className="text-center bg-white text-amber-500 font-bold uppercase text-3xl my-5">Sugestões e depoimentos</h2>
          
            
                {viagens
                .slice(1, 5)
                .map((card, index) => (
                    <div key={index} className="relative min-h-56 rounded-lg my-5 mx-5 bg-slate-300">
                    <img alt="paises" src={`https://flagsapi.com/${getCountryFlagUrl(card.pais)}`} className="static opacity-35 w-1/3 ml-48 pt-10"/>
                        <div className="absolute z-10 top-0 flex flex-col justify-center p-5 gap-2">
                            <h3 className="text-blue-950 font-bold text-4xl">{card.pais}</h3>
                            <h2 className="text-black font-bold text-2xl">{card.cidade}</h2>
                            <p className="text-black text-base font-bold">{card.date}</p>
                            <img src={star} alt="Classificação" className="w-6"/>
                            <p className="text-base text-black italic first-letter:uppercase">"{card.descricao}"</p>
                    </div>
                </div>
                ))}
        </div>
    )
}