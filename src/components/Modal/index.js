import React, { useContext } from 'react';
import closeIcon from '../../assets/closeIcon.png'
import { AuthContext } from '../../context/auth';


export default function Modal({text}){
    const {close, setClose} = useContext(AuthContext)
    return (
        <div className='absolute bg-blue-950 inset-x-28 inset-y-72 p-5 border-1 rounded-2xl shadow-2xl'>
            <img src={closeIcon} alt='Fechar' 
            onClick={()=>setClose(!close)} 
            className='absolute top-2 right-0'/>
            <p className='text-white text-xl text-center'>{text}</p>
        </div>
    )
}