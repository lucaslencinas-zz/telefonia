
function Ticket(servicio) {
  this.ticket = servicio.ticket;
  this.fullName = servicio.fullName;
  this.idIBM = servicio.idIBM;
  this.fechaInicio = servicio.fechaInicio;
  this.estado = servicio.estado;
  this.servicio = "Alta Interno";
  this.tipo = "Alta";
}

Ticket.prototype.diHola = function() {
  alert ("Hola, Soy " + this.primerNombre);
};

Ticket.prototype.toRowString = function(){
  var stringRow = "<tr>";
  stringRow += "<tr>";
  stringRow += "<th scope='row'><a onclick='abrirModalDeTicket(" + this.ticket + ");'>" + this.ticket + "</a></th>";
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
  return time.toLocaleTimeString();
}

Ticket.prototype.localDateTime = function(){
  var dateTime = new Date(this.fechaInicio);
  return dateTime.toLocaleString();
}

Ticket.prototype.localDate = function(){
  var date = new Date(this.fechaInicio);
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
