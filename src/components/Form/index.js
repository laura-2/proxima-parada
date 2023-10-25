import React, { useState} from "react";
import {postViagens } from "../../servicos/viagens";
import { paises } from "../../paises";


export default function Form(){
    const [post, setPost] = useState({})
    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const { id,pais, cidade, date, nota, descricao } = post;
        const datePt = new Date(date).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
        postViagens(id, pais, cidade, datePt, nota, descricao )
        console.log(datePt)
        }

    return (
        <form className="bg-blue-950 text-white pt-10 pb-1" onSubmit={handleSubmit}>
            <h2 className="pb-5 text-2xl mb-2 text-amber-500 text-center font-bold">Compartilhe sua experiência também!</h2>
            <div className="block text-center my-3">
            <select type="select" className="text-base font-thin block bg-transparent border-2 rounded-2xl border-white p-3
         w-1/3 text-white self-center my-5 m-auto" placeholder="Selecione o país"
            onChange={handleInput} name="pais" required>
                {paises.map(country => (
                    <option key={country.nome} value={country.nome} className="text-white text-base bg-blue-950">
                    {country.nome}
                    </option>
                ))}
            </select>
            <input type="text" className="text-base block border-2 bg-transparent rounded-2xl border-white p-3
         w-1/3 text-white self-center my-5 m-auto" placeholder="Digite o nome da cidade. Exemplo: Curitiba"
            onChange={handleInput} name="cidade" required/>
            <input type="date" placeholder="dd/mm/aaaa" className="text-base font-thin block bg-transparent rounded-2xl border-white p-3
         w-1/3 text-white self-center my-5 m-auto border-2 calendar-picker-indicator:hidden appearance-none"  onChange={handleInput} name="date" 
         required />
            <input type="number" className="text-base font-thin block bg-transparent rounded-2xl border-white p-3
         w-1/3 text-white self-center my-5 m-auto border-2" placeholder="Qual sua nota para essa viagem?"
            onChange={handleInput} name="nota" max={10} min={0} required/>
            <textarea className="font-thin block border-2 bg-transparent rounded-2xl w-1/3 h-40 p-3 m-auto text-white placeholder:bg-transparent text-white overflow-y-hidden" placeholder="Conte com mais detalhes sua experiência, por exemplo, o que mais gostou, dicas, preços..."
            onChange={handleInput} name="descricao" type="text"></textarea>
            <button type="submit" className="text-white bg-amber-500 p-3 my-5 rounded-xl uppercase"
            >Compartilhar</button>
            </div>
        </form>
    )
}