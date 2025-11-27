🛒 Metazona — Mini Supermercado Online

Metazona es un supermercado online simple pero funcional, creado como proyecto de portafolio.
Incluye categorías, carrito dinámico, modal de compra, backend en PHP y conexión a MySQL.

✨ Características

✔ Navegación por categorías

✔ Productos cargados dinámicamente vía PHP/MySQL

✔ Carrito completamente funcional

✔ Editar cantidades: sumar, restar, eliminar

✔ Mostrar precio total por producto

✔ Modal de carrito con overlay

✔ Responsive para PC, tablet y móvil

✔ Notificación flotante al añadir productos

✔ Base de datos incluida (metazona.sql)

📁 Estructura del proyecto
metazona/
│
├── api/
│   └── products.php
│
├── img/
│   ├── frutas/
│   ├── carnes/
│   └── ...
│
├── base_de_datos/
│   └── metazona.sql
│
├── app.js
├── carrito.js
├── navegacion.js
├── estilos.css
├── index.php / index.html
└── README.md

🗄️ Instalación de la base de datos
1️⃣ Iniciar XAMPP

Asegúrate de activar:

Apache

MySQL

2️⃣ Abrir phpMyAdmin
http://localhost/phpmyadmin

3️⃣ Crear la base de datos

Nombre recomendado:

metazona


Collation:

utf8mb4_general_ci

4️⃣ Importar el archivo SQL

Ir a Importar → Seleccionar:

/base_de_datos/metazona.sql


Presiona Importar.

🔌 Conexión PHP (api/products.php)
<?php
$conexion = new mysqli("localhost", "root", "", "metazona");

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

$cat = $_GET['category'] ?? '';

$stmt = $conexion->prepare("SELECT * FROM productos WHERE categoria = ?");
$stmt->bind_param("s", $cat);
$stmt->execute();

$res = $stmt->get_result();
$productos = $res->fetch_all(MYSQLI_ASSOC);

echo json_encode($productos);

▶️ Ejecutar el proyecto

Coloca el proyecto aquí:

C:/xampp/htdocs/metazona/


Luego abre:

http://localhost/metazona/


Comprueba que:

Apache está encendido

MySQL está encendido

La base está importada

Los productos cargan correctamente

El carrito abre en formato modal

🛒 Carrito de compra

Funciones soportadas:

Añadir productos (con toast de confirmación)

Ver productos en un modal

Sumar/restar unidades

Eliminar productos

Ver total calculado al momento

Modal bloquea el scroll mientras está abierto

Toast de mensaje:

mostrarToast("Producto añadido al carrito");
