import logoSeniat from '../../assets/logo-seniat.png';
import './NavBar.css';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-md navbar-light">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarToggler">
          <a className="navbar-brand" href="#">
            <img src={logoSeniat} alt="Logo-seniat" width="150px" />
          </a>
          <ul className="navbar-nav d-flex justify-content-center">
            
          </ul>
        </div>
        <ul className="navbar-nav"> {/* Agregado ul para el enlace de inicio */}
          <li className="nav-item">
            
             <Link to="/" className="nav-link home-link">Inicio</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;