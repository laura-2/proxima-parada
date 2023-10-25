import axios from "axios";

const viagensAPI = axios.create({baseURL: "http://localhost:8000/viagens"});


async function getViagens(){
    const response = await viagensAPI.get('/');
    return response.data
}

async function postViagens(id, pais, cidade, date, nota, descricao){
    await axios.post("http://localhost:8000/viagens", {id, pais, cidade, date, nota, descricao})
    .then(()=>{
        alert("Viagem compartilhada com sucesso!")
    })
    .catch(()=>{
        alert("Verifique se os campos foram preenchidos corretamente")
    })
}

export {
    getViagens,
    postViagens
}