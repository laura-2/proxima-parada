import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext({});

export const AuthProvider = ({children})=> {
    const [user, setUser]= useState({id: '', nome: '', email: '', senha: '', favorites: [], posts: []});

    useEffect(()=>{
        const userData = JSON.parse(localStorage.getItem("user_data"));
        if(userData){
            setUser(userData)
        }
    },[])
    
    const addToFavorites =(viagem)=> {
       setUser(prevUser => {
            const newFavorites = [...prevUser.favorites, viagem];
            localStorage.setItem('user_data', JSON.stringify({...prevUser, favorites: newFavorites}));
            return {...prevUser, favorites: newFavorites}
        });
    }
      
      const removeFromFavorites =(id)=> {
        setUser(prevUser=> {
        const newFavorites = prevUser.favorites.filter((viagem)=> viagem.id !== id)
        localStorage.setItem("user_data", JSON.stringify({...prevUser, favorites: newFavorites}))
        return {...prevUser, favorites: newFavorites} 
      });
    }
      const signin = (email, senha) =>{
        const userStorage = JSON.parse(localStorage.getItem("users_db"))
        const hasUser = userStorage?.find((user)=> user.email === email)

        if(hasUser){
            if(hasUser.senha === senha){
            localStorage.setItem("user_data", JSON.stringify({email, senha, favorites: hasUser.favorites}))
            return setUser({email, senha, favorites: hasUser.favorites})
            

        } else {
            alert("Senha incorreta!")
        }
        } else {
            alert("usuário não cadastrado")
        }
    }
    const signup = (nome, email, senha) =>{
        const userStorage = JSON.parse(localStorage.getItem("users_db"))
        if(userStorage?.find((user)=>user.email === email)){
            return alert("Já tem uma conta com esse Email");

        } else {
            const newUser = {nome, email, senha, favorites: []}
            localStorage.setItem("users_db", JSON.stringify([...(userStorage || []), newUser]));
            return;
        }
    }

    const signout = () => { 
        localStorage.removeItem("user_data")
        setUser({nome: "", email: "", senha: "", favorites: []})
    }
    return <AuthContext.Provider value={{user, signed: !!user.email, signin, signup, signout, addToFavorites, removeFromFavorites}}>
        {children}
    </AuthContext.Provider>
}