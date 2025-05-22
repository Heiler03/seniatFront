import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import FlechaLogin from '../../assets/flechalogin.svg';
import './FormularioLogin.css';

function FormularioLogin() {
  const navigate = useNavigate(); // Inicializa el hook useNavigate

  const handleSubmit = (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario (recarga de página)

    // Aquí iría tu lógica de autenticación o validación del formulario.
    // Por ejemplo, si el usuario y contraseña son correctos:
    const usuario = document.getElementById('floatingInput').value;
    const contrasena = document.getElementById('floatingPassword').value;

   if (usuario === "a" && contrasena === "a") { // Ejemplo simple de validación
      console.log("Inicio de sesión exitoso. Navegando a otra página.");
      navigate('/HomePage'); // Navega a la ruta '/HomePage'
    } else {
      console.log("Credenciales incorrectas.");
      
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  return (
    <>
      <div className="login-container">
        {/* Asigna el manejador handleSubmit al evento onSubmit del formulario */}
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-title">Iniciar Sesión</h1>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Usuario"
            />
            <label htmlFor="floatingInput">Usuario</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Contraseña"
            />
            <label htmlFor="floatingPassword">Contraseña</label>
          </div>
          <button type="submit" className="btn btn-primary btn-block login-button">
            <img src={FlechaLogin} alt="Iniciar" height={20} />
          </button>
          <div className="login-options">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">
                Recuérdame
              </label>
            </div>
          </div>
          <div className="signup-link">
            <Link to="/recuperacion">¿Olvidaste tu contraseña?</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormularioLogin;