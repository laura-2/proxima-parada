import React, { useState} from "react";
import { paises } from "../../paises";
import { Rating } from "@mui/material";
import axios from 'axios'


export default function Form(){
    const [formData, setFormData] = useState({
        country: '',
        city: '',
        date: '',
        rating: '',
        description: ''
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/api/form', formData);
          setFormData(response.data);
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      };
    

    return (
        <form className="bg-blue-950 text-white pt-10 pb-1 break-keep" onSubmit={handleSubmit}>
            <h2 className="pb-5 text-2xl mb-2 text-amber-500 text-center font-bold">Compartilhe sua experiência também!</h2>
            <div className="block text-center my-3">
            <select type="select" className="text-sm font-thin block bg-transparent border-2 rounded-2xl border-white p-3
         w-2/3 text-white self-center my-5 m-auto" placeholder="Selecione o país"
             name="country" value={formData.country} onChange={handleChange}>
                {paises.map(country => (
                    <option key={country.nome} value={country.nome} className="text-white text-sm bg-blue-950">
                    {country.nome}
                    </option>
                ))}
            </select>
            <input type="text" className="text-sm block border-2 bg-transparent rounded-2xl border-white p-3
         w-2/3 text-white self-center my-5 m-auto" placeholder="Digite o nome da cidade"
             name="city" value={formData.city} onChange={handleChange}/>
            <input type="date" placeholder="dd/mm/aaaa" className="text-sm font-thin block bg-transparent rounded-2xl border-white p-3
         w-2/3 text-white self-center my-5 m-auto border-2 calendar-picker-indicator:hidden appearance-none"   name="date" 
         value={formData.date} onChange={handleChange}/>
         <div className="flex flex-col w-2/3 justify-center items-center my-5 mx-auto">
            <p className="text-white text-base">Classificação:</p>
                            <Rating
                                name="rating"
                                
                                value={formData.rating}
                                onChange={handleChange}
                                size="large"
                                style={{ color: "white" }}
                            />
            
         </div>
            <textarea className="font-thin block border-2 bg-transparent rounded-2xl w-2/3 h-40 p-3 m-auto text-white placeholder:bg-transparent text-white overflow-y-hidden" placeholder="Conte com mais detalhes sua experiência, por exemplo, o que mais gostou, dicas, preços..."
             name="description" type="text" onChange={handleChange} value={formData.description}></textarea>
            <button type="submit" className="text-white bg-amber-500 p-3 my-5 rounded-xl uppercase"
            >Compartilhar</button>
            </div>
        </form>
    )
}