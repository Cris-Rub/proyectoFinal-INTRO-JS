var userSelected={
    email:'',
    password:'',
    username:'',
    saldo:''
};

const saldo=document.querySelector('#saldo'); //Saldo actual
// const ingresarMonto=document.querySelector('#ingresarMonto');
// const retirarMonto=document.querySelector('#retirarMonto');
// const cajeroData=document.querySelector('#cajeroData')


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
    `   <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>`,
    `   <div>${message}</div>`,
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
function clear(){
    localStorage.clear();
}


//Funcion mostrar informacion del usuario en pantalla
function mostrarData(){
    getData();
    saldo.textContent=userSelected.saldo;
    // console.log(userSelected);
}

//Funcion ingresar monto
ingresarForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    let ingresar=inputIngresar.value;
    let result=0;
    result=parseInt(ingresar)+parseInt(userSelected.saldo);
    if(isNaN(parseInt(ingresar))){
        alertUser('Error: solo ingrese valores numericos', 'danger');
    }
    else if(result>990){
        alertUser('Error: No tienes permitido tener un saldo mayor a $990', 'danger');
    }
    else{
        userSelected.saldo=result;
        add();
        mostrarData();
    }
})



