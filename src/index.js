import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favoritos from "./pages/Favoritos";
import Continente from "./pages/Continente";
import { AuthProvider } from "./context/auth";
import Cadastro from "./pages/Perfil/cadastro";
import Login from "./pages/Perfil/login";
import Signout from "./pages/Perfil/signout";
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Poppins';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    overflow-y: scroll;
    scroll-behavior: smooth;
    box-sizing: border-box;
    -youbkit-touch-callout: none;
    -youbkit-user-select: none; 
    -moz-user-select: none;  
    -ms-user-select: none;   
    user-select: none; 
    text-decoration: none;
    text-wrap: wrap;
}
    body::-webkit-scrollbar {
      width: 5px;             
    }

    body::-webkit-scrollbar-track {
      background: transparent;      
    }

    body::-webkit-scrollbar-thumb {
      background-color: #172554;   
      border-radius: 20px;    
      border: 3px solid #172554;  
    }
    li{
      list-style: none;
    }
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                  <Home/>
              }
            ></Route>
            <Route
              path="/favoritos"
              element={
                  <Favoritos />
              }
            ></Route>
            <Route
              path="/perfil/cadastro"
              element={
                  <Cadastro />
              }
            ></Route>
            <Route
              path="/perfil/login"
              element={
                  <Login />
              }
            ></Route>
            <Route
              path="/perfil/signout"
              element={
                  <Signout />
              }
            ></Route>
            <Route
              path="/continente/:nomeContinente"
              element={
                  <Continente />
              }
            ></Route>
          </Routes>
        </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
