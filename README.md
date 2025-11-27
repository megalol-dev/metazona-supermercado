# 🛒 Metazona — Mini Supermercado Online

Metazona es un supermercado online simple pero funcional, creado como proyecto de portafolio.
Incluye categorías, carrito dinámico, modal de compra, backend en PHP y conexión a MySQL.

---

## 🧩 Características principales

✔ Navegación por categorías

✔ Productos cargados dinámicamente vía PHP/MySQL

✔ Carrito completamente funcional

✔ Editar cantidades: sumar, restar, eliminar

✔ Mostrar precio total por producto

✔ Modal de carrito con overlay

✔ Responsive para PC, tablet y móvil

✔ Notificación flotante al añadir productos

✔ Base de datos incluida (metazona.sql)


### ✔️ Instalación de la base datos 
1️⃣ Iniciar XAMPP

Asegúrate de activar en el panel de control:
-> Apache
-> MySQL

2️⃣ Abrir phpMyAdmin
http://localhost/phpmyadmin

3️⃣ Crear la base de datos
-> Nombre de la base datos debe ser newmetazona
-> Collation: utf8mb4_general_ci

4️⃣ Importar el archivo SQL
/base_de_datos/metazona.sql

### 🔌 Conexión PHP (api/products.php)
```text
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
```
### ▶️ Ejecutar el proyecto
C:/xampp/htdocs/metazona/

## 📂 Estructura del proyecto

```text
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
```
---

### Notas del proyecto
Actualemnte el proyecto cuenta con 2 menús para la tienda e imagenes para ambos menús.
Sin embargo toda la lógica ya está creada para que tú puedas añadir los menús e imagenes que necesites

✔ Para añadir mas menus -> mira la estructura del HTML

✔ Para añadir mas imagenes -> mria la carpeta img

✔ Para añadir mas articulos -> mira la base de datos, solo sigue el orden de IDs de las categorías

