import React, { useEffect, useState } from "react";
import { getViagens } from "../../servicos/viagens";
import Card from "../Card";
import lupa from "../../assets/lupa.png"


export default function Search(){
    const [inputValue, setInputValue] = useState([]);
    const [viagens, setViagens] = useState([]);

    useEffect(()=>{
       fetchViagens()
    }, [])

    async function fetchViagens(){
        const viagensDaAPI = await getViagens()
        setViagens(viagensDaAPI);
    }

      
    return(
        <section className="block text-center bg-blue-950 py-5">
            <h2 className="text-2xl text-white">Compartilhando experiências!</h2>
            <h3 className="text-xl text-white">
            Sabe aquele lugar que você está planejando em conhecer mas não sabe por onde começar?!<br/>
            Ou gostaria de uma ajudinha ou uma opinião?!<br/>
            Aqui você não está perdido, primeiro procure pelo seu destino e depois se amarre nos depoimentos.<br/>
            Não deixe de compartilhar a sua viagem também!
            </h3>
            <input className="border-solid border-white border-2 rounded-3xl bg-white text-base text-black mt-5 text-center
            py-2 w-1/4 placeholder:text-black text-center bg-auto bg-no-repeat bg-right"
            // style={{background: "url('../../assets/pin.png')"}} 
            placeholder="Qual seu destino?" 
            onBlur={event=>{
                const textWriting = event.target.value
                const results = viagens.filter(pais => pais.pais.includes(textWriting))
                setInputValue(results)
                if(textWriting === ''){
                    results.length = 0;
                }
            }}/>
            <button className="ml-3 pt-6 bg-blue-950 border-none absolute"><img src={lupa} alt="Pesquisar"/></button>
            <div className="bg-blue-950">
            {inputValue.map((viagem, index) => {
                    return <Card {...viagem} key={index}/>
                })}
                </div>
        </section>
    )
} 