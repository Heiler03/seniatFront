import React, { useState } from 'react'; // Importa useState para el estado del modal
import logoSeniat from '../../assets/logo-seniat.png'; // Tu logo
import './NavBar.css'; // Tu CSS personalizado
import { Link, useNavigate } from 'react-router-dom'; // Para la navegación

function NavBar() {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // Estado para mostrar/ocultar el modal de confirmación
  const navigate = useNavigate(); // Hook para la navegación programática

  // Función para manejar el clic en "Cerrar Sesión"
  const handleLogoutClick = (event) => {
    event.preventDefault(); // Previene la navegación por defecto del Link
    setShowLogoutConfirm(true); // Muestra el modal de confirmación
  };

  // Función para confirmar el cierre de sesión
  const confirmLogout = () => {
    setShowLogoutConfirm(false); // Oculta el modal
    navigate('/'); // Redirige a la URL de cierre de sesión
    // Aquí podrías añadir lógica adicional como limpiar tokens, etc.
  };

  // Función para cancelar el cierre de sesión
  const cancelLogout = () => {
    setShowLogoutConfirm(false); // Oculta el modal
  };

  const User = 'Admin';
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        {/* Botón Toggler (para pantallas pequeñas) - Siempre a la izquierda del contenido colapsable */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent" // ID del div colapsable
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido Colapsable: Incluye el logo, los enlaces de navegación y la info de usuario */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Brand/Logo - Siempre a la izquierda dentro del collapse */}
          <Link className="navbar-brand" to="/">
            <img src={logoSeniat} alt="Logo SENIAT" width="150px" />
          </Link>

          {/* Navigation Links (Central/Izquierda) - me-auto para empujarlos a la izquierda */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Inicio (SIN Dropdown) */}
            <li className="nav-item">
              <Link className="nav-link" to="/HomePage">Inicio</Link>
            </li>
            {/* Registro con Dropdown */}
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="/HomePage" id="registroDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Registro
              </Link>
              <ul className="dropdown-menu" aria-labelledby="registroDropdown">
                <li><Link className="dropdown-item" to="/registro/opcionA">Opción Registro A</Link></li>
                <li><Link className="dropdown-item" to="/registro/opcionB">Opción Registro B</Link></li>
              </ul>
            </li>
            {/* Consulta con Dropdown */}
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="/consulta" id="consultaDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Consulta
              </Link>
              <ul className="dropdown-menu" aria-labelledby="consultaDropdown">
                <li><Link className="dropdown-item" to="/consulta/item1">Opción Consulta 1</Link></li>
                <li><Link className="dropdown-item" to="/consulta/item2">Opción Consulta 2</Link></li>
              </ul>
            </li>

            {/* Usuarios */}
            <li className="nav-item">
              <Link className="nav-link" to="/Users" >Usuario</Link>
            </li>

            {/* Cerrar Sesión (SIN Dropdown, con confirmación) */}
            <li className="nav-item">
              <Link className="nav-link" to="/cerrar-sesion" onClick={handleLogoutClick}>Cerrar Sesión</Link>
            </li>
          </ul>

          {/* Información de Usuario - ms-auto para empujarlo a la derecha */}
          <span className="navbar-text ms-auto">Usuario: {User}</span>
        </div>
      </div>

      {/* Modal de Confirmación de Cierre de Sesión */}
      {showLogoutConfirm && (
        <div className="logout-confirm-modal-overlay">
          <div className="logout-confirm-modal-content">
            <p>¿Estás seguro que deseas cerrar sesión?</p>
            <div className="modal-buttons">
              <button className="btn btn-primary me-2" onClick={confirmLogout}>Sí</button>
              <button className="btn btn-secondary" onClick={cancelLogout}>No</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;