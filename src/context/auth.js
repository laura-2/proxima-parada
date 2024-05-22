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
        name: '', email: '', password: ''})
    const [confirmEmail, setConfirmEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [token, setToken] = useState('')
    const handleInput = (e)=> {
        setUser({ ...user, [e.target.name]: e.target.value})
    }
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
        await axios.post('http://localhost:5000/api/form', formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
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
    
    // useEffect(() => {
    //   async function fetchUsers() {
    //     try {
    //       const response = await axios.get('http://localhost:5000/api/login');
    //       setUser(response.data);
    //     } catch (error) {
    //       console.error('Erro ao buscar os itens:', error);
    //     }
    //   }
  
    //   fetchUsers();
    // }, []);
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
        try {
          if(confirmEmail === user.email && confirmPassword === user.password){
          await axios.post('http://localhost:5000/api/users', user);
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
        const {email, password} = user;
        try {
          await axios.post('http://localhost:5000/api/auth', {email: email, password: password} );
          localStorage.setItem("token", user)
          window.location = '/'
          alert('Login bem-sucedido!');
        } catch (error) {
          alert(error.response.data.error);
        }
      };
      const addToFavorites = async (itemId) => {
        try {
          if(user){
          const updatedListFav = [...user.favList, itemId];
          setUser({ ...user, favList: updatedListFav });
          await axios.patch('http://localhost:5000/api/login', { email: user.email, favList: updatedListFav });
          
          } else {
            alert("Faça login para adicionar aos favoritos")
          }
        } catch (error) {
          alert('Faça login para adicionar a sua lista de favoritos')
          console.error('Erro ao adicionar favorito:', error);
        }
      };


      const removeFromFavorites = async (itemId)=> {
        try {
          const updatedListFav = user.favList.filter(id => id._id !== itemId);
          setUser({ ...user, favList: updatedListFav });
          await axios.patch('http://localhost:5000/api/login', { email: user.email, favList: updatedListFav });
         
        } catch (error) {
          console.error('Erro ao adicionar favorito:', error);
        }
    }
      const signout = async () => { 
        try{
            localStorage.removeItem("token")
            window.location.reload()
            alert('Você saiu da sua conta com sucesso!')
            navigate('/')
        }
        catch(error){
            alert(error.response.data.error)
        }
    }
    
    return <AuthContext.Provider value={{user, signed: !!user.email, addToFavorites, removeFromFavorites,
    handleInput, handleClick, handleLogin, signout, handleChange, handleSubmit, formData,setFormData, error
    , fixError, setConfirmEmail, setConfirmPassword, confirmEmail, confirmPassword}}>
        {children}
    </AuthContext.Provider>
}