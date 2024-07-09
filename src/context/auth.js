import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { isFuture } from 'date-fns';
export const AuthContext = createContext({});

export const AuthProvider = ({children})=> {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
      country: '',
      city: '',
      date: '',
      rating: '',
      description: ''
    });
    const [error, setError] = useState('')
    const [user, setUser] = useState({
      name: '', email: '', password: '', favList: []
    });
    const [confirmEmail, setConfirmEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [close, setClose] = useState(true)

    
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault()
      const {country, city, date, rating, description} = formData;
      if (!country){
        setError('Selecione um país')
      } else if (!city){
        setError('Cidade deve ter no mínimo 2 caracteres')
      } else if (isFuture(date)){
        setError('A data deve ser anterior à data atual')
      } else if (!rating){
        setError('Adicione uma classificação')
      } else if (!description){
        setError('Adicione um comentário com no mínimo 10 caracteres') 
      } else {
        try {
          await axios.post('http://localhost:5000/api/form', formData);
          alert('Formulário enviado com sucesso e cadastro atualizado!');
          setFormData({
            country: '',
            city: '',
            date: '',
            rating: '',
            description: ''
          });
        } catch (error) {
          console.error('Erro ao enviar formulário e/ou atualizar cadastro:', error);
        }
      }
    };
    
    useEffect(() => {
      async function fetchItems() {
        try {
          const response = await axios.get('http://localhost:5000/api/form');
          setFormData(response.data);
        } catch (error) {
          console.error('Erro ao buscar os itens:', error);
        }
      }
  
      fetchItems();
    }, []);
    const handleClick = async (e) => {
      e.preventDefault()
        try {
          if(confirmEmail === user.email && confirmPassword === user.password){
          await axios.post('http://localhost:5000/api/users', {
            name: user.name,
            email: user.email,
            password: user.password,
            favList: user.favList
          });
          setClose(!close)
          } else {
            setClose(close)
          }
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      };
      const handleLogin = async () => {
        try {
          const response = await axios.post('http://localhost:5000/api/auth', 
          {email: user.email, password: user.password});
          setUser(response.data)  
          localStorage.setItem("token", user.email);
          setClose(!close)
        } catch (error) {
          setClose(close)
        }
      };
      const addToFavorites = async (itemId) => {
        try {
            const updateList = [...user.favList, itemId];
            await axios.patch(`http://localhost:5000/api/favorites/${user._id}`, {favList: [itemId]});
            setUser({...user, favList: updateList})
            console.log(user)
        } catch (error) {
          alert('Faça login para adicionar a sua lista de favoritos')
          console.error('Erro ao adicionar favorito:', error);
        }
      };


      const removeFromFavorites = async (itemId)=> {
        try {
          const updatedList = user.favList.filter(item => item._id !== itemId);
          await axios.put(`http://localhost:5000/api/favorites/${user._id}`, {favList: [itemId]});
          setUser({...user, favList: updatedList});
        } catch (error) {
          console.error('Erro ao adicionar favorito:', error);
        }
    }
      const signout = async () => { 
        try{
            localStorage.removeItem("token")
            setUser('')
            alert('Você saiu da sua conta com sucesso!')
            navigate('/perfil/login')
        }
        catch(error){
            alert(error.response.data.error)
        }
    }
    
    return <AuthContext.Provider value={{user, addToFavorites, removeFromFavorites, handleClick, handleLogin, signout, handleChange, handleSubmit, formData,setFormData, error
    , setConfirmEmail, setConfirmPassword, confirmEmail, confirmPassword, setUser, close, setClose}}>
        {children}
    </AuthContext.Provider>
}