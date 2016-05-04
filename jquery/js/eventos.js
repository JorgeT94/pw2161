/*
jquery(etiquetas,clases,id)
$ alias (un sobrenombre)
$ == jquery
*/
var inicio = function(){
	var clicBoton = function(){
		console.log("Clic del botón");
		$(".anuncioWeb").html("Clic del Botón");
		$(".anuncioWeb").append("Clic del Botón");
	}
	var clicBoton2 = function(){
		$.ajax({
			beforeSend: function(){
				console.log("Espere...");
				$('html,body').css('cursor','wait');
			},
  			url: 'https://randomuser.me/api/',
  			dataType: 'json',
  			success: function(data){
  				console.log(data);
  				$('html,body').css('cursor','default');
  				// alert(data.results[0].name.first+" "+data.results[0].name.last);
  				//Mostramos la información en el HTML
  				$("#fotoPersona").attr("src",data.results[0].picture.large);
  				$("#txtNombreUser").html(data.results[0].name.first);
  				$("#txtApellidoUser").html(data.results[0].name.last);
  				if(data.results[0].name.first.charAt(0) == 'm'){
  					alert("La persona empieza con M");
  				}
  			},
  			error: function(xhr,error,throws){
  				console.log("Ocurrió un error");
  			}
		});
	}
	var teclaUnInput = function(tecla){
		if(tecla.which == 13){
			//Que se posicione en otroInput
			$("#otroInput").focus();
		}
	}
	//Preparar los eventos de todos mis objetos.
	$("#miBoton").off("click",clicBoton);
	$("#miBoton").on("click",clicBoton2);
	$("#unInput").on("keypress",teclaUnInput);
}
//Main
$(document).on("ready",inicio);