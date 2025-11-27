<?php
// /api/products.php
require __DIR__ . '/db.php';

$slug = $_GET['category'] ?? null;
$id   = $_GET['category_id'] ?? null;

try {
  if ($slug) {
    $sql = "
      SELECT p.id, p.name, p.price, p.image_url
      FROM products p
      JOIN categories c ON c.id = p.category_id
      WHERE c.slug = ?
      ORDER BY p.name
    ";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$slug]);

  } elseif ($id) {
    $sql = "
      SELECT id, name, price, image_url
      FROM products
      WHERE category_id = ?
      ORDER BY name
    ";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id]);

  } else {
    $stmt = $pdo->query("
      SELECT id, name, price, image_url
      FROM products
      ORDER BY id DESC
      LIMIT 50
    ");
  }

  echo json_encode($stmt->fetchAll());
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(['error' => 'QUERY_FAILED', 'message' => $e->getMessage()]);
}