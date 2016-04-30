
var mapPagesLinks = [];

/*
solicitudesAprobadas-a
solicitudesRechazadas-a
solicitudesEsperando-a
altaInterno-a
altaLineaAnalogica-a
altaCallForwardings-a
altaHuntGroup-a
altaPickupGroup-a
altaCodigoFAC-a
altaCodigoCMC-a
delegar-a
serviciosAprobados-a
serviciosRechazados-a
serviciosEsperando-a
solicitar-voice-mail-a
solicitar-aparato-a
cambio-de-discado-a
reset-password-a
re-asignar-a
dar-de-baja-a
revalidar-a

*/



mapPagesLinks['altaInterno-a'] = {pagina: "alta-interno-div.html", titulo: "Alta Interno/extension"}
mapPagesLinks['altaLineaAnalogica-a'] = {pagina: "alta-linea-analogica-div.html", titulo: "Alta Linea analogica"}

mapPagesLinks['altaCallForwardings-a'] = {pagina: "alta-call-forwarding-div.html", titulo: "Alta Call Forwarding"}
/*
edificio --> select
modulo --> texxtbox
interno de referencia --> texxtbox
numero origen --> texxtbox
numero destino --> texxtbox
justificacion --> textarea
*/
mapPagesLinks['altaHuntGroup-a'] = {pagina: "alta-hunt-group-div.html", titulo: "Alta Hunt Group"}
/*
edificio --> select
modulo --> texxtbox
interno de referencia --> texxtbox
Internos para Hunt Group (separados por coma, sinespacio y finalice con un punto, Internos de 8 digitos) ---> Textarea
justificacion --> textarea
MEJORAR EL INTERNOS PARA HUNT GROUP -- ver como esta en la base
*/

mapPagesLinks['altaPickupGroup-a'] = {pagina: "alta-pickup-group-div.html", titulo: "Alta Pickup Group"}
/*
edificio --> select
modulo --> texxtbox
interno de referencia --> texxtbox
Internos para Pickup Group (separados por coma, sinespacio y finalice con un punto, Internos de 8 digitos) ---> Textarea
justificacion --> textarea
MEJORAR EL INTERNOS PARA PICKUP GROUP -- ver como esta en la base
*/

mapPagesLinks['altaCodigoFAC-a'] = {pagina: "alta-codigo-fac-div.html", titulo: "Alta Codigo FAC"}
mapPagesLinks['altaCodigoCMC-a'] = {pagina: "alta-codigo-cmc-div.html", titulo: "Alta Codigo CMC"}
mapPagesLinks['delegar-a'] = {pagina: "delegar-div.html", titulo: "Delegar"}
/*
Falta alta codigo FAC
Falta alta codigo CMC
Falta Delegar
*/

mapPagesLinks['servicios-a'] = {pagina: "servicios-div.html", titulo: "Servicios"}
mapPagesLinks['servicios-aprobados-a'] = {pagina: "servicios-aprobados-div.html", titulo: "Servicios Aprobadas"}
mapPagesLinks['servicios-rechazados-a'] = {pagina: "servicios-rechazados-div.html", titulo: "Servicios Rechazadas"}
mapPagesLinks['servicios-pendientes-a'] = {pagina: "servicios-pendientes-div.html", titulo: "Servicios Pendientes"}


mapPagesLinks['solicitar-voice-mail-a'] = {pagina: "solicitar-voice-mail-div.html", titulo: "Solicitar VoiceMail"}

mapPagesLinks['solicitar-aparato-a'] = {pagina: "solicitar-aparato-div.html", titulo: "Solicitar Aparato"}

mapPagesLinks['cambio-de-discado-a'] = {pagina: "cambio-de-discado-div.html", titulo: "Cambio de Discado"}

mapPagesLinks['reset-password-a'] = {pagina: "reset-password-div.html", titulo: "Reset Password"}

mapPagesLinks['re-asignar-a'] = {pagina: "re-asignar-div.html", titulo: "Re-asignar"}

mapPagesLinks['dar-de-baja-a'] = {pagina: "dar-de-baja-div.html", titulo: "Dar de Baja"}

mapPagesLinks['revalidar-a'] = {pagina: "revalidar-div.html", titulo: "Revalidar"}

function abrirModalDeTicket(nroTicket){
  alert("Abrir el modal del ticket: " + nroTicket);
};
