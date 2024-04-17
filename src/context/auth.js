import { createContext, useEffect, useState } from "react";
import { deleteFavorito, postFavorito } from "../servicos/favoritos";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext({});

export const AuthProvider = ({children})=> {
    const [user, setUser]= useState();
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate()

    useEffect(()=>{
        const userToken = localStorage.getItem("user_token")
        const usersStorage = localStorage.getItem("users_db")

        if(userToken && usersStorage){
            const hasUser = JSON.parse(usersStorage)?.filter(
                (user)=> user.email === JSON.parse(userToken).email
            )
            if(hasUser) setUser(hasUser[0])
        }
    },[])

    const addToFavorites =(viagem)=> {
        const oldFavorites = [...favorites]
        const newFavorites = oldFavorites.concat(viagem)
        if (!favorites.includes(viagem)) {
          setFavorites([...newFavorites, viagem]);
          postFavorito(viagem)
        }
        alert("Você adicionou esta viagem a sua lista de favoritos!")
        };
      
      const removeFromFavorites =(id)=> {
        const oldFavorites = [...favorites]
        const newFavorites = oldFavorites.filter((viagem)=> viagem.id !== id)
        setFavorites(newFavorites)
        deleteFavorito(id)  
      };
      const signin = (email, senha) =>{
        const userStorage = JSON.parse(localStorage.getItem("users_db"))
        const hasUser = userStorage?.filter((user)=> user.email === email)

        if(hasUser?.length){
            if(hasUser[0].email === email && hasUser[0].senha === senha){
            const token = Math.random().toString(36).substring(2);
            localStorage.setItem("user_token", JSON.stringify({email, token}))
            setUser({email, senha})
            return;

        } else {
            alert("Email ou senha incorretas")
        }
        } else {
            alert("usuário não cadastrado")
        }
    }
    const signup = (email, senha) =>{
        const userStorage = JSON.parse(localStorage.getItem("users_db"))
        const hasUser = userStorage?.filter((user)=> user.email === email)

        if(hasUser?.length){
            return "Já tem uma conta com esse Email";

        } 
        let newUser;
        if(userStorage){
            newUser = [...userStorage, {email, senha}]
        } else {
            newUser = [{email, senha}]
        }
        localStorage.setItem("users_db", JSON.stringify(newUser));
        return;
    }

    const signout = () => {
        setUser(null);
        localStorage.removeItem("user_token")
    }
    return <AuthContext.Provider value={{user, signed: !!user, signin, signup, signout, favorites,setFavorites, addToFavorites, removeFromFavorites}}>
        {children}
    </AuthContext.Provider>
}