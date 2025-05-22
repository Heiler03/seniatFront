
import './Cards.css'
import React, { useState } from 'react'; // Importa useState

function Cards() {
  // Puedes usar un estado si quisieras un modal o alerta más compleja,
  // pero para un aviso simple de confirmación, `window.confirm` es suficiente.

  const handleReportClick = (periodo) => {
    // La función `confirm()` de JavaScript muestra un cuadro de diálogo
    // con un mensaje opcional y botones OK y Cancelar.
    // Retorna `true` si el usuario hace clic en OK, `false` si hace clic en Cancelar.
    const isConfirmed = window.confirm(`¿Está seguro de que desea generar el reporte ${periodo}?`);

    if (isConfirmed) {
      alert(`Generando reporte para el periodo: ${periodo}`);
      // Aquí podrías agregar la lógica para realmente generar el reporte,
      // como hacer una llamada a una API o navegar a otra página.
    } else {
      alert('Operación cancelada.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: '1000px', width: '100%' }}>
        <div className="card-body">
          <h4 className="card-title text-center mb-4">Sistema de Recaudación de Impuestos</h4>

          <div className="d-flex flex-wrap justify-content-around gap-3">

            {/* Primera Carta: Total Recaudado Diario */}
            <div className="card text-bg-primary mb-3" style={{ maxWidth: '18rem', minWidth: '15rem' }}>
              <div className="card-header">Total Recaudado Diario</div>
              <div className="card-body">
                <h5 className="card-title">30.000.132 Bs</h5>
                <p className="card-text"></p>
              </div>
              <div className="card-footer d-grid"> {/* d-grid para que el botón ocupe todo el ancho */}
                <button
                  className="btn btn-light" // Color de botón claro
                  onClick={() => handleReportClick('Diario')} // Llama a la función con el periodo
                >
                  Reporte
                </button>
              </div>
            </div>

            {/* Segunda Carta: Total Recaudado Semanal */}
            <div className="card text-bg-success mb-3" style={{ maxWidth: '18rem', minWidth: '15rem' }}>
              <div className="card-header">Total Recaudado Semanal</div>
              <div className="card-body">
                <h5 className="card-title">50.000.132 Bs</h5>
                <p className="card-text"></p>
              </div>
              <div className="card-footer d-grid">
                <button
                  className="btn btn-light"
                  onClick={() => handleReportClick('Semanal')}
                >
                  Reporte
                </button>
              </div>
            </div>

            {/* Tercera Carta: Total Recaudado Mensual */}
            <div className="card text-bg-danger mb-3" style={{ maxWidth: '18rem', minWidth: '15rem' }}>
              <div className="card-header">Total Recaudado Mensual</div>
              <div className="card-body">
                <h5 className="card-title">70.000.132 Bs</h5>
                <p className="card-text"></p>
              </div>
              <div className="card-footer d-grid">
                <button
                  className="btn btn-light"
                  onClick={() => handleReportClick('Mensual')}
                >
                  Reporte
                </button>
              </div>
            </div>

          </div>
        </div>
        <p className='tip'>Navegue usando el menu superior para acceder a las funciones de registro y consulta</p>
      </div>
    </div>
  );
}

export default Cards; 