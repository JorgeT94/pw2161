var enBajas = false;
var iniciaApp = function(){
	var validarEntrada = function(){
		//Invalida los eventos que no corresponden a esta función.
		event.preventDefault();
		var usuario = $("#txtUsuario").val();
		var clave = $("#txtClave").val();
		//Validaciones
		//1.- Que no sean vacíos:
		if(usuario == ""){
			alert("El usuario no debe ser vacío");
			$("#txtUsuario").focus();
		}
		if(clave == ""){
			alert("La contraseña no debe ser vacío");
			$("#txtClave").focus();
		}
		//2.- Verificar usuario y contraseña:
		var parametros = "accion=validarEntrada"+
						 "&usuario="+usuario+
						 "&clave="+clave+
						 "&id="+Math.random();
		$.ajax({
			beforeSend: function(){
				console.log("Validar al usuario");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response){
				if (response.respuesta){
					$("#datosUsuario").hide();
					$("nav").show("slow");
					$("#exitoAltas").show("slow");
					$("#msgExito").html("<strong>Bienvenido "+usuario+"!</strong>");
				} else{
					alert("Usuario/contraseña incorrecto(s)");
				}
			},
			error: function(xhr,ajaxOptions,thrownError){
				console.log("Algo salió mal");
			}
		});
		/*if(usuario == "pw" && clave == "1234"){
			alert("Bienvenido "+usuario);
			//Dar entrada al usuario:
			$("#datosUsuario").hide(); //escondemos
			$("nav").show("slow"); //mostramos
		} else{
			alert("Usuario y/o contraseña incorrecta(s)");
		}*/
		console.log("Se disparó el Submit");
	}

	var Altas = function(){
		//Mostramos el formulario
		//$("nav").hide();
		enBajas = false;
		Inicio();
		$("#altaUsuarios").show("slow");
		$("#altaUsuarios h2").html("Alta Usuarios");
		//Enciendo la función de AltaUsuario
		$("#frmAltaUsuarios").on("submit",AltaUsuario);
		//Apago la función de BajaUsuario para el mismo botón.
		$("#frmAltaUsuarios").off("submit",BajaUsuario);
	}

	var AltaUsuario = function(){
		event.preventDefault();
		//alert($("#frmAltaUsuarios").serialize());
		var datos = $("#frmAltaUsuarios").serialize();
		var parametros = "accion=guardarUsuario&"+datos+
						 "&id="+Math.random();
		$.ajax({
			beforeSend: function(){
				console.log("Registrar al usuario");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response){
				if(response.respuesta){
					$("#msgExito").html("<strong>Enhorabuena!</strong> Usuario registrado correctamente");
					$("#exitoAltas").show("slow");
					//alert("Usuario registrado correctamente");
					$("#txtNombreUsuario").val("");
					$("#txtClaveUsuario").val("");
					$("#txtDepartamento").val("");
					$("#txtTipoUsuario").val(vigente);
				} else{
					alert("No se pudo guardar la informacion");
				}
			},
			error: function(xhr,ajx,thrownError){
				console.log("Algo salió mal registrando al usuario.");
			}
		});
	}
	var Bajas = function(){
		Inicio();
		enBajas = true;
		$("#altaUsuarios").show("slow");
		$("#altaUsuarios h2").html("Baja Usuarios");
		//Apago la función de AltaUsuario
		$("#frmAltaUsuarios").off("submit",AltaUsuario);
		//Enciendo la función de BajaUsuario para el mismo botón.
		$("#frmAltaUsuarios").on("submit",BajaUsuario);
	}

	var BajaUsuario = function(){
		event.preventDefault();
		//var datos = $("#frmAltaUsuarios").serialize();
		var datos = "txtNombreUsuario="+$("#txtNombreUsuario").val();
		var parametros = "accion=bajaUsuario&"+datos+"&id="+Math.random();
		$.ajax({
			beforeSend: function(){
				console.log("Baja al usuario");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response){
				if(response.respuesta){
					alert("Usuario dado de baja correctamente");
					Inicio();
					$("#txtNombreUsuario").val("");
					$("#txtClaveUsuario").val("");
				} else{
					$("#msgError").html("<strong>Error!</strong> No se pudo dar de baja la información.");
					$("#errorBajas").show("slow");
				}
			},
			error: function(xhr,ajx,thrownError){
				console.log("Algo salió mal dando de baja al usuario.");
			}
		});
	}

	var Inicio = function(){
		enBajas = false;
		$("#altaUsuarios").hide();
		$("#exitoAltas").hide();
		$("#bajaUsuarios").hide();
		$("#errorBajas").hide();
		$("#consultasUsuarios").hide();
	}

	var Salir = function(){
		Inicio();
		$("nav").hide();
		$("#datosUsuario").show("slow");
	}

	var ErrorBajas = function(){
		$("#errorBajas").hide("slow");
	}

	var ExitoAltas = function(){
		$("#exitoAltas").hide("slow");
	}

	var Rellena = function(){
		event.preventDefault();
		if(!enBajas)
			return;
		var datos = "txtNombreUsuario="+$("#txtNombreUsuario").val();
		var parametros = "accion=rellena&"+datos+"&id="+Math.random();
		$.ajax({
			beforeSend: function(){
				console.log("Completar información del usuario");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response){
				if(response.respuesta){
					$("#txtClaveUsuario").val(response.datos.clave);
					$("#txtTipoUsuario").val(response.datos.tipousuario);
					$("#txtDepartamento").val(response.datos.departamento);
				} else{
					$("#msgError").html("<strong>Error!</strong> El usuario no existe.");
					$("#errorBajas").show("slow");
				}
			},
			error: function(xhr,ajx,thrownError){
				console.log("Algo salió mal completando la información del usuario.");
			}
		});
	}

	var Consultas = function(){
		Inicio();
		$("#consultasUsuarios").show("slow");
		var parametros = "accion=consultas"+"&id="+Math.random();
		$.ajax({
			beforeSend: function(){
				console.log("Consultas usuarios");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response){
				if(response.respuesta){
					//Borra lo que ya estaba y agrega lo nuevo.
					$("#tablaConsultas").html(response.tabla);
					//Adjunta lo nuevo con lo que ya estaba.
					//$("#tablaConsultas").append(response.tabla);
				}
			},
			error: function(xhr,ajx,thrownError){
				console.log("Ha ocurrido un error en las consultas.");
			}
		});
	}

	var BajaDinamica = function(){
		var usuario = $(this).attr("id");
		alert(usuario);
		var datos = "txtNombreUsuario="+usuario;
		var parametros = "accion=bajaUsuario&"+datos+"&id="+Math.random();
		$.ajax({
			beforeSend: function(){
				console.log("Inicia la baja dinámica de usuarios");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response){
				if(response.respuesta){
					Inicio();
					Consultas();
					$("#msgExito").html("<strong>Enhorabuena!</strong> Usuario dado de baja correctamente.");
					$("#msgExito").show("slow");
				} else{
					$("#msgError").html("<strong>Error!</strong> No se pudo dar de baja la información.");
					$("#errorBajas").show("slow");
				}
			},
			error: function(xhr,ajx,thrownError){
				console.log("Algo salió mal dando de baja al usuario.");
			}
		});
	}

	$("#txtNombreUsuario").on("focusout", Rellena);
	$("#frmValidaEntrada").on("submit",validarEntrada);
	$("#btnInicio").on("click",Inicio);

	$("#btnAltas").on("click",Altas);	
	$("#frmAltaUsuarios").on("submit",AltaUsuario);

	$("#btnBajas").on("click",Bajas);

	$("#btnConsultas").on("click",Consultas);
	$("#btnSalir").on("click",Salir);

	$("#cierraErrorBajas").on("click",ErrorBajas);
	$("#cierraExitoAltas").on("click",ExitoAltas);
	//Eventos dinámicos
	$("#tablaConsultas").on("click","button",BajaDinamica);
	//Otra forma
	//$("#tablaConsultas > input").on("click",BajaDinamica);
}

$(document).on("ready",iniciaApp);