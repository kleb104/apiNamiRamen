<?php
// Composer autoloader
require_once 'vendor/autoload.php';
/*Encabezada de las solicitudes*/
/*CORS*/
header("Access-Control-Allow-Origin: * ");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json');

/*--- Requerimientos Clases o librerías*/
require_once "controllers/core/Config.php";
require_once "controllers/core/HandleException.php";
require_once "controllers/core/Logger.php";
require_once "controllers/core/MySqlConnect.php";
require_once "controllers/core/Request.php";
require_once "controllers/core/Response.php";

/***--- Agregar todos los modelos*/
require_once "controllers/CategoriaModel.php";
require_once "controllers/ComboModel.php";
require_once "controllers/DireccionEntregaModel.php";
require_once "controllers/EstacionModel.php";
require_once "controllers/IngredienteModel.php";
require_once "controllers/MenuModel.php";
require_once "controllers/PagoModel.php";
require_once "controllers/PedidoModel.php";
require_once "controllers/PedidoDetalleModel.php";
require_once "controllers/ProcesoPreparacionModel.php";
require_once "controllers/ProductoModel.php";
require_once "controllers/RolModel.php";
require_once "controllers/SeguimientoCocinaModel.php";
require_once "controllers/UsuarioModel.php";

/***--- Agregar todos los controladores*/
require_once "controllers/CategoriaController.php";
require_once "controllers/ComboController.php";
require_once "controllers/DireccionEntregaController.php";
require_once "controllers/EstacionController.php";
require_once "controllers/IngredienteController.php";
require_once "controllers/MenuController.php";
require_once "controllers/PagoController.php";
require_once "controllers/PedidoController.php";
require_once "controllers/PedidoDetalleController.php";
require_once "controllers/ProcesoPreparacionController.php";
require_once "controllers/ProductoController.php";
require_once "controllers/RolController.php";
require_once "controllers/SeguimientoCocinaController.php";
require_once "controllers/UsuarioController.php";


//Enrutador
require_once "routes/RoutesController.php";
$index = new RoutesController();
$index->index();


