// import { Link, useNavigate } from "react-router-dom";
// import cadastro from "../assets/login.png"
// import React, { useContext, useState } from "react";
// import Header from '../components/Header'
// import {Formik, Form, Field, ErrorMessage} from 'formik'
// import { AuthContext } from "../context/auth";


// export default function Perfil(){
//     const {user, signin, signup, signout} = useContext(AuthContext)
//     const navigate = useNavigate()
//     const [email, setEmail]= useState("")
//     const [senha, setSenha]= useState("")
//     const [confSenha, setConfSenha] = useState("")
//     const [confEmail, setConfEmail] = useState("")
//     const [error, setError]= useState("")
//     const [nome, setNome] = useState("")

//     const handleClick= ()=>{
//         if(!email | !confEmail | !senha){
//             setError("Preencha todos os campos")
//             return;
//         } else if (email !== confEmail){
//             setError("Os emails não são iguais")
//             return
//         }
//         const res = signup(email, senha)

//         if(res){
//             setError(res)
//             return;
//         }
//         alert("Usuário cadastrado com sucesso!")
//         navigate("/")
//     }
//     const handleClickLogin= ()=>{
//         if(!email | !senha){
//             setError("Preencha todos os campos")
//             return;
//         }
//         const res = signin(email, senha)

//         if(res){
//             setError(res)
//             return;
//         }
//         navigate("/")
//     }
//     // const validationCadastro = yup.object().shape({
//     //     nome: yup.string().min(4).required("Esse campo é obrigatório"),
//     //     email: yup.string().email().required("Esse campo é obrigatório"),
//     //     confirmaEmail: yup.string().email().required("Esse campo é obrigatório"),
//     //     senha: yup.string().min(8).required("Esse campo é obrigatório e deve conter no mínimo 8 caracteres"),
//     //     confirmaSenha: yup.string().oneOf([yup.ref("password"), null], "As senha não são iguais!")
//     // })
//     // const validationLogin = yup.object().shape({
//     //     email: yup.string().email().required("Esse campo é obrigatório"),
//     //     senha: yup.string().min(8).required("Esse campo é obrigatório e deve conter no mínimo 8 caracteres")
//     // })

//     return(
//         <>
//         <Header/>
//         {user ? (
//         <section className="bg-blue-950 h-100 py-2">
//         <div className="w-1/2 bg-white block items-center my-1 m-auto p-1">
//             <h5 className="my-2 text-center text-2xl font-bold text-amber-500">CADASTRO</h5>
//                 <div className="flex">
//                     <div className="m-16">
//                         <img alt="cadastro" src={cadastro}/>
//                     </div>
//                 <Formik initialValues={{}} onSubmit={handleClick}>
//                     <Form className="block ml-5">
//                     <div>
//                                 <span className="text-black text-xl font-bold mr-5">Nome Completo *</span>
//                                 <Field type="text" onChange={(e)=> [setNome(e.target.value), setError("")]} value={nome} name="nome" placeholder="João Passos da Silva" className="border-2 border-solid border-black py-2 px-5 rounded-xl my-2" minLength="4"></Field>
//                                 <ErrorMessage
//                                 value={error}
//                         component="span"
//                         name="nome"
//                         />
//                                 </div>
//                                 <div>
//                                 <span className="text-black text-xl font-bold mr-24">E-mail</span>
//                                 <Field type="email"  onChange={(e)=> [setEmail(e.target.value), setError("")]} value={email} name="email" placeholder="joaosilva@gmail.com" className="border-2 border-solid border-black py-2 px-5 rounded-xl my-2" required></Field>
//                                 <ErrorMessage
//                                 value={error}
//                         component="span"
//                         name="email"
//                         />
//                                 </div>
//                                 <div>
//                                 <span className="text-black text-xl font-bold mr-5">Confirmar e-mail *</span>
//                                 <Field type="email" onChange={(e)=> [setConfEmail(e.target.value), setError("")]} value={confEmail} name="confirmaEmail" placeholder="joaosilva@gmail.com" className="border-2 border-solid border-black py-2 px-5 rounded-xl my-2" required></Field>
                                
//                                 <ErrorMessage
//                                 value={error}
//                         component="span"
//                         name="confirmaEmail"
//                         /></div>
//                                 <div>
//                                 <span className="text-black text-xl font-bold mr-24">Senha</span>
//                                 <Field type="password"  onChange={(e)=> [setSenha(e.target.value), setError("")]} value={senha} name="senha" placeholder="*******" className="border-2 border-solid border-black py-2 px-5 rounded-xl my-2" required minLength="8"></Field>
//                                 <ErrorMessage
//                                 value={error}
//                         component="span"
//                         name="senha"
//                         />
//                                 </div>
//                                 <div>
//                                 <span className="text-black text-xl font-bold mr-5">Confirmar senha *</span>
//                                 <Field type="password" onChange={(e)=> [setConfSenha(e.target.value), setError("")]} value={confSenha} name="confirmaSenha" placeholder="*******" className="border-2 border-solid border-black py-2 px-5 rounded-xl my-2" required minLength="8"></Field>
//                                 <ErrorMessage
//                                 value={error}
//                         component="span"
//                         name="confirmaSenha"
//                         />
//                                 </div>
//                                 <div className="flex gap-1 mt-5 justify-end">
//                             <Link to="/"><button type="button" className="border-1 border-solid border-blue-950
//                             bg-blue-950 rounded-xl py-3 px-5 text-white">Cancelar</button></Link>
//                             <button type="submit" className="border-1 border-solid rounded-xl border-amber-500 bg-amber-500 py-3 px-5 text-white"
//                             onClick={handleClick}>Cadastrar</button>
            
//                         </div>
//                         <p className="text-end mt-3">Já possui conta? <Link to="/perfil/login" className="border-1 border-solid border-white font-bold">Entrar</Link></p>
//                     </Form>
//                 </Formik>
                    
//                 </div>
//                 </div>
//                 </section>
//         ) : (
//        <section className="bg-blue-950 h-100 py-2">
//         <div className="w-1/2 bg-white block items-center my-1 m-auto p-1">
//             <h5 className="my-2 text-center text-2xl font-bold text-amber-500">LOGIN</h5>
//                 <div className="flex">
//                     <div className="m-16">
//                         <img alt="cadastro" src={cadastro}/>
//                     </div>
//                 <Formik initialValues={{}} onSubmit={handleClickLogin}>
//                     <Form className="block ml-5">
//                                 <div>
//                                 <span className="text-black text-xl font-bold mr-24">E-mail</span>
//                                 <Field type="email"  onChange={(e)=> [setEmail(e.target.value), setError("")]} value={email} name="email" placeholder="joaosilva@gmail.com" className="border-2 border-solid border-black py-2 px-5 rounded-xl my-2" required></Field>
//                                 <ErrorMessage
//                                 value={error}
//                         component="span"
//                         name="email"
//                         />
//                                 </div>
                                
//                                 <div>
//                                 <span className="text-black text-xl font-bold mr-24">Senha</span>
//                                 <Field type="password"  onChange={(e)=> [setSenha(e.target.value), setError("")]} value={senha} name="senha" placeholder="*******" className="border-2 border-solid border-black py-2 px-5 rounded-xl my-2" required minLength="8"></Field>
//                                 <ErrorMessage
//                                 value={error}
//                         component="span"
//                         name="senha"
//                         />
//                                 </div>
                                
//                                 <div className="flex gap-1 mt-5 justify-end">
//                             <Link to="/"><button type="button" className="border-1 border-solid border-blue-950
//                             bg-blue-950 rounded-xl py-3 px-5 text-white">Cancelar</button></Link>
//                             <button type="submit" className="border-1 border-solid rounded-xl border-amber-500 bg-amber-500 py-3 px-5 text-white"
//                             onClick={handleClickLogin}>Login</button>
            
//                         </div>
//                         <p className="text-end mt-3">Ainda não possui conta? <Link to="/perfil/cadastro" className="border-1 border-solid border-white font-bold">Fazer cadastro</Link></p>
//                     </Form>
//                 </Formik>
//                 <button onClick={()=>[signout(), navigate("/")]}>Sair</button>
//                 </div>
//                 </div>
//                 </section>
//         )}
//         </>
//     )
// }