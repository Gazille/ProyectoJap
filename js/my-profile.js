// Funcion de boostrap para que el form pueda chequear la validacion
(() => {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
//Objeto en el cual voy a guardar todos los datos del usuario para luego guardarlos en localStorage
let objetoPerfil = {
  primerNombre: "",
  segundoNombre: "",
  primerApellido: "",
  segundoApellido: "",
  telefono: "",
  imagen: "",
};

//Funcion la cual agrega el valor a los campos cuando la pagina se carga

const agregarDatos = () => {
  if (!localStorage.objetoPerfil) {
    //Si no existe un perfil de usuario ya definido ejecuta este bloque
    document.getElementById("emailPerfil").value = localStorage.Email;
  } else {
    //Si existe el objeto en localstorage con los datos ingresados ejecuta este bloque
    const objetoParseado = JSON.parse(localStorage.objetoPerfil);
    document.getElementById("emailPerfil").value = localStorage.Email;
    document.getElementById("primerNombre").value = objetoParseado.primerNombre;
    document.getElementById("segundoNombre").value =
      objetoParseado.segundoNombre;
    document.getElementById("primerApellido").value =
      objetoParseado.primerApellido;
    document.getElementById("segundoApellido").value =
      objetoParseado.segundoApellido;
    document.getElementById("telefono").value = objetoParseado.telefono;
    document.getElementById(
      "imagenDePerfil"
    ).innerHTML = `<img src="${objetoParseado.imagen}" class="border border-dark border-2 rounded-2 position-relative top-50 start-50 mt-3 w-25"> </img>`;
  }
};

//Evento el cual obtiene los valores de los input y rellena el objeto

const eventoEnviar = () => {
  objetoPerfil.primerNombre = document.getElementById("primerNombre").value;
  objetoPerfil.segundoNombre = document.getElementById("segundoNombre").value;
  objetoPerfil.primerApellido = document.getElementById("primerApellido").value;
  objetoPerfil.segundoApellido =
    document.getElementById("segundoApellido").value;
  objetoPerfil.telefono = document.getElementById("telefono").value;
  //Agregar imagen que el usuario seleccione como foto de perfil
  const imagen = document.getElementById("formFile").files[0];
  //Crea una string la cual tiene el url del objeto que me devuelve la imagen que decido subir
  const urlimagen = window.URL.createObjectURL(imagen);

  document.getElementById(
    "imagenDePerfil"
  ).innerHTML = `<img src="${urlimagen}" class="border border-dark border-2 rounded-2 position-relative top-50 start-50 mt-3 w-25" ></img>`;
  objetoPerfil.imagen = urlimagen;

  localStorage.setItem("objetoPerfil", JSON.stringify(objetoPerfil));
};

document.addEventListener("DOMContentLoaded", function () {
  agregarDatos();
});
