import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export const AuthContext = createContext({});

export const AuthProvider = ({children})=> {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: '', email: '', confirmEmail: '', password: '', confirmPassword: ''})
    const handleInput = (e)=> {
        setUser({ ...user, [e.target.name]: e.target.value})
    }
    const handleClick = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/api/user', user);
          setUser(response.data);
          alert("Usuário cadastrado com sucesso!")
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      };
      const handleLogin = async () => {
        const { email, password } = user;
        try {
          await axios.post('http://localhost:5000/api/login', { email, password });
          alert('Login bem-sucedido!');
          navigate('/')
        } catch (error) {
          alert(error.response.data.error);
        }
      };
    
    
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


    const signout = () => { 
        localStorage.removeItem("user_data")
        setUser({nome: "", email: "", senha: "", favorites: [], posts: []})
    }
    return <AuthContext.Provider value={{user, signed: !!user.email, addToFavorites, removeFromFavorites,
    handleInput, handleClick, handleLogin}}>
        {children}
    </AuthContext.Provider>
}