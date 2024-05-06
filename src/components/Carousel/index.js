import React, {useState, useEffect} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import axios from "axios";
import { paises } from "../../paises";
import { Rating } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import 'swiper/css';
//import 'swiper/css/navigation';
import 'swiper/css/pagination';
//'import 'swiper/css/scrollbar';

export default function Carousel(){
    const [flag, setFlag] = useState([])
    const [viagens, setViagens] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/form');
            setViagens(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
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
                breakpoints={{
                    768: {
                      slidesPerView: 5,
                    }
                  }}
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
                {viagens.length > 0 ? viagens
                .slice(0,1)
                .map((card, index) => (
                <div className="bg-blue-950 rounded-lg my-1 mx-5 p-3 text-left md:w-2/3 md:my-0 md:mx-auto" key={index}>
                    <div>
                            <h3 className="text-center text-amber-500 font-bold text-2xl break-keep">Talvez você se interesse por visitar...</h3>
                            <div className="flex justify-center items-center">
                            <h2 className="text-white text-xl font-bold">{card.city} - {card.country}</h2>
                            <img alt="paises" src={`https://flagsapi.com/${getCountryFlagUrl(card.country)}`} className="px-3"/>
                            </div>
                            <p className="text-white text-base">{card.date}</p>
                            <Rating value={card.rating} 
                    read-only="true"
                    style={{color: "white"}}
                    emptyIcon={<StarIcon style={{ opacity: 1 }}/>}/>
                    </div>
                    <p className="text-sm text-white first-letter:uppercase italic">"{card.description}"</p>
                </div>
                )): <p className="text-base text-white">Sem registros de viagens para compartilhar </p>}
      

            <h2 className="text-center bg-white text-amber-500 font-bold uppercase text-3xl my-5">Sugestões e depoimentos</h2>
          
            
                {viagens.length > 0 ? viagens
                .slice(1, 5)
                .map((card, index) => (
                    <div className="bg-blue-950 shadow-2xl rounded-lg my-2 mx-5 p-3 text-left md:w-2/3 md:my-5 md:mx-auto" key={index}>
                    
                        <div className="flex justify-center items-center">
                            <h3 className="text-amber-500 font-bold text-3xl text-left">{card.country}</h3>
                            <img alt="paises" src={`https://flagsapi.com/${getCountryFlagUrl(card.country)}/flat/64.png`} className="px-3"/>
                            </div>
                            <h2 className="text-white pt-1 text-xl">{card.city}</h2>
                            <p className="text-white text-xl">{card.date}</p>
                            <Rating value={card.rating} 
                    read-only="true"
                    style={{color: "white"}}
                    emptyIcon={<StarIcon style={{ opacity: 1 }}/>}/>
                        <p className="text-sm text-white first-letter:uppercase italic">"{card.description}"</p>
                   
                    </div>
                )) :  <p className="text-base text-white">Sem registros de viagens para compartilhar </p> }
        </div>
    )
}