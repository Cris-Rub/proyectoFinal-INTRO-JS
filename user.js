var userSelected={
    email:'',
    password:'',
    username:'',
    saldo:''
};

const saldo=document.querySelector('#saldo'); //Saldo actual
const cajeroData=document.querySelector('#cajeroData'); //Usuario actual
const logOutBtn=document.querySelector('#logOut')

//Variables movimientos
const inputIngresar=document.querySelector('#inputIngresar');
const inputRetirar=document.querySelector('#inputRetirar');
const ingresarForm=document.querySelector('#form-ingresarMonto');
const retirarForm=document.querySelector('#form-retirarMonto');

//Alerts
const alertPlaceholder = document.getElementById('liveAlertPlaceholderUsers')
const alertUser = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div> <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg> ${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

const alertUserSuccess = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div> <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg> ${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
  
    alertPlaceholder.append(wrapper)
  }


mostrarData();

function add(){
    localStorage.setItem('user', JSON.stringify(userSelected));
}
function getData(){
    userSelected=JSON.parse(localStorage.getItem('user'));
}
function logOut(){
    localStorage.clear();

}

//Funcion cerrar sesión
logOutBtn.addEventListener('click', ()=>{
    logOut();
    location.href="../index.html";
})

//Funcion mostrar informacion del usuario en pantalla
function mostrarData(){
    getData();
    saldo.textContent='$' + userSelected.saldo;
    cajeroData.textContent='Hola, ' + userSelected.username;
    inputIngresar.value='';
    inputRetirar.value='';
}

//Funcion ingresar monto
ingresarForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    let ingresar=inputIngresar.value;
    let result=0;
    result=parseInt(ingresar)+parseInt(userSelected.saldo);
    if(isNaN(parseInt(ingresar))){
        alertUser('Error: solo ingrese valores numericos.', 'danger');
        mostrarData();
    }
    else if(parseInt(ingresar)<0){
        alertUser('Error: solo ingrese valores enteros positivos.', 'danger');
        mostrarData();
    }
    else if(result>990){
        alertUser('Error: No tienes permitido tener un saldo mayor a $990.', 'danger');
        mostrarData();
    }
    else{
        userSelected.saldo=result;
        alertUserSuccess('Monto ingresado exitosamente.', 'success');
        add();
        mostrarData();
    }
});

//Funcion retirar monto
retirarForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    let retirar=inputRetirar.value;
    let result=0;
    result=parseInt(userSelected.saldo)-parseInt(retirar);
    if(isNaN(parseInt(retirar))){
        alertUser('Error: solo ingrese valores numericos.', 'danger');
        mostrarData();
    }
    else if(parseInt(retirar)<0){
        alertUser('Error: solo ingrese valores enteros positivos.', 'danger');
        mostrarData();
    }
    else if(result<10){
        alertUser('Error: No tienes permitido tener un saldo menor a $10.', 'danger');
        mostrarData();
    }
    else{
        userSelected.saldo=result;
        alertUserSuccess('Monto retirado exitosamente.', 'success');
        add();
        mostrarData();
    }
});



