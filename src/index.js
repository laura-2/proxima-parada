import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favoritos from "./pages/Favoritos";
import { FavoritosProvider } from "./context/Favoritos";
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
    box-sizing: border-box;
    -youbkit-touch-callout: none;
    -youbkit-user-select: none; 
    -moz-user-select: none;  
    -ms-user-select: none;   
    user-select: none; 
    text-decoration: none;
    text-wrap: wrap;
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
      <FavoritosProvider>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <FavoritosProvider>
                  <Home/>
                </FavoritosProvider>
              }
            ></Route>
            <Route
              path="/favoritos"
              element={
                <FavoritosProvider>
                  <Favoritos />
                </FavoritosProvider>
              }
            ></Route>
            <Route
              path="/perfil/cadastro"
              element={
                <FavoritosProvider>
                  <Cadastro />
                </FavoritosProvider>
              }
            ></Route>
            <Route
              path="/perfil/login"
              element={
                <FavoritosProvider>
                  <Login />
                </FavoritosProvider>
              }
            ></Route>
            <Route
              path="/perfil/signout"
              element={
                <FavoritosProvider>
                  <Signout />
                </FavoritosProvider>
              }
            ></Route>
            <Route
              path="/continente/:nomeContinente"
              element={
                <FavoritosProvider>
                  <Continente />
                </FavoritosProvider>
              }
            ></Route>
          </Routes>
        </AuthProvider>
      </FavoritosProvider>
    </BrowserRouter>
  </React.StrictMode>
);
