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
    $(".page-header").append("<i class='fa fa-spinner fa-spin fa-lg fa-fw'></i>");
    $(".fa-spin").hide();
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

  /*Por ahora no pongo las funcionalidades aca de estos botones*/
  /*Los seteo dependiendo del rol que tienen*/
}

function sendFManagerDenial(){
  $.ajax({
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      ticket: $("#textTicket").val(),
      idIBM: $("#textIdFManager").val(),
      fullName: $("#textFManager").val(),
      motivo: $("#motivoRechazoEnModal").val(),
      fecha: new Date().toMysqlFormat()
    }),
    url: "/managers/rechazar",
    success: function (response) {
      alert(JSON.stringify(response));
      $('#modalRechazarTicketConfirmacion').modal('toggle');
      $('#modalTicketDescription').modal('toggle');
      location.reload();
    },
    error: function(jqXHR, textStatus, errorThrown ){
      bootbox.alert(JSON.stringify(jqXHR) + ". " + JSON.stringify(textStatus) + JSON.stringify(errorThrown) );
    }
  });
}

function sendFManagerApproval(){
  $.ajax({
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      ticket: $("#textTicket").val(),
      idIBM: $("#textIdFManager").val(),
      fullName: $("#textFManager").val(),
      fecha: new Date().toMysqlFormat()
    }),
    url: "/managers/aprobar",
    success: function (response) {
      alert(JSON.stringify(response));
      $('#modalTicketDescription').modal('toggle');
      location.reload();
    },
    error: function(jqXHR, textStatus, errorThrown ){
      bootbox.alert(JSON.stringify(jqXHR) + ". " + JSON.stringify(textStatus) + JSON.stringify(errorThrown) );
    }
  });
}

function sendTelefoniaLocalApproval(){
  $.ajax({
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      ticket: $("#textTicket").val(),
      idIBM: Cookies.get("idIBM"),
      fullName: Cookies.get("fullName"),
      fecha: new Date().toMysqlFormat(),
      mac: $("#textMac").val(),
      marca: $("#textMarca").val(),
      serie: $("#textSerie").val(),
      modelo: $("#textModelo").val()
    }),
    url: "/telefoniaLocal/aprobar",
    success: function (response) {
      alert(JSON.stringify(response));
      $('#modalTicketDescription').modal('toggle');
      location.reload();
    },
    error: function(jqXHR, textStatus, errorThrown ){
      bootbox.alert(JSON.stringify(jqXHR) + ". " + JSON.stringify(textStatus) + JSON.stringify(errorThrown) );
    }
  });
}

function sendTelefoniaLocalDenial(){
  $.ajax({
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      ticket: $("#textTicket").val(),
      idIBM: Cookies.get("idIBM"),
      fullName: Cookies.get("fullName"),
      motivo: $("#motivoRechazoEnModal").val(),
      fecha: new Date().toMysqlFormat()
    }),
    url: "/telefoniaLocal/rechazar",
    success: function (response) {
      alert(JSON.stringify(response));
      $('#modalRechazarTicketConfirmacion').modal('toggle');
      $('#modalTicketDescription').modal('toggle');
      location.reload();
    },
    error: function(jqXHR, textStatus, errorThrown ){
      bootbox.alert(JSON.stringify(jqXHR) + ". " + JSON.stringify(textStatus) + JSON.stringify(errorThrown) );
    }
  });
}

function sendTelefoniaAdminApproval(){
  $.ajax({
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      ticket: $("#textTicket").val(),
      idIBM: $("#textIdFManager").val(),
      fullName: $("#textFManager").val(),
      fecha: new Date().toMysqlFormat(),
      interno:$("#textInterno").val()
    }),
    url: "/telefoniaAdmin/aprobar",
    success: function (response) {
      alert(JSON.stringify(response));
      $('#modalTicketDescription').modal('toggle');
      location.reload();
    },
    error: function(jqXHR, textStatus, errorThrown ){
      bootbox.alert(JSON.stringify(jqXHR) + ". " + JSON.stringify(textStatus) + JSON.stringify(errorThrown) );
    }
  });
}

function sendTelefoniaAdminDenial(){
  $.ajax({
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      ticket: $("#textTicket").val(),
      idIBM: Cookies.get("idIBM"),
      fullName: Cookies.get("fullName"),
      motivo: $("#motivoRechazoEnModal").val(),
      fecha: new Date().toMysqlFormat()
    }),
    url: "/telefoniaAdmin/rechazar",
    success: function (response) {
      alert(JSON.stringify(response));
      $('#modalRechazarTicketConfirmacion').modal('toggle');
      $('#modalTicketDescription').modal('toggle');
      location.reload();
    },
    error: function(jqXHR, textStatus, errorThrown ){
      bootbox.alert(JSON.stringify(jqXHR) + ". " + JSON.stringify(textStatus) + JSON.stringify(errorThrown) );
    }
  });
}

function addModalNuevoServicio(){
  $('#modalNuevoServicio').on('shown.bs.modal', function(e) {
    $("#modalNuevoServicio .btn-success").click(function(){
      var serviceRequested = mapPagesLinks[$("#servicioSelect option:selected").attr("id")];
      $("#container-fluid").load(serviceRequested.pagina, function(){
          $("fa-spin").hide();
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
      $(".page-header").append("<i class='fa fa-spinner fa-spin fa-lg fa-fw'></i>");
      $(".fa-spin").hide();
      loadUserServices(servicesTypes);
    });
    return false;
  });
}

function loadUserServices(servicesType){
  var urlService = "";
  if(servicesType == "servicios-aprobados-a")
    urlService = "aprobados";
  if(servicesType == "servicios-pendientes-a")
    urlService = "pendientes";
  if(servicesType == "servicios-rechazados-a")
    urlService = "rechazados";
  if(servicesType == "servicios-a")
    urlService = "todos";


  $(".fa-spin").css("display","inline-block");
  $.ajax({
    type: "GET",
    contentType: "application/json",
    url: "/servicios/" + urlService + (Cookies.get("isManager") == "Y"? "/manager/":"/" ) + Cookies.get('idIBM'),
    success: function (response) {
      if(response.result == "error"){
        $(".table-responsive").prepend(response.value);
      }else{
        renderServiceOnTable(response.value);
      }
    },
    complete: function(){
      $(".fa-spin").hide();
    },
    error: function(jqXHR, textStatus, errorThrown ){
      bootbox.alert(JSON.stringify(jqXHR) + ". " + JSON.stringify(textStatus) + JSON.stringify(errorThrown) );
    }
  });
}

function renderServiceOnTable(servicios){
  var stringFila;
  servicios.forEach(function(servicio, index, array){
    var ticket = new Ticket(servicio);
    $("table tbody").append(ticket.toRowString());
  });
}


function cargarTraerDatosRow(onLoadFunction){
  $("#rowTraerDatos").load("traer-datos-div.html",function(){
    $(".fa-spin").hide();
    $('#rowTraerDatos').next().find('input, textarea, button, select').attr('disabled',true);
    $("#traerDatosButton").click(function(){
      $(".fa-spin").css("display","inline-block");
      $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/data/" + $('#nroEmpleado').val(),
        success: function (response) {
          if(response.result == "error"){
            $("#traerDatosErrorMsg").html(response.value);
            $("#nroEmpleado").css("border-color", "red");
          }else{
            $("#traerDatosErrorMsg").html("");
            $("#nroEmpleado").css("border-color", "#ccc");

            habilitarForm(response.value,onLoadFunction);
          }
        },
        complete: function(){
          $(".fa-spin").hide();
        },
        error: function(jqXHR, textStatus, errorThrown ){
          bootbox.alert(JSON.stringify(jqXHR) + ". " + JSON.stringify(textStatus) + JSON.stringify(errorThrown) );
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
      if(response.result == "error"){
        bootbox.alert("Hubo un error con el ticket: " + response.value);
      }else{
        $('#modalTicketDescription').modal('toggle');
        var modalBody = $("#modalTicketDescription .modal-body");
        modalBody.load("modal-content-alta-interno.html", function(){
          loadContentAltaInternoModal(response.value);
          requestTicketLogs(response.value.ticket);
        });
      }
    },
    error: function(jqXHR, textStatus, errorThrown ){
      bootbox.alert(JSON.stringify(jqXHR) + ". " + JSON.stringify(textStatus) + JSON.stringify(errorThrown) );
    }
  });
}

function requestTicketLogs(ticket){
  $.ajax({
    type: "GET",
    contentType: "application/json",
    url: "/logs/" + ticket,
    success: function(response){
      if(response.result == "error"){
        bootbox.alert("Hubo un error con los logs del ticket: " + response.value);
      }else{
        response.value.forEach(function(log, index, array){
            $('#logsList').append('<li>'+log.descripcion+'</li>');
        });
      }
    },
    error: function(jqXHR, textStatus, errorThrown ){
      bootbox.alert(JSON.stringify(jqXHR) + ". " + JSON.stringify(textStatus) + JSON.stringify(errorThrown) );
    }
  });
}

function loadContentAltaInternoModal(info){
  $('#selectPais option[id="' + info.pais +'"]').prop("selected",true);
  $("#textIdIBM").val(info.idIBM);
  $("#textFullName").val(info.fullName);
  $("#textTicket").val(info.ticket);
  $("#textEstado").val(State.betterString(info.estado));
  $("#textServicio").val(info.servicio);
  $("#textTipo").val(info.tipo);
  $("#textIdFManager").val(info.idFManager);
  $("#textFManager").val(info.fManager);
  $("#textIdSManager").val(info.idSManager);
  $("#textSManager").val(info.sManager);
  $("#textFechaInicio").val((new Date(info.fechaInicio)).toLocaleString());
  $("#textPiso").val(info.piso);
  $("#textDepartamento").val(info.departamento);
  $("#textInterno").val(info.intReferencia);
  $('#checkboxAparato').prop('checked', (info.aparato == "SI"? true: false));
  $('#checkboxVoiceMail').prop('checked', (info.voicemail == "SI"? true: false));
  $('#selectDiscado option[id="' + info.discado +'"]').prop("selected",true);
  $('#justificacion').val(info.justificacion);

  checkPermittedActions(info);

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

function checkPermittedActions(info){
  var actionNeededAsManager = Cookies.get("isManager") == "Y" && Cookies.get("idIBM") == info.idFManager && info.estado == "pendienteGerente";
  var actionNeededAsTelefoniaLocal = Cookies.get("isTelefoniaLocal") == "Y" && Cookies.get("pais") == info.pais && info.estado == "pendienteTelefoniaLocal";
  var actionNeededAsTelefoniaAdmin = Cookies.get("isTelefoniaAdmin") == "Y" && info.estado == "pendienteTelefoniaAdmin";

  $(".modal-footer .btn-success").hide();
  $(".modal-footer .btn-danger").hide();
  $('#altaInterno-row').find('input, textarea, button, select').attr('disabled',true);

  if(actionNeededAsManager || actionNeededAsTelefoniaAdmin || actionNeededAsTelefoniaLocal){
    $(".modal-footer .btn-success").show();
    $(".modal-footer .btn-danger").show();
    $('#altaInterno-row').find('input, textarea, button, select').attr('disabled',false);
  }
  if(actionNeededAsManager){
    $("#btnAprobarTicket").click(function(event){
      console.log("actionNeededAsManager");
      sendFManagerApproval();
      event.stopImmediatePropagation();
    });
    $("#btnRechazarTicket").click(function(event){
      console.log("actionNeededAsManager");
      $('#modalRechazarTicketConfirmacion').modal('toggle');
      event.stopImmediatePropagation();
    });
    $("#btnModalRechazar").click(function(event){
      console.log("actionNeededAsManager");
      sendFManagerDenial();
      event.stopImmediatePropagation();
    });
  }

  if(actionNeededAsTelefoniaLocal){
    $("#btnAprobarTicket").click(function(event){
      console.log("actionNeededAsTelefoniaLocal");
      $('#modalAprobarTicketConfirmacion').modal('toggle');
      $(".form-group-local").show();
      $(".form-group-admin").hide();
      event.stopImmediatePropagation();
    });
    $("#btnModalAprobar").click(function(event){
      console.log("actionNeededAsTelefoniaLocal");
      sendTelefoniaLocalApproval();
      event.stopImmediatePropagation();
    });
    $("#btnRechazarTicket").click(function(event){
      console.log("actionNeededAsTelefoniaLocal");
      $('#modalRechazarTicketConfirmacion').modal('toggle');
      event.stopImmediatePropagation();
    });
    $("#btnModalRechazar").click(function(event){
      console.log("actionNeededAsTelefoniaLocal");
      sendTelefoniaLocalDenial();
      event.stopImmediatePropagation();
    });
  }

  if(actionNeededAsTelefoniaAdmin){
    $("#btnAprobarTicket").click(function(event){
      console.log("actionNeededAsTelefoniaLocal");
      $('#modalAprobarTicketConfirmacion').modal('toggle');
      $(".form-group-local").hide();
      $(".form-group-admin").show();
      event.stopImmediatePropagation();
    });
    $("#btnModalAprobar").click(function(event){
      console.log("actionNeededAsTelefoniaLocal");
      sendTelefoniaAdminApproval();
      event.stopImmediatePropagation();
    });
    $("#btnRechazarTicket").click(function(event){
      console.log("actionNeededAsTelefoniaLocal");
      $('#modalRechazarTicketConfirmacion').modal('toggle');
      event.stopImmediatePropagation();
    });
    $("#btnModalRechazar").click(function(event){
      console.log("actionNeededAsTelefoniaLocal");
      sendTelefoniaAdminDenial();
      event.stopImmediatePropagation();
    });
  }

}
