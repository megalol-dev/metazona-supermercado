<?php
require __DIR__ . '/db.php';

try {
  $stmt = $pdo->query("SELECT id, name, slug FROM categories ORDER BY name");
  echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode([
    'error'   => 'QUERY_FAILED',
    'message' => $e->getMessage()
  ]);
}

