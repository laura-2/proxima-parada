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
    const [error, setError] = useState({
      country: 'Selecione o país',
      city: 'Mínimo 2 caracteres',
      date: 'A data deve ser anterior à data atual',
      rating: 'Adicione uma classificação',
      description: 'Mínimo 10 caracteres'
    })
    const [user, setUser] = useState({
      name: '', email: '', password: '', favList: []
    });
    const [confirmEmail, setConfirmEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    function fixError(){
      const {country, city, date, rating, description} = formData;
      if (!country){
        setError(error.country)
      } else if (!city){
        setError(error.city)
      } else if (isFuture(date)){
        setError(error.date)
      } else if (!rating){
        setError(error.rating)
      } else if (!description){
        setError(error.description) 
      } else {
        alert('Por favor, corrija os erros no formulário antes de enviar.');
        return;
      }
    }
    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        if(user){
        await axios.post('http://localhost:5000/api/form', formData);
        alert('Formulário enviado com sucesso e cadastro atualizado!');
        setFormData({
          country: '',
          city: '',
          date: '',
          rating: '',
          description: ''
        });
      } else {
        alert("Faça login para compartilhar suas viagens")
      }
      } catch (error) {
        console.error('Erro ao enviar formulário e/ou atualizar cadastro:', error);
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
          alert("Usuário cadastrado com sucesso!")
          navigate('/perfil/login')
          } else {
            alert("Preencha os campos corretamente")
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
          localStorage.setItem("token", user.email)
          alert('Login bem-sucedido!');
          console.log(response.data)
          navigate('/')
        } catch (error) {
          alert(error.response.data.error);
        }
      };
      const addToFavorites = async (itemId) => {
        try {
            const updateList = [...user.favList, itemId];
            setUser({...user, favList: updateList})
            await axios.patch(`http://localhost:5000/api/favorites/${user._id}`, {favList: updateList});
            console.log(user)
        } catch (error) {
          alert('Faça login para adicionar a sua lista de favoritos')
          console.error('Erro ao adicionar favorito:', error);
        }
      };


      const removeFromFavorites = async (itemId)=> {
        try {
          const updatedList = user.favList.filter(item => item._id !== itemId);
          setUser({...user, favList: updatedList});
          await axios.patch(`http://localhost:5000/api/favorites/${user._id}`, {favList: updatedList});
          console.log(user)
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
    , fixError, setConfirmEmail, setConfirmPassword, confirmEmail, confirmPassword, setUser}}>
        {children}
    </AuthContext.Provider>
}