import Navbar from '../Header/NavBar';
import FormularioLogin from '../FormularioLogin/FormularioLogin';
import './LoginPage.css';
import seni from '../../assets/logo-seniat.png'



function LoginPage(){
    return (
<>

        <div className='bg'>
          <div className="logo"> <img src={seni} alt="logo" /></div>
            <div>
                <FormularioLogin/>
            </div>

        </div>
</>

    );
}
export default LoginPage;