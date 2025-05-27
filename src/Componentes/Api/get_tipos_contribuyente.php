<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // IMPORTANTE: Ajusta esto para producción al dominio de tu aplicación React

require_once 'config.php';

$tipos_contribuyente = [];
if (isset($conn)) {
    $result_tipos_contr = $conn->query("SELECT id_tipo_contribuyente, desc_tipo_contribuyente FROM tipo_contribuyente ORDER BY desc_tipo_contribuyente");
    if ($result_tipos_contr) {
        while ($row = $result_tipos_contr->fetch_assoc()) {
            $tipos_contribuyente[] = $row;
        }
    }
}

echo json_encode($tipos_contribuyente);

$conn->close();
?>