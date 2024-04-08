import { Link, useNavigate } from "react-router-dom";
import cadastro from "../../assets/login.png"
import React, { useContext, useState } from "react";
import Header from '../../components/Header'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { AuthContext } from "../../context/auth";


export default function Login(){
    const {signin} = useContext(AuthContext)
    const navigate = useNavigate()
    const [email, setEmail]= useState("")
    const [senha, setSenha]= useState("")
    const [error, setError]= useState("")

    
    const handleClickLogin= (e)=>{
        e.preventDefault()
        if(!email | !senha){
            setError("Preencha todos os campos")
            return;
        }
        const res = signin(email, senha)

        if(res){
            setError(res)
            return;
        }
        navigate("/")
    }
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
       <section className="bg-blue-950 py-2">
        <div className="block items-center text-center">
            <h5 className="my-2 text-center text-2xl font-bold text-amber-500">LOGIN</h5>
                    <div className="m-2">
                        <img alt="cadastro" src={cadastro}/>
                    </div>
                <Formik initialValues={{}} onSubmit={handleClickLogin}>
                    <Form className="block">
                                <div>
                                <span className="text-black text-xl font-bold mr-12">E-mail</span>
                                <Field type="email"  onChange={(e)=> [setEmail(e.target.value), setError("")]} value={email} name="email" placeholder="joaosilva@gmail.com" className="border-2 border-solid border-black py-2 px-5 rounded-xl my-2" required></Field>
                                <ErrorMessage
                                value={error}
                        component="span"
                        name="email"
                        />
                                </div>
                                
                                <div>
                                <span className="text-black text-xl font-bold mr-12">Senha</span>
                                <Field type="password"  onChange={(e)=> [setSenha(e.target.value), setError("")]} value={senha} name="senha" placeholder="*******" className="border-2 border-solid border-black py-2 px-5 rounded-xl my-2" required minLength="8"></Field>
                                <ErrorMessage
                                value={error}
                        component="span"
                        name="senha"
                        />
                                </div>
                                
                                <div className="flex gap-1 m-5 justify-end">
                            <Link to="/"><button type="button" className="border-1 border-solid border-blue-950
                            bg-blue-950 rounded-xl py-3 px-5 text-white">Cancelar</button></Link>
                            <button type="submit" className="border-1 border-solid rounded-xl border-amber-500 bg-amber-500 py-3 px-5 text-white"
                            onClick={handleClickLogin}>Login</button>
            
                        </div>
                        <p className="text-end m-3">Ainda não possui conta? <Link to="/perfil/cadastro" className="border-1 border-solid border-white font-bold">Fazer cadastro</Link></p>
                    </Form>
                </Formik>
                </div>
                </section>
        </>
    )
}