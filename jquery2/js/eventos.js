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
		var parametros = "accion=validaEntrada"+
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
		$("#errorBajas").hide();
		$("#bajaUsuarios").hide();
		$("#altaUsuarios").show("slow");
	}

	var AltaUsuario = function(){
		event.preventDefault();
		//alert($("#frmAltaUsuarios").serialize());
		var datos = $("#frmAltaUsuarios").serialize();
		var parametros = "accion=guardaUsuario&"+datos+"&id="+Math.random();
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
					$("#exitoAltas").show("slow");
					//alert("Usuario registrado correctamente");
					$("#txtNombreUsuario").val("");
					$("#txtClaveUsuario").val("");
					$("#txtTipoUsuario").val(vigente);
					$("#txtDepartamento").val("");
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
		$("#exitoAltas").hide();
		$("#altaUsuarios").hide();
		$("#bajaUsuarios").show("slow");
	}

	var BajaUsuario = function(){
		event.preventDefault();
		var datos = $("#frmBajaUsuarios").serialize();
		var parametros = "accion=eliminaUsuario&"+datos+"&id="+Math.random();
		$.ajax({
			beforeSend: function(){
				console.log("Eliminar al usuario");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response){
				if(response.respuesta){
					alert("Usuario eliminado correctamente");
					Inicio();
					$("#txtNombreUsuario").val("");
					$("#txtClaveUsuario").val("");
				} else{
					$("#errorBajas").show("slow");
					//alert("El usuario no existe o la contraseña es incorrecta");
				}
			},
			error: function(xhr,ajx,thrownError){
				console.log("Algo salió mal eliminando al usuario.");
			}
		});
	}

	var Inicio = function(){
		$("#altaUsuarios").hide();
		$("#exitoAltas").hide();
		$("#bajaUsuarios").hide();
		$("#errorBajas").hide();
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

	$("#frmValidaEntrada").on("submit",validarEntrada);
	$("#btnInicio").on("click",Inicio);
	$("#btnAltas").on("click",Altas);
	$("#frmAltaUsuarios").on("submit",AltaUsuario);
	$("#btnBajas").on("click",Bajas);
	$("#frmBajaUsuarios").on("submit",BajaUsuario);
	$("#btnSalir").on("click",Salir);

	$("#cierraErrorBajas").on("click",ErrorBajas);
	$("#cierraExitoAltas").on("click",ExitoAltas);
}
$(document).on("ready",iniciaApp);