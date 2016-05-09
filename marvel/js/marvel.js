var inicio = function(){
	var clicBoton = function(){
		var texto = $("#txtBuscar").val();
		$("#tablaMarvel").html("");
		$.ajax({
			beforeSend: function(){
				console.log("Espere...");
				$("html,body").css("cursor","wait");
			},
			url: "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=917a152f0e410214e0bec334a3bf6128&hash=64c0db5c2d22a1c31bf436e4ecc37edd&nameStartsWith="+texto,
			dataType: "json",
			success: function(data){
				console.log(data);
				$("html,body").css("cursor","default");
				var resultados = data.data.results;
				var renglon = "<tr><th>Nombre</th><th>Descripción</th><th>Fotografía</th></tr>";
				$("#tablaMarvel").append(renglon);
				renglon = '';
				for(var i = 0; i<= resultados.length-1; i++){
				//for (var i = resultados.length - 1; i >= 0; i--) {
					if(resultados[i].description == ""){
						renglon += '<tr><td>'+resultados[i].name+
							   '</td><td>'+"-- Sin descripción --"+
							   '</td><td><img src='+resultados[i].thumbnail.path+"."+resultados[i].thumbnail.extension+
							   '></td></tr>';
						continue;
					}
					renglon += '<tr><td>'+resultados[i].name+
							   '</td><td>'+resultados[i].description+
							   '</td><td><img src='+resultados[i].thumbnail.path+"."+resultados[i].thumbnail.extension+
							   '></td></tr>';
				}
				$("#tablaMarvel").append(renglon);
				//$("#foto").attr("src",resultados[1].thumbnail.path+"."+resultados[1].thumbnail.extension);
				//$("#nombre")
			},
			error: function(xhr,error,throws){
				console.log("Ocurrió un error");
			}
		})
	}
	$("#miBoton").on("click",clicBoton);
}

//Main
$(document).on("ready",inicio);