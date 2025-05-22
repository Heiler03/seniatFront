import React, { useState } from 'react'; // Asegúrate de importar useState
import { useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate
import './Recuperacion.css'; // Tu CSS para Recuperacion
import UsernameForm from './UsernameForm'; // Importa el componente de usuario
import SecurityQuestionsForm from './SecurityQuestionsForm'; // Importa el componente de preguntas

function Recuperacion() {
  // --- ESTADOS ---
  // Estado para controlar la fase del formulario: 'username' o 'securityQuestions'
  const [phase, setPhase] = useState('username'); // <--- AQUI SE DECLARA 'phase'
  // Estado para almacenar el nombre de usuario ingresado
  const [username, setUsername] = useState('');
  // Estado para almacenar las preguntas de seguridad asociadas al usuario
  const [securityQuestions, setSecurityQuestions] = useState([]);
  // Estado para almacenar las respuestas del usuario a las preguntas de seguridad
  const [answers, setAnswers] = useState({});
  // Estado para mostrar mensajes de éxito o error al usuario
  const [message, setMessage] = useState('');

  // Hook de React Router para la navegación programática
  const navigate = useNavigate();

  // --- Funciones de Simulación (En una aplicación real, serían llamadas a una API) ---
  const simulateFetchQuestions = (user) => {
    if (user.toLowerCase() === 'testuser') {
      return [
        { id: 'q1', question: '¿Cuál es el nombre de tu primera mascota?' },
        { id: 'q2', question: '¿Cuál es tu ciudad natal?' },
      ];
    }
    return null;
  };

  const simulateValidateAnswers = (user, userAnswers) => {
    const correctAnswers = {
      q1: 'firulais',
      q2: 'caracas',
    };

    let allCorrect = true;
    for (const qId in correctAnswers) {
      if (userAnswers[qId]?.toLowerCase() !== correctAnswers[qId].toLowerCase()) {
        allCorrect = false;
        break;
      }
    }
    return allCorrect;
  };

  // --- Manejadores de Eventos del Formulario ---
  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    const fetchedQuestions = simulateFetchQuestions(username);
    if (fetchedQuestions && fetchedQuestions.length > 0) {
      setSecurityQuestions(fetchedQuestions);
      setPhase('securityQuestions');
    } else {
      setMessage('Usuario no encontrado o sin preguntas de seguridad.');
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleAnswersSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    const isValid = simulateValidateAnswers(username, answers);
    if (isValid) {
      setMessage('Respuestas correctas. Redirigiendo para establecer nueva contraseña...');
      setTimeout(() => {
        navigate('/nueva-contrasena');
      }, 2000);
    } else {
      setMessage('Respuestas incorrectas. Inténtalo de nuevo.');
    }
  };

  const handleGoBack = () => {
    setPhase('username');
    setUsername('');
    setSecurityQuestions([]);
    setAnswers({});
    setMessage('');
  };

  return (
    <div className="recuperacion-container">
      <div className="recuperacion-card">
        {/* Renderizado Condicional de las Fases del Formulario */}
        {phase === 'username' ? (
          <UsernameForm
            onUsernameSubmit={handleUsernameSubmit}
            message={message}
            username={username}
            setUsername={setUsername}
          />
        ) : (
          <SecurityQuestionsForm
            username={username}
            securityQuestions={securityQuestions}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            onAnswersSubmit={handleAnswersSubmit}
            onGoBack={handleGoBack}
            message={message}
          />
        )}
      </div>
    </div>
  );
}

export default Recuperacion;
