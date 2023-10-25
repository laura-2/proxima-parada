import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Favoritos from './pages/Favoritos';
import {FavoritosProvider} from './context/Favoritos';
import Continente from './pages/Continente';
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
    word-break: break-all;
    text-decoration: none;  
}
    li{
      list-style: none;
    }
`
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle/>
    <BrowserRouter>
    <FavoritosProvider>
    <Routes>
      <Route path="/" element={<FavoritosProvider><Home /></FavoritosProvider>}></Route>
      <Route path="/favoritos" element={<FavoritosProvider><Favoritos /></FavoritosProvider>}></Route>
      <Route path="/continente/:nomeContinente" element={<FavoritosProvider><Continente /></FavoritosProvider>}></Route>
    </Routes>
    </FavoritosProvider>
    </BrowserRouter>
  </React.StrictMode>
);
