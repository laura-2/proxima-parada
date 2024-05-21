import React, { useContext } from "react";
import Header from '../../components/Header'
import { AuthContext } from "../../context/auth";
import Card from "../../components/Card";


export default function Signout(){
    const {signout, user} = useContext(AuthContext)
    return(
        <>
        <Header/>
        <button onClick={signout} className="text-white bg-blue-950 p-3 rounded-xl m-5">Sair</button>
        {/* {user && user.posts.length > 0 ? user.posts.map((post, index)=>{
            return <Card key={index} {...post}/>
        }) : null} */}
                
        </>
    )
}