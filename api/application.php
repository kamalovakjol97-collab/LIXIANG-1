<?php
/**
 * Приём заявок с сайта xgl-group.ru и сохранение в MySQL на Spaceweb.
 * Загрузите этот файл и db_config.php в корень сайта (рядом с index.html).
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$configPath = __DIR__ . '/db_config.php';
if (!is_file($configPath)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server config missing']);
    exit;
}

$config = require $configPath;
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!is_array($data)) {
    $data = [
        'cargoType'   => $_POST['cargoType'] ?? '',
        'from'        => $_POST['from'] ?? '',
        'to'          => $_POST['to'] ?? '',
        'phone'       => $_POST['phone'] ?? '',
        'companyName' => $_POST['companyName'] ?? '',
    ];
}

$cargoType   = trim($data['cargoType'] ?? '');
$from        = trim($data['from'] ?? '');
$to          = trim($data['to'] ?? '');
$phone       = trim($data['phone'] ?? '');
$companyName = trim($data['companyName'] ?? '');

if ($cargoType === '' || $from === '' || $to === '' || $phone === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Required fields missing']);
    exit;
}

try {
    $dsn = sprintf(
        'mysql:host=%s;dbname=%s;charset=%s',
        $config['host'],
        $config['dbname'],
        $config['charset'] ?? 'utf8mb4'
    );
    $pdo = new PDO($dsn, $config['username'], $config['password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);

    $sql = 'INSERT INTO applications (cargo_type, from_location, to_location, phone, company_name)
            VALUES (:cargo_type, :from_location, :to_location, :phone, :company_name)';
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':cargo_type'    => $cargoType,
        ':from_location' => $from,
        ':to_location'   => $to,
        ':phone'         => $phone,
        ':company_name'  => $companyName,
    ]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database error']);
}
