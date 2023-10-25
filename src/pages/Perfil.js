import { Link } from "react-router-dom";
import cadastro from "../assets/login.png"
import React, { useState } from "react";
import Header from '../components/Header'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as yup from 'yup'
import axios from "axios";


export default function Perfil(){
    const [user, setUser] = useState({})

    const handleInput = (event) => {
        setUser({...user, [event.target.name]: event.target.value})
    }
    const handleClick= (values)=>{
        axios.post("http://localhost:8000/cadastro", {
            email : values.email, 
            senha : values.senha 
        }).then((response)=>{
            console.log(response)
        })
    }
    const handleClickLogin= (values)=>{
        axios.post("http://localhost:8000/login", {
            email : values.email, 
            senha : values.senha 
        }).then((response)=>{
            console.log(response)
        })
    }
    const validationCadastro = yup.object().shape({
        nome: yup.string().min(4).required("Esse campo é obrigatório"),
        email: yup.string().email().required("Esse campo é obrigatório"),
        confirmaEmail: yup.string().email().required("Esse campo é obrigatório"),
        senha: yup.string().min(8).required("Esse campo é obrigatório e deve conter no mínimo 8 caracteres"),
        confirmaSenha: yup.string().oneOf([yup.ref("password"), null], "As senha não são iguais!")
    })
    const validationLogin = yup.object().shape({
        email: yup.string().email().required("Esse campo é obrigatório"),
        senha: yup.string().min(8).required("Esse campo é obrigatório e deve conter no mínimo 8 caracteres")
    })

    return(
        <>
        <Header/>
        <section className="bg-blue-950 h-100 py-2">
        <div className="w-1/2 bg-white block items-center my-1 m-auto p-1">
            <h5 className="my-2 text-center text-2xl font-bold text-amber-500">CADASTRO</h5>
                <div className="flex">
                    <div className="m-16">
                        <img alt="cadastro" src={cadastro}/>
                    </div>
                <Formik initialValues={{}} onSubmit={handleClick} validationSchema={validationCadastro}>
                    <Form className="block ml-5">
                    <div>
                                <span className="text-black text-xl font-bold mr-5">Nome Completo *</span>
                                <Field type="text" onChange={handleInput} name="nome" placeholder="João Passos da Silva" className="border-2 border-solid border-black py-2 px-5 rounded-xl my-2" minLength="4"></Field>
                                <ErrorMessage
                        component="span"
                        name="nome"
                        />
                                </div>
                                <div>
                                <span className="text-black text-xl font-bold mr-24">E-mail</span>
                                <Field type="email"  onChange={handleInput} name="email" placeholder="joaosilva@gmail.com" className="border-2 border-solid border-black py-2 px-5 rounded-xl my-2" required></Field>
                                <ErrorMessage
                        component="span"
                        name="email"
                        />
                                </div>
                                <div>
                                <span className="text-black text-xl font-bold mr-5">Confirmar e-mail *</span>
                                <Field type="email" onChange={handleInput} name="confirmaEmail" placeholder="joaosilva@gmail.com" className="border-2 border-solid border-black py-2 px-5 rounded-xl my-2" required></Field>
                                
                                <ErrorMessage
                        component="span"
                        name="confirmaEmail"
                        /></div>
                                <div>
                                <span className="text-black text-xl font-bold mr-24">Senha</span>
                                <Field type="password"  onChange={handleInput} name="senha" placeholder="*******" className="border-2 border-solid border-black py-2 px-5 rounded-xl my-2" required minLength="8"></Field>
                                <ErrorMessage
                        component="span"
                        name="senha"
                        />
                                </div>
                                <div>
                                <span className="text-black text-xl font-bold mr-5">Confirmar senha *</span>
                                <Field type="password" onChange={handleInput} name="confirmaSenha" placeholder="*******" className="border-2 border-solid border-black py-2 px-5 rounded-xl my-2" required minLength="8"></Field>
                                <ErrorMessage
                        component="span"
                        name="confirmaSenha"
                        />
                                </div>
                                <div className="flex gap-1 mt-5 justify-end">
                            <Link to="/"><button type="button" className="border-1 border-solid border-blue-950
                            bg-blue-950 rounded-xl py-3 px-5 text-white">Cancelar</button></Link>
                            <button type="submit" className="border-1 border-solid rounded-xl border-amber-500 bg-amber-500 py-3 px-5 text-white"
                            onClick={handleClick}>Cadastrar</button>
            
                        </div>
                        <p className="text-end mt-3">Já possui conta? <button className="border-1 border-solid border-white font-bold">Entrar</button></p>
                    </Form>
                </Formik>
                    
                </div>
                </div>
                </section>



                <section className="bg-blue-950 h-100 py-2">
        <div className="w-1/2 bg-white block items-center my-1 m-auto p-1">
            <h5 className="my-2 text-center text-2xl font-bold text-amber-500">LOGIN</h5>
                <div className="flex">
                    <div className="m-16">
                        <img alt="cadastro" src={cadastro}/>
                    </div>
                <Formik initialValues={{}} onSubmit={handleClickLogin} validationSchema={validationLogin}>
                    <Form className="block ml-5">
                                <div>
                                <span className="text-black text-xl font-bold mr-24">E-mail</span>
                                <Field type="email"  onChange={handleInput} name="email" placeholder="joaosilva@gmail.com" className="border-2 border-solid border-black py-2 px-5 rounded-xl my-2" required></Field>
                                <ErrorMessage
                        component="span"
                        name="email"
                        />
                                </div>
                                
                                <div>
                                <span className="text-black text-xl font-bold mr-24">Senha</span>
                                <Field type="password"  onChange={handleInput} name="senha" placeholder="*******" className="border-2 border-solid border-black py-2 px-5 rounded-xl my-2" required minLength="8"></Field>
                                <ErrorMessage
                        component="span"
                        name="senha"
                        />
                                </div>
                                
                                <div className="flex gap-1 mt-5 justify-end">
                            <Link to="/"><button type="button" className="border-1 border-solid border-blue-950
                            bg-blue-950 rounded-xl py-3 px-5 text-white">Cancelar</button></Link>
                            <button type="submit" className="border-1 border-solid rounded-xl border-amber-500 bg-amber-500 py-3 px-5 text-white"
                            onClick={handleClickLogin}>Login</button>
            
                        </div>
                        <p className="text-end mt-3">Ainda não possui conta? <button className="border-1 border-solid border-white font-bold">Fazer cadastro</button></p>
                    </Form>
                </Formik>
                    
                </div>
                </div>
                </section>
                </>
    )
}