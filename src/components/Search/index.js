import React, { useEffect, useState } from "react";
import Card from "../Card";
import lupa from "../../assets/lupa.png"
import axios from "axios";


export default function Search(){
    const [inputValue, setInputValue] = useState([]);
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


    function handleSearch (event){
        const textWriting = event.target.value;
        const results = viagens.filter(pais => pais.country.includes(textWriting) || pais.city.includes(textWriting))
        setInputValue(results)
        if(textWriting === ''){
            results.length = 0;
        }
    }

      
    return(
        <section className="block text-center bg-blue-950 py-5 break-keep">
            <h2 className="text-xl text-white sm:text-2xl">Compartilhando experiências!</h2>
            <p className="text-base text-white text-justify p-4 md:text-center">
            Sabe aquele lugar que você está planejando em conhecer mas não sabe por onde começar?!<br/>
            Ou gostaria de uma ajudinha ou uma opinião?!<br/>
            Aqui você não está perdido, primeiro procure pelo seu destino e depois se amarre nos depoimentos.<br/>
            Não deixe de compartilhar a sua viagem também!
            </p>
            <div className="flex justify-center items-center gap-3">
            <input className="border-solid border-white border-2 rounded-3xl bg-white text-sm text-black text-left
            p-2 w-2/3 placeholder:text-black text-left bg-no-repeat bg-right md:w-1/3"
            placeholder="Qual seu destino?" 
            onKeyDown={(e) => { 
                if (e.key === "Enter") { 
                    handleSearch(e) 
                } 
            }} 
            onBlur={handleSearch}/>
            <button className="border-none"><img src={lupa} alt="Pesquisar"/></button>
            </div>
            <div className="bg-blue-950">
            {inputValue.length > 0 ? inputValue.map((viagem, index) => {
                    return <Card {...viagem} key={index}/>
                }): null}
                </div>
        </section>
    )
} 