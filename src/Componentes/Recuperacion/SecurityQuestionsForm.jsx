
// Componente para la Fase 2: Preguntas de Seguridad
function SecurityQuestionsForm({ username, securityQuestions, answers, onAnswerChange, onAnswersSubmit, onGoBack, message }) {
  return (
    <form onSubmit={onAnswersSubmit} className="recuperacion-form">
      <h2 className="recuperacion-title">Recuperar Contraseña</h2>
      {message && <p className={`recuperacion-message ${message.includes('correctas') ? 'success' : 'error'}`}>{message}</p>}
      <p className="mb-3">Por favor, responde las siguientes preguntas de seguridad para **{username}**:</p>
      {securityQuestions.map((q) => (
        <div className="form-floating mb-3" key={q.id}>
          <input
            type="text"
            className="form-control"
            id={`answer-${q.id}`}
            placeholder={q.question} // La pregunta como placeholder
            value={answers[q.id] || ''} // Valor de la respuesta
            onChange={(e) => onAnswerChange(q.id, e.target.value)}
            required // Campo requerido
          />
          <label htmlFor={`answer-${q.id}`}>{q.question}</label> {/* La pregunta como label flotante */}
        </div>
      ))}
      <button type="submit" className="btn btn-success w-100">
        Verificar Respuestas
      </button>
      <button
        type="button"
        className="btn btn-link mt-2 w-100"
        onClick={onGoBack}
      >
        Volver al inicio
      </button>
    </form>
  );
}

export default SecurityQuestionsForm;