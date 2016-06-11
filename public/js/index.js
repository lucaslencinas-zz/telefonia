/*
DEPENDENCIES
login.js
controllers.js
*/
var controllers = [];

controllers['altaInterno-a'] = altaInternoController;
controllers['altaLineaAnalogica-a'] = altaLineaAnalogicaController;
controllers['altaCallForwardings-a'] = altaCallForwardingsController;
controllers['altaHuntGroup-a'] = altaHuntGroupController;
controllers['altaPickupGroup-a'] = altaPickupGroupController;
controllers['altaCodigoFAC-a'] = altaCodigoFACController;
controllers['altaCodigoCMC-a'] = altaCodigoCMCController;
controllers['delegar-a'] = delegarController;
controllers['servicios-a'] = serviciosController;
controllers['servicios-aprobados-a'] = serviciosAprobadosController;
controllers['servicios-rechazados-a'] = serviciosRechazadosController;
controllers['servicios-pendientes-a'] = serviciosPendientesController;
controllers['solicitar-voice-mail-a'] = solicitarVoiceMailController;
controllers['solicitar-aparato-a'] = solicitarAparatoController;
controllers['cambio-de-discado-a'] = cambioDiscadoController;
controllers['reset-password-a'] = resetPasswordController;
controllers['re-asignar-a'] = reasignarController;
controllers['dar-de-baja-a'] = darDeBajaController;
controllers['revalidar-a'] = revalidarController;

controllers['ticketDescription'] = ticketDescriptionController;

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
  $("#container-fluid").load(controllers["servicios-a"].pagina, function(){
    $(".my-page-header").append("<i class='fa fa-spinner fa-spin fa-lg fa-fw'></i>");
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
      bootbox.alert("<strong>Resultado: Se rechazó el ticket nro:" + response.id + ".</strong>", function() {
        location.reload();
      });
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
      bootbox.alert("<strong>Resultado: Se aprobó exitosamente el ticket nro:" + response.id + ".</strong>", function() {
        location.reload();
      });
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
      mac: $("#modalAprobarTicketConfirmacion #textMac").val(),
      marca: $("#modalAprobarTicketConfirmacion #textMarca").val(),
      serie: $("#modalAprobarTicketConfirmacion #textSerie").val(),
      modelo: $("#modalAprobarTicketConfirmacion #textModelo").val()
    }),
    url: "/telefoniaLocal/aprobar",
    success: function (response) {
      bootbox.alert("<strong>Resultado: Se aprobó exitosamente el ticket nro:" + response.id + ".</strong>", function() {
        location.reload();
      });
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
      bootbox.alert("<strong>Resultado: Se rechazó el ticket nro:" + response.id + ".</strong>", function() {
        location.reload();
      });
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
      interno:$("#modalAprobarTicketConfirmacion #textInterno").val()
    }),
    url: "/telefoniaAdmin/aprobar",
    success: function (response) {
      bootbox.alert("<strong>Resultado: Se aprobó exitosamente el ticket nro:" + response.id + ".</strong>", function() {
        location.reload();
      });
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
      bootbox.alert("<strong>Resultado: Se rechazó el ticket nro:" + response.id + ".</strong>", function() {
        location.reload();
      });
    },
    error: function(jqXHR, textStatus, errorThrown ){
      bootbox.alert(JSON.stringify(jqXHR) + ". " + JSON.stringify(textStatus) + JSON.stringify(errorThrown) );
    }
  });
}

function addModalNuevoServicio(){
  $('#modalNuevoServicio').on('shown.bs.modal', function(e) {
    $("#modalNuevoServicio .btn-success").click(function(){
      var serviceController = controllers[$("#servicioSelect option:selected").attr("id")];
      $("#container-fluid").load(serviceController.pagina, function(){
          $("fa-spin").hide();
          serviceController.setOnSubmitClick();
          cargarTraerDatosRow(serviceController.onTraerDatosClick);
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
    $("#container-fluid").load(controllers[servicesTypes].pagina,function(){
      $(".my-page-header").append("<i class='fa fa-spinner fa-spin fa-lg fa-fw'></i>");
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
        $(".table-responsive").prepend("<div class='alert alert-warning' role='alert'>" + response.value + "</div>");
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
  $("tbody .fa-spin").hide();
}


function cargarTraerDatosRow(onTraerDatosClick){
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
            clearRightTraerDatosForm();
          }else{
            $("#traerDatosErrorMsg").html("");
            $("#nroEmpleado").css("border-color", "#ccc");

            habilitarForm(response.value,onTraerDatosClick);
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

function clearRightTraerDatosForm(){
  $('#fullNameUsuarioEnAlta span').text("");
  $('#idIBMEnAlta span').text("");
  $('#departamentoEnAlta span').text("");
  $('#gerente1EnAlta span').text("");
  $('#gerente2EnAlta span').text("");
  $('#idGerente1EnAlta span').text("");
  $('#idGerente2EnAlta span').text("");
  $('#rowTraerDatos').next().find('input, textarea, button, select').attr('disabled',true);
}

function habilitarForm(response, onTraerDatosClick){
  renderResponseOnTraerDatos(response);
  $('#rowTraerDatos').next().find('input, textarea, button, select').attr('disabled',false);
  onTraerDatosClick();
}

function renderResponseOnTraerDatos(response){
  $('#fullNameUsuarioEnAlta span').html("<strong>" + response.fullName + "</strong>");
  $('#idIBMEnAlta span').html("<strong>" + response.idIBM + "</strong>");
  $('#departamentoEnAlta span').html("<strong>" + response.departamento + "</strong>");
  $('#gerente1EnAlta span').html("<strong>" + response.fManager + "</strong>");
  $('#gerente2EnAlta span').html("<strong>" + response.sManager + "</strong>");
  $('#idGerente1EnAlta span').html("<strong>" + response.idFManager + "</strong>");
  $('#idGerente2EnAlta span').html("<strong>" + response.idSManager + "</strong>");
}



function abrirModalDeTicket(nroTicket){
  $("#i" + nroTicket).css("display", "inline-block");
  $.ajax({
    type: "GET",
    contentType: "application/json",
    url: "/servicios/" + nroTicket,
    success: function(response){
      if(response.result == "error"){
        bootbox.alert("Hubo un error con el ticket: " + response.value);
      }else{
        //load("modal-content-alta-interno.html"
        $("#container-fluid").load(controllers['ticketDescription'].pagina,function(){
          $(".my-page-header").append("<i class='fa fa-spinner fa-spin fa-lg fa-fw'></i>");
          $(".fa-spin").hide();
          loadTicketOnForm(response.value);
        });
      }
    },
    complete: function(){
      $("#i" + nroTicket).hide();
    },
    error: function(jqXHR, textStatus, errorThrown ){
      bootbox.alert(JSON.stringify(jqXHR) + ". " + JSON.stringify(textStatus) + JSON.stringify(errorThrown) );
    }
  });
}

function loadTicketOnForm(ticket){
  loadContentAltaInternoModal(ticket);
  requestTicketLogs(ticket.ticket);
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
          var fecha = new Date(log.datetime);
          fecha.toCorrectTimezone();
          $('#logsList').append('<li><strong>'+ fecha.toLocaleString() + "</strong>: " + log.descripcion+'</li>');
        });
      }
    },
    error: function(jqXHR, textStatus, errorThrown ){
      bootbox.alert(JSON.stringify(jqXHR) + ". " + JSON.stringify(textStatus) + JSON.stringify(errorThrown) );
    }
  });
}

function loadContentAltaInternoModal(info){

  var ticket = new Ticket(info);

  $('#selectPais option[id="' + ticket.pais +'"]').prop("selected",true);
  $("#textIdIBM").val(ticket.idIBM);
  $("#textFullName").val(ticket.fullName);
  $("#textTicket").val(ticket.ticket);
  $("#textEstado").val(State.betterString(ticket.estado));
  $("#textServicio").val(ticket.servicio);
  $("#textTipo").val(ticket.tipo);
  $("#textIdFManager").val(ticket.idFManager);
  $("#textFManager").val(ticket.fManager);
  $("#textIdSManager").val(ticket.idSManager);
  $("#textSManager").val(ticket.sManager);
  var fecha = new Date(ticket.fechaInicio);
  fecha.toCorrectTimezone();
  $("#textFechaInicio").val(fecha.toLocaleString());
  $("#textPiso").val(ticket.piso);
  $("#textDepartamento").val(ticket.departamento);
  $("#textInternoRef").val(ticket.intReferencia);
  $('#checkboxAparato').prop('checked', (ticket.aparato == "SI"? true: false));
  $('#checkboxVoiceMail').prop('checked', (ticket.voicemail == "SI"? true: false));
  $('#selectDiscado option[id="' + ticket.discado +'"]').prop("selected",true);

  ticketAttrOnModal($("#justificacion"), ticket.justificacion);
  ticketAttrOnModal($("#textInterno"),ticket.interno);
  ticketAttrOnModal($("#textmacAddress"), ticket.macAddress);
  ticketAttrOnModal($("#textMarca"), ticket.marca);
  ticketAttrOnModal($("#textModelo"), ticket.modelo);
  ticketAttrOnModal($("#textSerie"), ticket.serie);
  ticketAttrOnModal($("#textMotivoFManager"), ticket.motivoFManager);
  ticketAttrOnModal($("#textMotivoSManager"), ticket.motivoSManager);
  ticketAttrOnModal($("#textMotivoTelefoniaLocal"), ticket.motivoTelefoniaLocal);
  ticketAttrOnModal($("#textMotivoTelefoniaAdmin"), ticket.motivoTelefoniaAdmin);

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

function ticketAttrOnModal(domElement, value){
  if(value == null || value.length == 0 ){
    domElement.parent().parent().hide();
  }else{
    domElement.parent().parent().show();
    domElement.val(value);
  }
}

function checkPermittedActions(info){
  var actionNeededAsManager = Cookies.get("isManager") == "Y" && Cookies.get("idIBM") == info.idFManager && info.estado == "pendienteGerente";
  var actionNeededAsTelefoniaLocal = Cookies.get("isTelefoniaLocal") == "Y" && Cookies.get("pais") == info.pais && info.estado == "pendienteTelefoniaLocal";
  var actionNeededAsTelefoniaAdmin = Cookies.get("isTelefoniaAdmin") == "Y" && info.estado == "pendienteTelefoniaAdmin";

  $(".available-actions .btn-success").hide();
  $(".available-actions .btn-danger").hide();
  $('#description-ticket-altaInterno-row').find('input, textarea, button, select').attr('disabled',true);

  if(actionNeededAsManager || actionNeededAsTelefoniaAdmin || actionNeededAsTelefoniaLocal){
    $(".available-actions .btn-success").show();
    $(".available-actions .btn-danger").show();
    $('#description-ticket-altaInterno-row').find('input, textarea, button, select').attr('disabled',false);
  }
  if(actionNeededAsManager){
    $("#btnAprobarTicket").click(function(event){
      sendFManagerApproval();
      event.stopImmediatePropagation();
    });
    $("#btnRechazarTicket").click(function(event){
      $('#modalRechazarTicketConfirmacion').modal('toggle');
      event.stopImmediatePropagation();
    });
    $("#btnModalRechazar").click(function(event){
      sendFManagerDenial();
      event.stopImmediatePropagation();
    });
  }

  if(actionNeededAsTelefoniaLocal){
    $("#btnAprobarTicket").click(function(event){
      $('#modalAprobarTicketConfirmacion').modal('toggle');
      $(".form-group-local").show();
      $(".form-group-admin").hide();
      event.stopImmediatePropagation();
    });
    $("#btnModalAprobar").click(function(event){
      sendTelefoniaLocalApproval();
      event.stopImmediatePropagation();
    });
    $("#btnRechazarTicket").click(function(event){
      $('#modalRechazarTicketConfirmacion').modal('toggle');
      event.stopImmediatePropagation();
    });
    $("#btnModalRechazar").click(function(event){
      sendTelefoniaLocalDenial();
      event.stopImmediatePropagation();
    });
  }

  if(actionNeededAsTelefoniaAdmin){
    $("#btnAprobarTicket").click(function(event){
      $('#modalAprobarTicketConfirmacion').modal('toggle');
      $(".form-group-local").hide();
      $(".form-group-admin").show();
      event.stopImmediatePropagation();
    });
    $("#btnModalAprobar").click(function(event){
      sendTelefoniaAdminApproval();
      event.stopImmediatePropagation();
    });
    $("#btnRechazarTicket").click(function(event){
      $('#modalRechazarTicketConfirmacion').modal('toggle');
      event.stopImmediatePropagation();
    });
    $("#btnModalRechazar").click(function(event){
      sendTelefoniaAdminDenial();
      event.stopImmediatePropagation();
    });
  }

}
