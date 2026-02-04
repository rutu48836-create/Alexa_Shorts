
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home } from './Pages/Home';
import {Login} from './Pages/Login'

function App() {
  
   return(

    <BrowserRouter>
     
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Login" element={<Login/>} />
      </Routes>

    </BrowserRouter>


   )
  
}

export default App
