import { Link, useNavigate } from "react-router-dom";
import cadastro from "../../assets/login.png"
import React, { useContext, useState } from "react";
import Header from '../../components/Header'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { AuthContext } from "../../context/auth";


export default function Cadastro(){
    const {signup} = useContext(AuthContext)
    const navigate = useNavigate()
    const [email, setEmail]= useState("")
    const [senha, setSenha]= useState("")
    const [confSenha, setConfSenha] = useState("")
    const [confEmail, setConfEmail] = useState("")
    const [error, setError]= useState("")
    const [nome, setNome] = useState("")

    const handleClick= ()=>{
        if(!email | !confEmail | !senha){
            setError("Preencha todos os campos")
            return;
        } else if (email !== confEmail){
            setError("Os emails não são iguais")
            return
        }
        const res = signup(email, senha)

        if(res){
            setError(res)
            return;
        }
        alert("Usuário cadastrado com sucesso!")
        navigate("/")
    }

    return(
        <>
        <Header/>
        <section className="bg-blue-950 py-2">
        <div className="block items-center text-center">
            <h5 className="my-2 text-center text-2xl font-bold text-amber-500">CADASTRO</h5>
                    <div className="m-2">
                        <img alt="cadastro" src={cadastro}/>
                    </div>
                <Formik initialValues={{}} onSubmit={handleClick}>
                    <Form className="block">
                    <div>
                                <span className="text-black text-xl font-bold">Nome Completo *</span>
                                <Field type="text" onChange={(e)=> [setNome(e.target.value), setError("")]} value={nome} name="nome" placeholder="João Passos da Silva" className="border-2 border-solid border-black p-2 rounded-xl my-2" minLength="4"></Field>
                                <ErrorMessage
                                value={error}
                        component="span"
                        name="nome"
                        />
                                </div>
                                <div>
                                <span className="text-black text-xl font-bold mr-12">E-mail</span>
                                <Field type="email"  onChange={(e)=> [setEmail(e.target.value), setError("")]} value={email} name="email" placeholder="joaosilva@gmail.com" className="border-2 border-solid border-black p-2 rounded-xl my-2" required></Field>
                                <ErrorMessage
                                value={error}
                        component="span"
                        name="email"
                        />
                                </div>
                                <div>
                                <span className="text-black text-xl font-bold">Confirmar e-mail *</span>
                                <Field type="email" onChange={(e)=> [setConfEmail(e.target.value), setError("")]} value={confEmail} name="confirmaEmail" placeholder="joaosilva@gmail.com" className="border-2 border-solid border-black p-2 rounded-xl my-2" required></Field>
                                
                                <ErrorMessage
                                value={error}
                        component="span"
                        name="confirmaEmail"
                        /></div>
                                <div>
                                <span className="text-black text-xl font-bold mr-12">Senha</span>
                                <Field type="password"  onChange={(e)=> [setSenha(e.target.value), setError("")]} value={senha} name="senha" placeholder="*******" className="border-2 border-solid border-black p-2 rounded-xl my-2" required minLength="8"></Field>
                                <ErrorMessage
                                value={error}
                        component="span"
                        name="senha"
                        />
                                </div>
                                <div>
                                <span className="text-black text-xl font-bold">Confirmar senha *</span>
                                <Field type="password" onChange={(e)=> [setConfSenha(e.target.value), setError("")]} value={confSenha} name="confirmaSenha" placeholder="*******" className="border-2 border-solid border-black p-2 rounded-xl my-2" required minLength="8"></Field>
                                <ErrorMessage
                                value={error}
                        component="span"
                        name="confirmaSenha"
                        />
                                </div>
                                <div className="flex gap-1 m-5 justify-end">
                            <Link to="/"><button type="button" className="border-1 border-solid border-blue-950
                            bg-blue-950 rounded-xl py-3 text-white">Cancelar</button></Link>
                            <button type="submit" className="border-1 border-solid rounded-xl border-amber-500 bg-amber-500 p-3 text-white"
                            onClick={handleClick}>Cadastrar</button>
            
                        </div>
                        <p className="text-end m-3">Já possui conta? <Link to="/perfil/login" className="border-1 border-solid border-white font-bold">Entrar</Link></p>
                    </Form>
                </Formik>
                    
                </div>
                </section>
        
        </>
    )
}