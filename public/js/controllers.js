/*
DEPENDENCIES
login.js
*/

/*-------------- Controllers for the different kinds of actions -------------*/

function Controller(pagina, onSubmitClick, onTraerDatosClick){
  this.pagina = pagina,
  this.setOnSubmitClick = onSubmitClick,
  this.onTraerDatosClick = onTraerDatosClick
}

var altaInternoController = new Controller("alta-interno-div.html", setAltaInternoBehaviour, checkBuildings);
var altaLineaAnalogicaController = new Controller("alta-linea-analogica-div.html", undefined, checkBuildings);
var altaCallForwardingsController = new Controller("alta-call-forwarding-div.html", undefined, checkBuildings);
var altaHuntGroupController = new Controller("alta-hunt-group-div.html", undefined, checkBuildings);
var altaPickupGroupController = new Controller("alta-pickup-group-div.html", undefined, checkBuildings);
var altaCodigoFACController  = new Controller("alta-codigo-fac-div.html", undefined, checkBuildings);
var altaCodigoCMCController  = new Controller("alta-codigo-cmc-div.html", undefined, checkBuildings);
var delegarController  = new Controller("delegar-div.html", undefined, undefined);
var serviciosController  = new Controller("servicios-div.html", undefined, undefined);
var serviciosAprobadosController  = new Controller("servicios-aprobados-div.html", undefined, undefined);
var serviciosRechazadosController  = new Controller("servicios-rechazados-div.html", undefined, undefined);
var serviciosPendientesController  = new Controller("servicios-pendientes-div.html", undefined, undefined);
var solicitarVoiceMailController  = new Controller("solicitar-voice-mail-div.html", undefined, undefined);
var solicitarAparatoController  = new Controller("solicitar-aparato-div.html", undefined, undefined);
var cambioDiscadoController  = new Controller("cambio-de-discado-div.html", undefined, undefined);
var resetPasswordController  = new Controller("reset-password-div.html", undefined, undefined);
var reasignarController  = new Controller("re-asignar-div.html", undefined, undefined);
var darDeBajaController  = new Controller("dar-de-baja-div.html", undefined, undefined);
var revalidarController  = new Controller("revalidar-div.html", undefined, undefined);

var ticketDescriptionController = new Controller("ticket-description-alta-interno.html", undefined, undefined);
