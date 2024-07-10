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
    const [msg, setMsg] = useState('')
    const [user, setUser] = useState({
      name: '', email: '', password: '', favList: []
    });
    const [confirmEmail, setConfirmEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault()
      const {country, city, date, rating, description} = formData;
      if (!country){
        setError('Selecione um país')
      } else if (!city || city.length < 3){
        setError('Cidade deve ter no mínimo 3 caracteres')
      } else if (!date || isFuture(date)){
        setError('A data deve ser anterior à data atual')
      } else if (!rating){
        setError('Adicione uma classificação')
      } else if (!description || description.length < 10){
        setError('Adicione um comentário com no mínimo 10 caracteres') 
      } else {
        try {
          await axios.post('http://localhost:5000/api/form', formData);
          setMsg('Sua experiência foi compartilhada com sucesso.')
          setFormData({
            country: '',
            city: '',
            date: '',
            rating: '',
            description: ''
          });
          setError('')
        } catch (error) {
          setError('Confira todos os campos novamente antes de compartilhar')
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
          setMsg('Usuário cadastrado com sucesso!')
          } else {
            setMsg('Preencha os campos corretamente.')
          }
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      };
      const handleLogin = async () => {
        try {
          const response = await axios.post('http://localhost:5000/api/auth', 
          {email: user.email, password: user.password});
          setUser(response.data.user)  
          localStorage.setItem("token", user.email);
          setMsg('Login bem-sucedido')
          console.log(user)
        } catch (error) {
          setMsg('Preencha os campos corretamente.')
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
            setMsg('Você saiu da sua conta com sucesso!')
            navigate('/perfil/login')
        }
        catch(error){
            alert(error.response.data.error)
        }
    }
    
    return <AuthContext.Provider value={{user, addToFavorites, removeFromFavorites, handleClick, handleLogin, signout, handleChange, handleSubmit, formData,setFormData, error
    , setConfirmEmail, setConfirmPassword, confirmEmail, confirmPassword, setUser, msg, setMsg}}>
        {children}
    </AuthContext.Provider>
}