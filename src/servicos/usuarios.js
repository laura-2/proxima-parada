import axios from "axios";

const usuariosAPI = axios.create({baseURL: "http://localhost:8000/usuarios"});


async function getUsuarios(){
    const response = await usuariosAPI.get('/');
    return response.data
}

async function postUsuarios(id, nome, email, confirmaEmail, senha, confirmaSenha){
    await axios.post("http://localhost:8000/usuarios", {id, nome, email, confirmaEmail, senha,confirmaSenha})
    .then(()=>{
        alert("Cadastro realizado com sucesso!")
        window.location="/"
    })
    .catch(()=>{
        alert("Verifique se os campos foram preenchidos corretamente")
    })
}

export {
    getUsuarios,
    postUsuarios
}