

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
    alert("Todavia no se pueden cargar solicitudes");
  });
}
