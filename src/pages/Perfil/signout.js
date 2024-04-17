import {  useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import Header from '../../components/Header'
import { AuthContext } from "../../context/auth";


export default function Signout(){
    const {signout} = useContext(AuthContext)
    const navigate = useNavigate()
    return(
        <>
        <Header/>
                <button onClick={()=>[signout(), navigate("/")]} className="text-white bg-blue-950 p-3 rounded-xl m-5">Sair</button>
                
        </>
    )
}