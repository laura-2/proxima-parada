import React, { useState} from "react";
import {postViagens } from "../../servicos/viagens";
import { paises } from "../../paises";
import { Rating } from "@mui/material";
import { useForm, Controller } from "react-hook-form";


export default function Form(){
    const { control, handleSubmit, reset, register, formState: {errors} } = useForm();
    const onSubmit = (post) => {
        const { id,pais, cidade, date, nota, descricao } = post;
        const datePt = new Date(date).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
        postViagens(id, pais, cidade, datePt, nota, descricao)
        reset()
        }

    const registerOptions = {
        pais: { required: "Selecione o país" },
        cidade: { required: "Esse campo é obrigatório", minLength: {
            value: 3,
            message: "Cidade deve ter no mínimo 3 caracteres"
        } },
        date: {
            required: "Esse campo é obrigatório"
        },
        nota: {
            required: "Adicione uma classificação"
        },
        descricao: {
            required: "Esse campo é obrigatório", minLength: {
                value: 10,
                message: "Mínimo 10 caracteres"
            }
        }
        };

    return (
        <form className="bg-blue-950 text-white pt-10 pb-1 break-keep" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="pb-5 text-2xl mb-2 text-amber-500 text-center font-bold">Compartilhe sua experiência também!</h2>
            <div className="block text-center my-3">
            <select type="select" className="text-sm font-thin block bg-transparent border-2 rounded-2xl border-white p-3
         w-2/3 text-white self-center my-5 m-auto" placeholder="Selecione o país"
             name="pais" {...register("pais", registerOptions.pais)}>
                {paises.map(country => (
                    <option key={country.nome} value={country.nome} className="text-white text-sm bg-blue-950">
                    {country.nome}
                    </option>
                ))}
            </select>
            <p className="text-amber-500 m-1">{errors?.pais && errors.pais.message}</p>
            <input type="text" className="text-sm block border-2 bg-transparent rounded-2xl border-white p-3
         w-2/3 text-white self-center my-5 m-auto" placeholder="Digite o nome da cidade"
             name="cidade" 
            {...register("cidade", registerOptions.cidade)}/>
            <p className="text-amber-500 m-1">{errors?.cidade && errors.cidade.message}</p>
            <input type="date" placeholder="dd/mm/aaaa" className="text-sm font-thin block bg-transparent rounded-2xl border-white p-3
         w-2/3 text-white self-center my-5 m-auto border-2 calendar-picker-indicator:hidden appearance-none"   name="date" 
         {...register("date", registerOptions.date)} />
         <p className="text-amber-500 m-1">{errors?.date && errors.date.message}</p>
         <div className="flex flex-col w-2/3 justify-center items-center my-5 mx-auto">
            <p className="text-white text-base">Classificação:</p>
            <Controller
                        name="nota"
                        control={control}
                        render={({ field }) => (
                            <Rating
                                {...field}
                                name="nota"
                                size="large"
                                style={{ color: "white" }}
                            />
                        )}
                    />
            
         </div>
            <textarea className="font-thin block border-2 bg-transparent rounded-2xl w-2/3 h-40 p-3 m-auto text-white placeholder:bg-transparent text-white overflow-y-hidden" placeholder="Conte com mais detalhes sua experiência, por exemplo, o que mais gostou, dicas, preços..."
             name="descricao" type="text"
            {...register("descricao", registerOptions.descricao)}></textarea>
            <p className="text-amber-500 m-1">{errors?.descricao && errors.descricao.message}</p>
            <button type="submit" className="text-white bg-amber-500 p-3 my-5 rounded-xl uppercase"
            >Compartilhar</button>
            </div>
        </form>
    )
}