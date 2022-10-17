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
              <p class="p-1"><strong>Cantidad: </strong><input value="1" onChange="multiplicar(value, ${datosArt.unitCost},${datosArt.id},${idCantidadProductos})" class="w-25 position-absolute start-25 end-50 "
                  type="number" min="1"></p>
            </div>
          </div>
          <div class="col">
            <h4 id="subtotal">Subtotal <span id="${idCantidadProductos}">(1 Producto)</span></h4>
            <h5><strong>${datosArt.currency} <span id="${datosArt.id}">${datosArt.unitCost}</span></strong></h5>
            <p><input type="checkbox"> Este pedido es un regalo</p>
            <button type="button" class="btn  btn-success">Proceder Al Pago</button>
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
});
