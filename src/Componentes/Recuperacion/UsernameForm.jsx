function UsernameForm({ onUsernameSubmit, message, username, setUsername }) {
  return (
    <form onSubmit={onUsernameSubmit} className="recuperacion-form">
      <h2 className="recuperacion-title">Recuperar Contraseña</h2>
      {message && <p className={`recuperacion-message ${message.includes('correctas') ? 'success' : 'error'}`}>{message}</p>}
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="usernameInput"
          placeholder="Nombre de Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="usernameInput">Nombre de Usuario</label>
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Continuar
      </button>
    </form>
  );
}

export default UsernameForm;