
function Ticket(servicio) {
  this.ticket = servicio.ticket;
  this.fullName = servicio.fullName;
  this.idIBM = servicio.idIBM;
  this.fechaInicio = servicio.fechaInicio;
  this.estado = servicio.estado;
  this.servicio = servicio.servicio;
  this.tipo = servicio.tipo;
  this.pais = servicio.pais;
  this.idFManager = servicio.idFManager;
  this.fManager = servicio.fManager;
  this.idSManager = servicio.idSManager;
  this.sManager = servicio.sManager;
  this.piso = servicio.piso;
  this.departamento = servicio.departamento;
  this.intReferencia = servicio.intReferencia;
  this.aparato = servicio.aparato;
  this.voicemail = servicio.voicemail;
  this.discado = servicio.discado;
  this.justificacion = servicio.justificacion;
  this.nivelAprobacion = servicio.nivelAprobacion;
  this.fechaFManager = servicio.fechaFManager;
  this.fechaSManager = servicio.fechaSManager;
  this.fechaTelefoniaLocal = servicio.fechaTelefoniaLocal;
  this.fechaTelefoniaAdmin = servicio.fechaTelefoniaAdmin;
  this.fechaCerrado = servicio.fechaCerrado;
  this.edificio = servicio.edificio;
  this.interno = servicio.interno;
  this.macAddress = servicio.macAddress;
  this.marca = servicio.marca;
  this.modelo = servicio.modelo;
  this.serie = servicio.serie;
  this.motivoFManager = servicio.motivoFManager;
  this.motivoSManager = servicio.motivoSManager;
  this.motivoTelefoniaLocal = servicio.motivoTelefoniaLocal;
  this.motivoTelefoniaAdmin = servicio.motivoTelefoniaAdmin;
}





Ticket.prototype.toRowString = function(){
  var stringRow = "<tr>";
  stringRow += "<tr>";
  stringRow += "<th scope='row'><a onclick='abrirModalDeTicket(" + this.ticket + ");'>" + this.ticket + "</a> <i id='i" + this.ticket + "' class='fa fa-spinner fa-spin fa-lg fa-fw'></i></th>";
  stringRow += "<td>" + this.fullName + "</td>";
  stringRow += "<td>" + this.idIBM + "</td>";
  stringRow += "<td>" + this.localDate() + "</td>";
  stringRow += "<td>" + this.servicio + "</td>";
  stringRow += "<td>" + this.tipo + "</td>";
  stringRow += "<td>" + State.betterString(this.estado) + "</td>";
  stringRow += "</tr>";
  return stringRow;

}

Ticket.prototype.localTime = function(){
  var time = new Date(this.fechaInicio);
  time.toCorrectTimezone();
  return time.toLocaleTimeString();
}

Ticket.prototype.localDateTime = function(){
  var dateTime = new Date(this.fechaInicio);
  dateTime.toCorrectTimezone();
  return dateTime.toLocaleString();
}

Ticket.prototype.localDate = function(){
  var date = new Date(this.fechaInicio);
  date.toCorrectTimezone();
  return date.toLocaleDateString();
}

/*----------States----------*/
var State = {
betterString: function(state){
    var states = {
      rechazado: "Rechazado",
      pendienteGerente: "Pendiente Gerente",
      pendienteTelefoniaLocal: "Pendiente de Telefonia Local",
      pendienteTelefoniaAdmin: "Pendiente de Telefonia Admin",
      aprobado: "Aprobado"
    };
    return states[state];
  }
}
