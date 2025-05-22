import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from '../src/Componentes/LoginPage/LoginPage';
import Recuperacion from '../src/Componentes/Recuperacion/Recuperacion'
import HomePage from '../src/Componentes/HomePage/HomePage';


function App() {
  const [count, setCount] = useState(0)

  return (
    
    
      <div>
       <Routes>
          {/* Ruta para la página de inicio de sesión (raíz) */}
          <Route path="/" element={<LoginPage />} />

          {/* Ruta para la página de recuperación de contraseña */}
          <Route path="/recuperacion" element={<Recuperacion />} />

          {/* Ruta para la página de inicio */}
           <Route path="/HomePage" element={<HomePage />} />
        </Routes>
      </div>
     
    
  );
}

export default App
