//Guardo la id del producto que selecciono y redirijo hacia product-info
const setProductId = (id) => {
  localStorage.setItem("productID", id);
  location.href = "product-info.html";
};

//Mostrar los productos de la api
const forEachArray = (array) => {
  array.forEach(
    (element) =>
      (document.getElementById(
        "containerAutos"
      ).innerHTML += ` <div class="container" onClick="setProductId(${element.id})">
  <div class="list-group-item list-group-item-action cursor-active">
    <div class="row">
      <div class="col-3">
        <img  src="${element.image}" alt="imgWay" class="img-thumbnail">
      </div>
      <div class="col">
        <div class="d-flex w-100 justify-content-between">
          <h4 class="mb-1">${element.name} - ${element.currency} ${element.cost}</h4>
          <p class="text-end"> <span>${element.soldCount}</span> Vendidos</p>
        </div>
        <p class="mb-1">${element.description}</p>
      </div>
    </div>
  </div>
</div> `)
  );
};
//Esta funcion me vacia el containerAutos
const eliminarProductos = () => {
  document.getElementById("containerAutos").innerHTML = ``;
};

const callApi = async () => {
  const url =
    "https://japceibal.github.io/emercado-api/cats_products/" +
    localStorage.catID +
    ".json";
  const respuesta = await fetch(url);
  const resultado = await respuesta.json();
  const arrayProducts = resultado.products;

  forEachArray(arrayProducts);

  document.getElementById("catName").innerHTML = resultado.catName;
  //Filtro de productos de Mayor a Menor
  document.getElementById("filtroMayor").addEventListener("click", function () {
    arrayProducts.sort((a, b) => {
      if (a.cost > b.cost) {
        return b.cost - a.cost;
      }
    });
    eliminarProductos();
    forEachArray(arrayProducts);
  });

  //Filtro de productos de Menor a Mayor
  document.getElementById("filtroMenor").addEventListener("click", function () {
    arrayProducts.sort((a, b) => {
      if (b.cost > a.cost) {
        return a.cost - b.cost;
      }
    });
    eliminarProductos();
    forEachArray(arrayProducts);
  });

  //Filtro segun Relevancia
  document.getElementById("rel").addEventListener("click", function () {
    arrayProducts.sort((a, b) => {
      if (a.soldCount > b.soldCount) {
        return b.soldCount - a.soldCount;
      }
    });
    eliminarProductos();
    forEachArray(arrayProducts);
  });

  //Filtrar segun su precio
  document.getElementById("rangoEnviar").addEventListener("click", function () {
    const precioMinimo = document.getElementById("precioMinimo").value;
    const precioMaximo = document.getElementById("precioMaximo").value;
    let nuevoArray = [];
    const newArrayProducts = (precioMenor, precioMayor) => {
      nuevoArray = arrayProducts.filter((precio) => {
        return precio.cost >= precioMenor && precio.cost <= precioMayor;
      });
    };

    newArrayProducts(precioMinimo, precioMaximo);
    eliminarProductos();
    forEachArray(nuevoArray);
  });

  // Buscador en tiempo real
  document.getElementById("buscar").addEventListener("keyup", function () {
    const productoBuscar = document.getElementById("buscar").value;
    const productoLowerCase = productoBuscar.toLowerCase();

    arrayProducts.forEach((element) => {
      const nombre = element.name.toLowerCase();
      if (nombre.indexOf(productoLowerCase) !== -1) {
        eliminarProductos();
        document.getElementById(
          "containerAutos"
        ).innerHTML += ` <div class="container">
    <div class="list-group-item list-group-item-action cursor-active">
      <div class="row">
        <div class="col-3">
          <img  src="${element.image}" alt="imgWay" class="img-thumbnail">
        </div>
        <div class="col">
          <div class="d-flex w-100 justify-content-between">
            <h4 class="mb-1">${element.name} - ${element.currency} ${element.cost}</h4>
            <p class="text-end"> <span>${element.soldCount}</span> Vendidos</p>
          </div>
          <p class="mb-1">${element.description}</p>
        </div>
      </div>
    </div>
  </div> `;
      }
    });
    if (!productoBuscar) {
      eliminarProductos();
      forEachArray(arrayProducts);
    }
  });
};

document.addEventListener("DOMContentLoaded", function () {
  callApi();
  //Limpiar
  document
    .getElementById("clearRangeFilter")
    .addEventListener("click", function () {
      eliminarProductos();
      callApi();
    });
});
