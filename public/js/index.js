/*
DEPENDENCIES
login.js
*/
var mapPagesLinks = [];

mapPagesLinks['altaInterno-a'] = {pagina: "alta-interno-div.html", actionOnLoad: setAltaInternoBehaviour}
mapPagesLinks['altaLineaAnalogica-a'] = {pagina: "alta-linea-analogica-div.html"}
mapPagesLinks['altaCallForwardings-a'] = {pagina: "alta-call-forwarding-div.html"}
mapPagesLinks['altaHuntGroup-a'] = {pagina: "alta-hunt-group-div.html"}
mapPagesLinks['altaPickupGroup-a'] = {pagina: "alta-pickup-group-div.html"}
mapPagesLinks['altaCodigoFAC-a'] = {pagina: "alta-codigo-fac-div.html"}
mapPagesLinks['altaCodigoCMC-a'] = {pagina: "alta-codigo-cmc-div.html"}
mapPagesLinks['delegar-a'] = {pagina: "delegar-div.html"}
mapPagesLinks['servicios-a'] = {pagina: "servicios-div.html"}
mapPagesLinks['servicios-aprobados-a'] = {pagina: "servicios-aprobados-div.html"}
mapPagesLinks['servicios-rechazados-a'] = {pagina: "servicios-rechazados-div.html"}
mapPagesLinks['servicios-pendientes-a'] = {pagina: "servicios-pendientes-div.html"}
mapPagesLinks['solicitar-voice-mail-a'] = {pagina: "solicitar-voice-mail-div.html"}
mapPagesLinks['solicitar-aparato-a'] = {pagina: "solicitar-aparato-div.html"}
mapPagesLinks['cambio-de-discado-a'] = {pagina: "cambio-de-discado-div.html"}
mapPagesLinks['reset-password-a'] = {pagina: "reset-password-div.html"}
mapPagesLinks['re-asignar-a'] = {pagina: "re-asignar-div.html"}
mapPagesLinks['dar-de-baja-a'] = {pagina: "dar-de-baja-div.html"}
mapPagesLinks['revalidar-a'] = {pagina: "revalidar-div.html"}

/*When the page is loaded*/
$(function(){
  if(isLoggedIn()){
    refreshLogin();
    loadInitialPage();
    loadButtonsFunctionalities();
  }else{
    location.href = "login.html";
  }
});

function loadInitialPage(){
  $("#dropdownNombreUsuario").text(Cookies.get('fullName').split(" ")[0]);
  $("#container-fluid").load(mapPagesLinks["servicios-a"].pagina, function(){
    loadUserServices("servicios-a");
  });
  addRedirectionToLeftLinks();
  addModalNuevoServicio();
  $("#logoutButton").click(function(){
    logOut();
    location.href = "login.html";
  });
}

function loadButtonsFunctionalities(){
  $("#btnAprobarTicket").click(function(){
    sendFManagerApproval();
  });
  $("#btnRechazarTicket").click(function(){
    $('#modalRechazarTicketConfirmacion').modal('toggle');
  });
  $("#btnModalRechazar").click(function(){
    sendFManagerDenial();
  });
}

function sendFManagerDenial(){
  /*ajax call*/
  alert("hacer la llamada ajax");
  $('#modalRechazarTicketConfirmacion').modal('toggle');
  $('#modalTicketDescription').modal('toggle');
}

function sendFManagerApproval(){
  /*ajax call*/
  alert("hacer la llamada ajax");
  $('#modalTicketDescription').modal('toggle');
}

function addModalNuevoServicio(){
  $('#modalNuevoServicio').on('shown.bs.modal', function(e) {
    $("#modalNuevoServicio .btn-success").click(function(){
      var serviceRequested = mapPagesLinks[$("#servicioSelect option:selected").attr("id")];
      $("#container-fluid").load(serviceRequested.pagina, function(){
          cargarTraerDatosRow(serviceRequested.actionOnLoad);
      });
      $("#modalNuevoServicio").modal('hide');
      return false;
    });
    $("#modalNuevoServicio .btn-default").click(function(){
      $("#modalNuevoServicio").modal('hide');
      return false;
    });
  });
}

function addRedirectionToLeftLinks(){
  $(".side-nav a").click(function(){
    var servicesTypes = $(this).attr("id");
    $("#container-fluid").load(mapPagesLinks[servicesTypes].pagina,function(){
      loadUserServices(servicesTypes);
    });
    return false;
  });
}

function loadUserServices(servicesType){
  console.log("pedir a la base de datos los servicios del usuairo actual: " + servicesType);
  var urlService = "";
  if(servicesType == "servicios-aprobados-a")
    urlService = "aprobados";
  if(servicesType == "servicios-pendientes-a")
    urlService = "pendientes";
  if(servicesType == "servicios-rechazados-a")
    urlService = "rechazados";
  if(servicesType == "servicios-a")
    urlService = "todos";

  $.ajax({
    type: "GET",
    contentType: "application/json",
    url: "/servicios/" + urlService + (Cookies.get("isManager") == "Y"? "/manager/":"/" ) + Cookies.get('idIBM'),
    success: function (response) {
      console.log(JSON.stringify(response));
      renderServiceOnTable(response.value);
    },
    error: function(){
      console.log("error");
      alert("Hubo un error en el servidor");
    }
  });
}

function renderServiceOnTable(servicios){
  var stringFila;
  servicios.forEach(function(servicio, index, array){
    stringFila = "<tr>";
    stringFila += "<tr>";
    stringFila += "<th scope='row'><a onclick='abrirModalDeTicket(" + servicio.ticket + ");'>" + servicio.ticket + "</a></th>";
    stringFila += "<td>" + servicio.fullName + "</td>";
    stringFila += "<td>" + servicio.idIBM + "</td>";
    stringFila += "<td>" + servicio.fechaInicio + "</td>";
    stringFila += "<td>" + "Alta Interno" + "</td>";
    stringFila += "<td>" + "Alta" + "</td>";
    stringFila += "<td>" + servicio.estado + "</td>";
    stringFila += "</tr>";

    $("table tbody").append(stringFila);
  });
}


function cargarTraerDatosRow(onLoadFunction){
  $("#rowTraerDatos").load("traer-datos-div.html",function(){
      $('#rowTraerDatos').next().find('input, textarea, button, select').attr('disabled',true);
      $("#traerDatosButton").click(function(){
        $.ajax({
          type: "GET",
          contentType: "application/json",
          url: "/data/" + $('#nroEmpleado').val(),
          success: function (response) {
            console.log(JSON.stringify(response));
            if(response.result == "error"){
              $("#traerDatosErrorMsg").html(response.value);
              $("#nroEmpleado").css("border-color", "red");
            }else{
              $("#traerDatosErrorMsg").html("");
              $("#nroEmpleado").css("border-color", "#ccc");

              habilitarForm(response.value,onLoadFunction);
            }
          },
          error: function(){
            console.log("error");
            alert("Hubo un error en el servidor");
          }
        });
    });
  });
}

function habilitarForm(response, onLoadFunction){
  renderResponseOnTraerDatos(response);
  $('#rowTraerDatos').next().find('input, textarea, button, select').attr('disabled',false);
  onLoadFunction();
}

function renderResponseOnTraerDatos(response){
  $('#fullNameUsuarioEnAlta span').text(response.fullName);
  $('#idIBMEnAlta span').text(response.idIBM);
  $('#departamentoEnAlta span').text(response.departamento);
  $('#gerente1EnAlta span').text(response.fManager);
  $('#gerente2EnAlta span').text(response.sManager);
  $('#idGerente1EnAlta span').text(response.idFManager);
  $('#idGerente2EnAlta span').text(response.idSManager);
}



function abrirModalDeTicket(nroTicket){
  $.ajax({
    type: "GET",
    contentType: "application/json",
    url: "/servicios/" + nroTicket,
    success: function(response){
      console.log("response: " + JSON.stringify(response));
      if(response.result == "error"){
        alert("Hubo un error con el ticket: " + response.value);
      }else{
        $('#modalTicketDescription').modal('toggle');
        var modalBody = $("#modalTicketDescription .modal-body");
        modalBody.load("modal-content-alta-interno.html", function(){
          loadContentAltaInternoModal(response.value);
          requestTicketLogs(response.value.ticket);
        });
      }
    }
  });
}

function requestTicketLogs(ticket){
  $.ajax({
    type: "GET",
    contentType: "application/json",
    url: "/logs/" + ticket,
    success: function(response){
      console.log("response: " + JSON.stringify(response));
      if(response.result == "error"){
        alert("Hubo un error con los logs del ticket: " + response.value);
      }else{
        response.value.forEach(function(log, index, array){
            $('#logsList').append('<li>'+log.descripcion+'</li>');
        });
      }
    }
  });
}

function loadContentAltaInternoModal(info){


  $('#selectPais option[id="' + info.pais +'"]').prop("selected",true);
  $("#textIdIBM").val(info.idIBM);
  $("#textFullName").val(info.fullName);
  $("#textTicket").val(info.ticket);
  $("#textEstado").val(info.estado);
  $("#textServicio").val(info.servicio);
  $("#textTipo").val(info.tipo);
  $("#textIdFManager").val(info.idFManager);
  $("#textFManager").val(info.fManager);
  $("#textIdSManager").val(info.idSManager);
  $("#textSManager").val(info.sManager);
  $("#textFechaInicio").val(info.fechaInicio);
  $("#textPiso").val(info.piso);
  $("#textDepartamento").val(info.departamento);
  $("#textInterno").val(info.intReferencia);
  $('#checkboxAparato').prop('checked', (info.aparato == "SI"? true: false));
  $('#checkboxVoiceMail').prop('checked', (info.voicemail == "SI"? true: false));
  $('#selectDiscado option[id="' + info.discado +'"]').prop("selected",true);
  $('#justificacion').val(info.justificacion);

  if(!(Cookies.get("isManager") == "Y" && Cookies.get("idIBM") == info.idFManager)){
    $(".modal-footer .btn-success").remove();
    $(".modal-footer .btn-warning").remove();
  }

  var countryChoosen = $("#selectPais option:selected").attr("id");
  $('#selectEdificio').find('option').remove().end();
  mapCountryBuildings[countryChoosen].buildings.forEach(function(building, index, array){
    if(building == info.edificio){
      $('#selectEdificio').append($('<option>', {
        id: building,
        text: building,
        selected: true
      }));
    }else{
      $('#selectEdificio').append($('<option>', {
        id: building,
        text: building
      }));
    }
  });

}
