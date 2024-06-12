import { Link } from "react-router-dom";
import cadastro from "../../assets/login.png"
import React, { useContext } from "react";
import Header from '../../components/Header'
import {Formik, Form, Field} from 'formik'
import { AuthContext } from "../../context/auth";


export default function Login(){
    const {email, password, setEmail, setPassword, handleLogin} = useContext(AuthContext)

    return(
        <>
        <Header/>
       <section className="bg-blue-950 py-2">
        <div className="block items-center text-center">
            <h5 className="my-2 text-center text-2xl font-bold text-amber-500">LOGIN</h5>
                <img alt="cadastro" src={cadastro} className="my-2 mx-auto"/>
                <Formik initialValues={{}} onSubmit={handleLogin}>
                    <Form className="block">
                                <div className="flex flex-col justify-center items-center">
                                <span className="text-black text-xl font-bold">E-mail</span>
                                <Field type="email"  onChange={(e)=> setEmail(e.target.value)} value={email} name="email" placeholder="joaosilva@gmail.com" className="border-2 border-solid border-black py-2 px-5 rounded-xl my-2 w-2/3 md:w-1/3" required></Field>
                                
                                </div>
                                
                                <div className="flex flex-col justify-center items-center">
                                <span className="text-black text-xl font-bold">Senha</span>
                                <Field type="password"  onChange={(e)=> setPassword(e.target.value)} value={password} name="password" placeholder="*******" className="border-2 border-solid border-black py-2 px-5 rounded-xl my-2 w-2/3 md:w-1/3" required minLength="8"></Field>
                                
                                </div>
                                
                                <div className="flex gap-1 m-5 justify-end">
                            <Link to="/"><button type="button" className="border-1 border-solid border-blue-950
                            bg-blue-950 rounded-xl p-3 text-white">Cancelar</button></Link>
                            <button type="submit" className="border-1 border-solid rounded-xl border-amber-500 bg-amber-500 py-3 px-5 text-white">Login</button>
            
                        </div>
                        <p className="text-end m-3">Ainda não possui conta? <Link to="/perfil/cadastro" className="border-1 border-solid border-white font-bold">Fazer cadastro</Link></p>
                    </Form>
                </Formik>
                </div>
                </section>
        </>
    )
}