

function isLoggedIn(){
  return Cookies.get('idIBM') != undefined;
}

function refreshLogin(){
  Cookies.set('fullName', Cookies.get('fullName'));
  Cookies.set('idIBM', Cookies.get('idIBM'));
  Cookies.set('isManager', Cookies.get('isManager'));
}

function logOut(){
  Cookies.remove('fullName');
  Cookies.remove('idIBM');
  Cookies.remove('isManager');
}

function logIn(response){
  Cookies.set('fullName', response.value.fullName);
  Cookies.set('idIBM', response.value.idIBM);
  Cookies.set('isManager', response.value.isManager);
}
