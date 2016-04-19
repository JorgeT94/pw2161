var tipo="X";
var contadorX = 0;
var contadorO = 0;
function movimiento(nombre){
	if (document.getElementById(nombre).value == "") {
		document.getElementById(nombre).value = tipo;
		if(tipo == "X"){
			contadorX += 1;
			tipo = "O";	
		} 
		else{
			contadorO += 1;
			tipo = "X";
		}
		if(contadorX == 3 || contadorO == 3) checarGanador();
	}
}

function alerta(tipoL){
	alert("Ganador Equipo "+tipoL+" !!!!!");
	location.reload();
}

function checarGanador(){
	var td11 = document.gato.td111.value;
	var td12 = document.gato.td121.value;
	var td13 = document.gato.td131.value;
	var td21 = document.gato.td211.value;
	var td22 = document.gato.td221.value;
	var td23 = document.gato.td231.value;
	var td31 = document.gato.td311.value;
	var td32 = document.gato.td321.value;
	var td33 = document.gato.td331.value;

	if(td11 == td12 && td12 == td13) alerta(td11);
	else if(td21 == td22 && td22 == td23) alerta(td21);
	else if(td31 == td32 && td32 == td33) alerta(td31);
	else if(td11 == td21 && td21 == td31) alerta(td11);
	else if(td12 == td22 && td22 == td32) alerta(td12);
	else if(td13 == td23 && td23 == td33) alerta(td13);
	else if(td11 == td22 && td22 == td33) alerta(td11);
	else if(td13 == td22 && td22 == td31) alerta(td13);
	else alert("EMPATE!!!!!");

	/*if (document.gato.td111.value == document.gato.td121.value && document.gato.td121.value==document.gato.td131.value) {
		alert("Ganador Equipo "+document.gato.td111.value+" !!!");
	};*/
}