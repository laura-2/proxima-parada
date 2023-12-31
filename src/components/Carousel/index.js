import React, {useState, useEffect} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import axios from "axios";
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
        <div className="bg-white">
            <h2 className="text-center bg-white text-amber-500 uppercase font-bold py-8 text-3xl">Países mais visitados</h2>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={20}
                slidesPerView={6}
                navigation
                pagination={{ clickable: false }}
                scrollbar={{ draggable: true }}
                >
                    <div className="w-full h-56">
                    
                        {flag.slice(2, 30).map(country => (
                            <SwiperSlide key={country.alpha2Code} className="mb-10">
                            <div className="w-full">
                                <img className="w-full" src={getCountryCode(country.name) ? country.flags.svg : "-"} alt={country.name} />
                            </div>
                            <p className="text-blue-950 font-medium pt-3 pl-5">{getCountryCode(country.name)}</p>
                            
                        </SwiperSlide>
                        ))}
                    </div>
                </Swiper>
                {viagens
                .slice(6, 7)
                .map((card, index) => (
                <div className="bg-blue-950 rounded-lg my-1 mx-5 py-1" key={index}>
                    <div>
                        <div>
                            <h3 className="text-center text-amber-500 font-bold m-2 text-2xl">Talvez você se interesse por visitar...</h3>
                            <div className="flex justify-center">
                            <h2 className="text-center text-white font-bold pt-5 text-xl">{card.cidade} - {card.pais}</h2>
                            <img alt="paises" src={`https://flagsapi.com/${getCountryFlagUrl(card.pais)}/flat/64.png`} className=""/>
                            </div>
                            <p className="text-center text-white text-base my-2">Data da viagem: <strong className="text-center text-white text-xl font-bold">{card.date}</strong></p>
                            <p className="text-center text-white text-base my-2">Avaliação: <strong className="text-white text-center text-xl font-bold">{card.nota}</strong></p>
                        </div>
                    </div>
                    <p className="text-center text-white text-base my-2">Comentário: <strong className="text-base text-center-text-white first-letter:uppercase">{card.descricao}</strong></p>
                </div>
                ))}
      

            <h2 className="text-center bg-white text-amber-500 font-bold uppercase text-3xl m-5">Sugestões e depoimentos</h2>
            <div className="grid grid-cols-2 bg-white mb-10">
            
                {viagens
                .slice(1, 5)
                .map((card, index) => (
                    <div className="bg-blue-950 shadow-2xl rounded-lg my-2 mx-5 py-1" key={index}>
                    <div>
                        <div>
                        <div className="flex justify-center">
                            <h3 className="text-center text-amber-500 font-bold pt-4 text-3xl">{card.pais}</h3>
                            <img alt="paises" src={`https://flagsapi.com/${getCountryFlagUrl(card.pais)}/flat/64.png`} className="px-5"/>
                            </div>
                            <h2 className="text-center text-white pt-1 text-xl my-2">Cidade: <strong className="text-center text-white font-bold pt-1 text-xl">{card.cidade}</strong></h2>
                            <p className="text-center text-white text-base my-2">Data da viagem: <strong className="text-center text-white text-xl font-bold">{card.date}</strong></p>
                            <p className="text-center text-white text-base my-2">Avaliação: <strong className="text-white text-center text-xl font-bold">{card.nota}</strong></p>
                        </div>
                    </div>
                    <p className="text-center text-white text-base">Comentário: <strong className="text-base text-center-text-white first-letter:uppercase">{card.descricao}</strong>
                    </p>
                </div>
                ))}
                        </div>
        </div>
    )
}