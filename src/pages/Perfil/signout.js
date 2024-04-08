import {  useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import Header from '../../components/Header'
import { AuthContext } from "../../context/auth";


export default function Signout(){
    const {signout} = useContext(AuthContext)
    const navigate = useNavigate()
   
    // const validationCadastro = yup.object().shape({
    //     nome: yup.string().min(4).required("Esse campo é obrigatório"),
    //     email: yup.string().email().required("Esse campo é obrigatório"),
    //     confirmaEmail: yup.string().email().required("Esse campo é obrigatório"),
    //     senha: yup.string().min(8).required("Esse campo é obrigatório e deve conter no mínimo 8 caracteres"),
    //     confirmaSenha: yup.string().oneOf([yup.ref("password"), null], "As senha não são iguais!")
    // })
    // const validationLogin = yup.object().shape({
    //     email: yup.string().email().required("Esse campo é obrigatório"),
    //     senha: yup.string().min(8).required("Esse campo é obrigatório e deve conter no mínimo 8 caracteres")
    // })

    return(
        <>
        <Header/>
                <button onClick={()=>[signout(), navigate("/")]} className="text-white bg-blue-950 p-3 my-5 rounded-xl m-5">Sair</button>
                
        </>
    )
}