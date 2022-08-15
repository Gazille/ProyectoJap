// Añadir el mensaje de Error
const addError = (id) => {
  document.getElementById(id).classList.add("is-invalid");
};
// Remover el mensaje de Error
const removeError = () => {
  document.getElementById("passwordUser").classList.remove("is-invalid");
  document.getElementById("emailUser").classList.remove("is-invalid");
};

const login = () => {
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
      localStorage.setItem("Email", emailUsuario);
      localStorage.setItem("Password", passwordUsuario);
      location.href = "index.html";
    }
  }
};

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("enviar").addEventListener("click", function () {
    login();
  });
});
