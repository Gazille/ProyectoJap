// Añadir el mensaje de Error
const addError = (id) => {
  document.getElementById(id).classList.add("is-invalid");
};
// Remover el mensaje de Error
const removeError = () => {
  document.getElementById("passwordUser").classList.remove("is-invalid");
  document.getElementById("emailUser").classList.remove("is-invalid");
};
//Almacenamiento de datos del usuario en el storage correspondiente
const almacenarStorage = (tipoDeStorage) => {
  const emailUsuario = document.getElementById("emailUser").value;
  const passwordUsuario = document.getElementById("passwordUser").value;

  if (emailUsuario === "") {
    addError("emailUser");
    setTimeout(() => {
      removeError();
    }, 5000);
  } else {
    if (passwordUsuario === "") {
      addError("passwordUser");
      setTimeout(() => {
        removeError();
      }, 5000);
    } else {
      tipoDeStorage.setItem("Email", emailUsuario);
      tipoDeStorage.setItem("Password", passwordUsuario);
      location.href = "index.html";
    }
  }
};

const login = () => {
  const recordarUsuario = document.getElementById("recordarUsuario").checked;
  if (recordarUsuario === true) {
    //Validacion de login sin recordar usuario
    almacenarStorage(localStorage);
    //Validacion de login con recordar usuario activado
  } else {
    almacenarStorage(sessionStorage);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("enviar").addEventListener("click", function () {
    login();
  });
});
