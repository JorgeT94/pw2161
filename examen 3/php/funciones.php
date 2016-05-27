<?php 

function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") {
  $theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;
  $theValue = function_exists("mysql_real_escape_string") ? mysql_real_escape_string($theValue) : mysql_escape_string($theValue);
  switch ($theType) {
    case "text":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;    
    case "long":
    case "int":
      $theValue = ($theValue != "") ? intval($theValue) : "NULL";
      break;
    case "double":
      $theValue = ($theValue != "") ? "'" . doubleval($theValue) . "'" : "NULL";
      break;
    case "date":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;
    case "defined":
      $theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
      break;
  }
  return $theValue;
}

function altaAlmacen(){
	$almacen = GetSQLValueString($_POST["txtNombre"],"text");
	$dir1 = GetSQLValueString($_POST["txtDir1"],"text");
	$dir2 = GetSQLValueString($_POST["txtDir2"],"text");
	$cp = GetSQLValueString($_POST["txtCP"],"text");
	$localidad = GetSQLValueString($_POST["txtLocalidad"],"text");
	$provincia = GetSQLValueString($_POST["txtProvincia"],"text");
	$respuesta = false;
	$conexion = mysql_connect("localhost","root","");
	mysql_select_db("examen");
	$guarda = sprintf("insert into almacenes values(null,%s,%s,%s,%s,%s,%s)",$almacen,$dir1,$dir2,$cp,$localidad,$provincia);
	mysql_query($guarda);
	if(mysql_affected_rows() > 0)
	{
		$respuesta = true;
	} 
	$salidaJSON = array('respuesta' => $respuesta);
	print json_encode($salidaJSON);
}

$accion = $_POST["accion"];

switch ($accion) {
	case 'altas':
		altaAlmacen();
		break;
	
	default:
		# code...
		break;
}
?>