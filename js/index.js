const comprobarLogeo = () => {
  if (localStorage.Email === undefined && sessionStorage.Email === undefined) {
    location.href = "login.html";
  } else {
    const usuario = localStorage.Email;
    document.getElementById("usuario").innerHTML = usuario;
  }
};

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("autos").addEventListener("click", function () {
    localStorage.setItem("catID", 101);
    window.location = "products.html";
  });
  document.getElementById("juguetes").addEventListener("click", function () {
    localStorage.setItem("catID", 102);
    window.location = "products.html";
  });
  document.getElementById("muebles").addEventListener("click", function () {
    localStorage.setItem("catID", 103);
    window.location = "products.html";
  });

  comprobarLogeo();
});
