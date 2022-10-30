//Comprobar Login

const comprobarLogeo = () => {
  if (localStorage.Email === undefined && sessionStorage.Email === undefined) {
    location.href = "login.html";
  } else {
    const usuario = localStorage.Email;
    document.getElementById("usuario").innerHTML = usuario;
  }
  document.getElementById("salir").addEventListener("click", function () {
    localStorage.removeItem("Email");
    location.href = "login.html";
  });
};

// Funcionalidades del Login

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

//Deshabilitar 1)Tarjeta de Credito o 2)Cuenta Bancaria

const creadorGetElement = (id) => {
  document.getElementById(id).setAttribute("disabled", "");
};

//Remover clase disabled

const removerDisabled = (id) => {
  document.getElementById(id).removeAttribute("disabled", "");
};

const comprobarSeleccion = () => {
  if (document.getElementById("tarjetaDeCreditoId").checked) {
    console.log("xD");
    creadorGetElement("numeroDeCuentaBancaria");
    removerDisabled("numeroTarjeta");
    removerDisabled("codigoSeguridad");
    removerDisabled("vencimiento");
  } else if (document.getElementById("transferenciaBancariaID").checked) {
    creadorGetElement("numeroTarjeta");
    creadorGetElement("codigoSeguridad");
    creadorGetElement("vencimiento");
    removerDisabled("numeroDeCuentaBancaria");
  }
};
//1)
document
  .getElementById("tarjetaDeCreditoId")
  .addEventListener("click", function () {
    comprobarSeleccion();
    document
      .getElementById("transferenciaBancariaID")
      .classList.add("desactivarVerde");
  });
//2)
document
  .getElementById("transferenciaBancariaID")
  .addEventListener("click", function () {
    comprobarSeleccion();
  });

//Evento de boton guardar

document.getElementById("guardarId").addEventListener("click", function () {
  document.getElementById("spanModalAlerta").innerHTML = "";
});

//Alerta de compra finalizada

const alertSuccessPass = () => {
  document.getElementById(
    "alertaSuccess"
  ).innerHTML = `<div class="alert alert-success" role="alert">
  ¡A Comprado con Exito!
  </div>`;
};

const alerta = () => {
  const formTrue = document.querySelectorAll(".needs-validation");
  Array.from(formTrue).forEach((form) => {
    if (form.checkValidity()) {
      alertSuccessPass();
      setTimeout(() => {
        document.getElementById("alertaSuccess").innerHTML = ``;
      }, 3000);
    }
  });
};

//Calcular subtotal segun la cantidad de productos que compremos
const multiplicar = (cantidad, precio, idSubtotal, idCantProducto) => {
  let subtotal = cantidad * precio;

  document.getElementById(idSubtotal).innerHTML = subtotal;
  if (cantidad > 1) {
    document.getElementById(
      idCantProducto
    ).innerHTML = `(${cantidad} productos)`;
  } else {
    document.getElementById(
      idCantProducto
    ).innerHTML = `(${cantidad} producto)`;
  }
  obtenerSubtotalGeneral();
};

//Almacena el valor del Subtotal General
let subtotalGeneral = 0;
let costoEnvio = 0;
//Calcular el Subtotal General
const obtenerSubtotalGeneral = () => {
  const arrayPrecio = document.querySelectorAll(".precio");
  let total = 0;
  arrayPrecio.forEach((element) => {
    total += parseInt(element.innerHTML);
  });
  document.getElementById("valorGeneral").innerHTML = "USD" + " " + total;
  subtotalGeneral = total;
};

//Calcular el Costo de Envio

const obtenerCostoEnvio = () => {
  const envioPremium = document.getElementById("premium").checked;
  const envioExpress = document.getElementById("express").checked;
  const envioStandard = document.getElementById("standard").checked;
  const getElementEnvio = document.getElementById("costoEnvio");

  if (envioPremium) {
    costoEnvio = Math.round((15 / 100) * subtotalGeneral);
    getElementEnvio.innerHTML = "USD" + " " + costoEnvio;
  } else if (envioExpress) {
    costoEnvio = Math.round((7 / 100) * subtotalGeneral);
    getElementEnvio.innerHTML = "USD" + " " + costoEnvio;
  } else if (envioStandard) {
    costoEnvio = Math.round((5 / 100) * subtotalGeneral);
    getElementEnvio.innerHTML = "USD" + " " + costoEnvio;
  }
};

//Calcular el Precio Final entre el subtotal General y el Costo de Envio

const obtenerTotalFinal = () => {
  obtenerSubtotalGeneral();
  obtenerCostoEnvio();
  document.getElementById("valorTotal").innerHTML =
    "USD" + " " + (subtotalGeneral + costoEnvio);
};

const callApiCart = async () => {
  const url = CART_INFO_URL + 25801 + EXT_TYPE;
  const respuesta = await fetch(url);
  const resultado = await respuesta.json();

  const agregarAlCarrito = (obj) => {
    obj.forEach((datosArt) => {
      let idCantidadProductos = datosArt.id + datosArt.id;
      document.getElementById("contenedorProductoCarro").innerHTML += `<div>
      <hr>
      <div class="container">
        <div class="row">
          <div class="col text-center">
          <img class="w-75" src="${datosArt.image}" alt="Imagen Producto">
          </div>
          <div class="col">
            <h4>${datosArt.name}</h4>
            <p class="p-1 "><strong>Precio: ${datosArt.currency} ${datosArt.unitCost}</strong></p>
            <div class="position-relative">
              <p class="p-1"><strong>Cantidad: </strong><input value="1" onChange="multiplicar(value, ${datosArt.unitCost},${datosArt.id},${idCantidadProductos},), obtenerTotalFinal()" class="w-25 position-absolute start-25 end-50 "
                  type="number" min="1"></p>
            </div>
          </div>
          <div class="col">
            <h4 id="subtotal">Subtotal <span id="${idCantidadProductos}">(1 Producto)</span></h4>
            <h5><strong>${datosArt.currency} <span class="precio" id="${datosArt.id}">${datosArt.unitCost}</span></strong></h5>
            <p><input type="checkbox"> Este pedido es un regalo</p>
            <button type="button" class="btn  btn-success">Proceder Al Pago</button>

            <button class="btn btn-danger" onClick="" type="button"><i class="fas fa-trash-alt"></i></button>
          </div>
        </div>
      </div>
    </div>`;
    });
  };
  agregarAlCarrito(resultado.articles);
  //Añadir productos que el usuario eligió
  agregarAlCarrito(JSON.parse(localStorage.arrayCarrito));
};

document.addEventListener("DOMContentLoaded", function () {
  callApiCart();
  comprobarLogeo();
  setTimeout(() => {
    obtenerSubtotalGeneral();
    obtenerCostoEnvio();
    obtenerTotalFinal();
  }, 100);
});
