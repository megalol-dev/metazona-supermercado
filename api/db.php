<?php
// /api/db.php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');

try {
  $pdo = new PDO(
    'mysql:host=localhost;dbname=newmetazona;charset=utf8mb4',
    'root',     // usuario por defecto en XAMPP
    '',         // contraseña por defecto vacía
    [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]
  );
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode([
    'error' => 'DB_CONNECTION_FAILED',
    'message' => $e->getMessage(),
  ]);
  exit;
}

