<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // IMPORTANTE: Ajusta esto para producción

require_once 'config.php';

$response = [
    'success' => false,
    'message' => 'Ocurrió un error desconocido.',
    'data' => null
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitiza y valida la entrada
    $tipo_entidad = isset($_POST['tipo_entidad']) ? trim($_POST['tipo_entidad']) : '';
    $rif_prefijo = isset($_POST['rif_prefijo']) ? trim($_POST['rif_prefijo']) : '';
    $rif_numero = isset($_POST['rif_numero']) ? trim($_POST['rif_numero']) : '';

    if (empty($tipo_entidad) || empty($rif_prefijo) || empty($rif_numero)) {
        $response['message'] = 'Todos los campos son obligatorios.';
    } elseif (!in_array($tipo_entidad, ['Consignatario', 'Agente'])) {
        $response['message'] = 'Tipo de entidad inválido.';
    } elseif (!preg_match('/^[JGVPE]$/', $rif_prefijo)) {
        $response['message'] = 'Prefijo RIF inválido.';
    } elseif (!preg_match('/^[0-9]{7,9}$/', $rif_numero)) {
        $response['message'] = 'Formato de número RIF inválido. Debe contener entre 7 y 9 dígitos.';
    } else {
        $full_rif = $rif_prefijo . $rif_numero;
        $table = '';
        if ($tipo_entidad === 'Consignatario') {
            $table = 'consignatarios'; // Reemplaza con el nombre real de tu tabla de consignatarios
        } else { // Agente
            $table = 'agentes_aduanales'; // Reemplaza con el nombre real de tu tabla de agentes aduanales
        }

        // Prepara y ejecuta la consulta SQL
        $stmt = $conn->prepare("SELECT * FROM $table WHERE rif = ?");
        if ($stmt) {
            $stmt->bind_param("s", $full_rif);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $response['success'] = true;
                $response['message'] = $tipo_entidad . ' encontrado(a) exitosamente.';
                $response['data'] = $result->fetch_assoc(); // Obtén la primera fila
            } else {
                $response['message'] = 'RIF no encontrado(a) para el tipo de entidad seleccionado.';
            }
            $stmt->close();
        } else {
            $response['message'] = 'Fallo al preparar la consulta a la base de datos: ' . $conn->error;
        }
    }
} else {
    $response['message'] = 'Método de solicitud inválido.';
}

echo json_encode($response);

$conn->close();
?>