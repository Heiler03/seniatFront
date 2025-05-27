import React, { useState, useEffect } from 'react';



const ConsultaForm = () => {
    const [tipoEntidad, setTipoEntidad] = useState('');
    const [rifPrefijo, setRifPrefijo] = useState('');
    const [rifNumero, setRifNumero] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);
    // const [contribuyenteTypes, setContribuyenteTypes] = useState([]); // Esto sería para el dropdown original de PHP, pero no se usa directamente en el formulario actual. Se mantiene por contexto.

    // Define los prefijos RIF directamente en React para simplificar
    const prefijosRif = ['J', 'G', 'V', 'E', 'P'];

    // Si tuvieras un endpoint de API separado para los tipos de contribuyente (como el fragmento de código PHP para el filtro)
    /*
    useEffect(() => {
        const fetchContribuyenteTypes = async () => {
            try {
                const response = await fetch('http://localhost/tu_ruta_api_php/get_tipos_contribuyente.php'); // Ajusta la URL
                const data = await response.json();
                setContribuyenteTypes(data);
            } catch (error) {
                console.error('Error al obtener tipos de contribuyente:', error);
            }
        };
        fetchContribuyenteTypes();
    }, []);
    */

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' }); // Limpia mensajes anteriores
        setLoading(true);

        const formData = new FormData();
        formData.append('tipo_entidad', tipoEntidad);
        formData.append('rif_prefijo', rifPrefijo);
        formData.append('rif_numero', rifNumero);

        try {
            const response = await fetch('.././procesar_consulta_ca.php', { // Ajusta esta URL a tu endpoint de API PHP
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (data.success) {
                setMessage({ type: 'success', text: data.message });
                // Típicamente, aquí mostrarías los 'data.data', por ejemplo, en un componente separado.
                console.log('Datos Consultados:', data.data);
                alert(`RIF Encontrado: ${data.data.nombre_o_razon_social || 'N/A'}`); // Ejemplo de visualización
            } else {
                setMessage({ type: 'danger', text: data.message });
            }
        } catch (error) {
            console.error('Error durante la solicitud:', error);
            setMessage({ type: 'danger', text: 'Error al conectar con el servidor.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-4">
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h3><i className="fas fa-search me-2"></i>Consultar Consignatario / Agente</h3>
                </div>
                <div className="card-body p-4">
                    {message.text && (
                        <div className={`alert alert-${message.type}`}>
                            <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'} me-2`}></i>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="tipo_entidad" className="form-label required-field">Tipo de Entidad</label>
                            <select
                                className="form-select"
                                id="tipo_entidad"
                                name="tipo_entidad"
                                value={tipoEntidad}
                                onChange={(e) => setTipoEntidad(e.target.value)}
                                required
                            >
                                <option value="">Seleccione...</option>
                                <option value="Consignatario">Consignatario</option>
                                <option value="Agente">Agente Aduanal</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label required-field">RIF</label>
                            <div className="rif-input-group d-flex align-items-center gap-2"> {/* Se añadió d-flex para una visualización adecuada */}
                                <select
                                    className="form-select rif-type-select"
                                    id="rif_prefijo"
                                    name="rif_prefijo"
                                    value={rifPrefijo}
                                    onChange={(e) => setRifPrefijo(e.target.value)}
                                    style={{ maxWidth: '80px' }} // Estilo en línea para el ancho máximo como en tu CSS
                                    required
                                >
                                    <option value="">-</option>
                                    {prefijosRif.map((prefijo) => (
                                        <option key={prefijo} value={prefijo}>{prefijo}</option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="rif_numero"
                                    name="rif_numero"
                                    placeholder="Número del RIF (Ej: 123456789)"
                                    inputMode="numeric"
                                    pattern="[0-9]{7,9}"
                                    title="Debe contener entre 7 y 9 dígitos."
                                    value={rifNumero}
                                    onChange={(e) => setRifNumero(e.target.value)}
                                    required
                                />
                            </div>
                            <small className="form-text text-muted">Ingrese el prefijo y el número del RIF.</small>
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Consultando...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-paper-plane me-2"></i>Consultar / Editar
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ConsultaForm;