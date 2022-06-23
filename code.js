//variables login
const userName=document.querySelector('#userName');
const ingresar=document.querySelector('#login');
const formUser=document.querySelector('#form-user');
const inputEmail=document.querySelector('#inputEmail');
const inputPassword=document.querySelector('#inputPassword');
const datosForm={
    email:'',
    password:''
};

//variables user
const user1=document.querySelector('#user1');
const user2=document.querySelector('#user2');
const user3=document.querySelector('#user3');
const userSelected={
    email:'',
    password:'',
    username:'',
    saldo:''
};

//Variable mensaje de error
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const alert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div> <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg> ${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

user1.addEventListener('click', () =>{
    dataUserSelected(1);
});
user2.addEventListener('click', () =>{
    dataUserSelected(2);
})
user3.addEventListener('click', () =>{
    dataUserSelected(3);
})

//Datos del usuario seleccionado
function dataUserSelected(n){
    users.forEach(cuenta => {
        const {name, password, email, value, saldo} = cuenta;
        if(value==n){
            userSelected.email=email.toLowerCase();
            userSelected.password=password;
            userSelected.username=name;
            userSelected.saldo=saldo;
        }
    })
    userName.textContent=userSelected.username;
    console.log(userSelected);
}

//Validación de login
formUser.addEventListener('submit', (e) =>{
    e.preventDefault();
    datosForm.email=inputEmail.value.toLowerCase();
    datosForm.password=inputPassword.value;

    console.log(datosForm);

    if(datosForm.email==userSelected.email && datosForm.password==userSelected.password){
        add();
        location.href="./pages/user.html";
    }
    else if(datosForm.email=='' && datosForm.password==''){
        alert('Ambos campos son obligatorios.', 'danger');
    }
    else if(datosForm.email==''){
        alert('Email es un campo requerido.', 'warning');
    }
    else if(datosForm.password==''){
        alert('Contraseña es un campo requerido.', 'warning');
    }
    else{
        alert('Email y/o contraseña incorrectos.', 'danger');
    }
})

//Funciones local storage
function add(){
    localStorage.setItem('user', JSON.stringify(userSelected));
}
// function getData(){
//     userSelected=JSON.parse(localStorage.getItem('user'));
// }
// function clear(){
//     localStorage.clear();
// }

// /////////////// Apartir de ahora se trabaja con LocalStorage solamente//////////////////

// //Funcion mostrar informacion del usuario en pantalla
// function mostrarData(){
//     getData();
//     saldo.textContent=userSelected.saldo;
//     console.log(userSelected);
// }

