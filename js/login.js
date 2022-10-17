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
// Desencriptar Json Web Token
function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
//Login con google
function handleCredentialResponse({ credential }) {
  const Payload = parseJwt(credential);
  localStorage.setItem("Email", Payload.email);
  location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("enviar").addEventListener("click", function () {
    login();
  });
});
