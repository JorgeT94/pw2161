var iniciaApp = function(){
	var Altas = function(){
		$("#altasAlmacenes").show("slow");
	}

	var AltaAlmacen = function(){
		event.preventDefault();
		var datos = $("#frmAltasAlmacenes").serialize();
		var parametros = "accion=altas&"+datos+"&id="+Math.random();
		$.ajax({
			beforeSend: function(){
				console.log("Dar de alta el almacén");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response){
				if (response.respuesta){
					$("#exitoAlta").show("slow");
				} else{
					$("#errorAlta").show("slow");
				}
			},
			error: function(xhr,ajaxOptions,thrownError){
				console.log("Algo salió mal");
			}
		});
	}

	var Cierra = function(){
		$("#exitoAlta").hide();
		$("#errorAlta").hide();
	}

	$("#btnAltas").on("click",Altas)
	$("#frmAltasAlmacenes").on("submit",AltaAlmacen);
	$("#cierraMsgError").on("click",Cierra);
	$("#cierraMsgExito").on("click",Cierra);
}

$(document).on("ready",iniciaApp);