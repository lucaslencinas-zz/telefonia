

/* links between the country and the buildings --> This should be at a database maybe later */
var mapCountryBuildings = [];

mapCountryBuildings['Argentina'] = {buildings:['Martinez','Catalinas','Olivos III','Sky Online','Cordoba','Rosario']};
mapCountryBuildings['Chile'] = {buildings:['Santiago','Antofagasta','San Bernardo']};
mapCountryBuildings['Uruguay'] = {buildings:['Montevideo']};
mapCountryBuildings['Peru'] = {buildings:['La Molina','Aramburu']};
mapCountryBuildings['Colombia'] = {buildings:['Bogota','Funza','Centro Empresarial', 'San Fernando']};
mapCountryBuildings['Venezuela'] = {buildings:['Caracas']};
mapCountryBuildings['Ecuador'] = {buildings:['Quito', 'Guayaquil']};


/*A couple of functions to execute when loading the specific form for each of them*/

function fillDefaultFields(){

  var countryChoosen = $("#selectPais option:selected").attr("id");
  $('#selectEdificio').find('option').remove().end();
  mapCountryBuildings[countryChoosen].buildings.forEach(function(building, index, array){
    $('#selectEdificio').append($('<option>', {
      id: building,
      text: building
    }));
  });

  $("#altaInterno-row button").click(function(){
    var data = {};
    data.nombre = "lucas";
    data.apellido = "lencinas";
    data.idIBM = 999999;
    data.pais = $("#selectPais option:selected").attr("id");
    data.edificio = $("#selectEdificio option:selected").attr("id");
    data.modulo = $('input[name=textModulo]').val();
    data.interno = $('input[name=textInterno]').val();
    data.justificacion = $('textarea[name=justificacion]').val();
    data.requiereVoiceMail = $('input[name=checkboxVoiceMail]').is(":checked");
    data.requiereAparato = $('input[name=checkboxAparato]').is(":checked");
    data.nombre = $('#nombreUsuarioEnAlta span').text();
    data.idLotusNote = $('#idLotusNoteEnAlta span').text();
    data.departamento = $('#departamentoEnAlta span').text();
    data.gerente= $('#gerenteEnAlta span').text();
    data.gerente1 = $('#gerenteNivel1EnAlta span').text();
    data.gerente2 = $('#gerenteNivel2EnAlta span').text();

    $.ajax({
  		type: "POST",
  		contentType: "application/json",
  		data: JSON.stringify(data),
  		url: "/servicios",
  		success: function (response) {
        alert(JSON.stringify(response));
  		},
  		complete:function (){
  			alert("complete");
  		},
      error: function(){
        alert("error");
      }/*,
  		statusCode: {
  			409: function () {
  					alerta("Hubo un error al grabar la rampa en la base de datos.");
  			}
  		}*/
  	});
  });
}