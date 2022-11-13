// Cambiar Producto si clickeamos en relacionados

const clickProductRel = (id) => {
  localStorage.setItem("productID", id);
  location.href = "product-info.html";
};

//alerta sobre el exito de agregar el producto al carrito

const alertaCompra = () => {
  document.getElementById(
    "alertaSuccess"
  ).innerHTML = `<div class="alert alert-success" role="alert">
      ¡Se añadio el producto al carrito!
    </div>`;
};

//Remover alerta de la funcion de la linea 10

const removerAlertaCompra = () => {
  document.getElementById("alertaSuccess").innerHTML = ``;
};

//Llamado a la api producto
const callApi = async () => {
  const url =
    "https://japceibal.github.io/emercado-api/products/" +
    localStorage.productID +
    ".json";
  const respuesta = await fetch(url);
  const resultado = await respuesta.json();
  const arrayImagenes = resultado.images;

  document.getElementById("nombProducto").innerHTML += resultado.name;

  //Agregar imagenes al carousel
  const agregarImagenes = (array) => {
    let count = 0;
    let carouselHeader = `<div id="carouselExampleIndicators" class="carousel carousel-dark w-50 mx-auto slide" data-bs-ride="carousel">`;

    let carouselIndicator = `<div class="carousel-indicators">`;

    let carouselBody = `<div class="carousel-inner">`;

    let carouselControl = `<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" "></span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" "></span>
  </button>
  </div>`;

    array.forEach((element) => {
      if (count === 0) {
        carouselBody += `<div class="carousel-item active">
        <img src="${element}" class="d-block  w-100" >
      </div>`;

        carouselIndicator += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${count}" class="active"></button>`;
      } else {
        carouselBody += `<div class="carousel-item">
        <img src="${element}" class="d-block w-100" >
      </div>`;
        carouselIndicator += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${count}" ></button>`;
      }
      count += 1;
    });

    carouselBody += `</div>`;

    carouselIndicator += `</div>`;

    document.getElementById("product-container").innerHTML +=
      carouselHeader + carouselIndicator + carouselBody + carouselControl;
  };
  agregarImagenes(arrayImagenes);

  // Agregando datos del producto
  document.getElementById("precio").innerHTML +=
    resultado.currency + resultado.cost;
  document.getElementById("descripcion").innerHTML += resultado.description;
  document.getElementById("categoria").innerHTML += resultado.category;
  document.getElementById("vendidos").innerHTML += resultado.soldCount;

  //Mostrar Productos Relacionados

  const productRel = () => {
    resultado.relatedProducts.forEach((element) => {
      document.getElementById(
        "productosRelacionados"
      ).innerHTML += `<div class="  card" onClick="clickProductRel(${element.id})" style="  width: 18rem;">
      <img src="${element.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-text">${element.name}</p>
      </div>
    </div>`;
    });
  };
  productRel();

  //Guardar Objeto del producto que el usuario desea comprar

  document
    .getElementById("enviarAlCarrito")
    .addEventListener("click", function () {
      const arrayCarritoCompra = () => {
        if (!localStorage.arrayCarrito) {
          //Si no existe el arrayCarrito ejecuta este codigo
          let objetoSeleccionado = {
            id: resultado.id,
            name: resultado.name,
            currency: resultado.currency,
            unitCost: resultado.cost,
            image: resultado.images[0],
          };
          const pushObjeto = (objeto) => {
            let arrayCarro = [];
            localStorage.setItem("arrayCarrito", JSON.stringify(arrayCarro));
            arrayCarro = JSON.parse(localStorage.getItem("arrayCarrito")) || [];
            arrayCarro.push(objeto);
            localStorage.setItem("arrayCarrito", JSON.stringify(arrayCarro));
          };
          pushObjeto(objetoSeleccionado);
          //Alertas
          alertaCompra();
          setTimeout(() => {
            removerAlertaCompra();
          }, 3000);
        } else {
          //Si Ya existe el array Con algun objeto en el carrito ejecuta este codigo
          let objetoSeleccionado = {
            id: resultado.id,
            name: resultado.name,
            currency: resultado.currency,
            unitCost: resultado.cost,
            image: resultado.images[0],
          };
          const pushObjeto = (objeto) => {
            let arrayCarro = [];
            arrayCarro = JSON.parse(localStorage.getItem("arrayCarrito")) || [];
            arrayCarro.push(objeto);
            localStorage.setItem("arrayCarrito", JSON.stringify(arrayCarro));
          };
          pushObjeto(objetoSeleccionado);
          //Alertas
          alertaCompra();
          setTimeout(() => {
            removerAlertaCompra();
          }, 3000);
        }
      };
      arrayCarritoCompra();
    });
};
//Muestra los comentarios por default de cada producto, esto es devuelto por la api
const callApiComentarios = async () => {
  const urlComentarios =
    "https://japceibal.github.io/emercado-api/products_comments/" +
    localStorage.productID +
    ".json";
  const respuestaComentarios = await fetch(urlComentarios);
  const resultadoComentarios = await respuestaComentarios.json();

  resultadoComentarios.forEach((element) => {
    document.getElementById(
      "comentarios"
    ).innerHTML += `<div class="container" onClick="setProductId(${
      element.id
    })">
    <div id="nuevoComentario"> </div>
    <div class="list-group-item list-group-item-action cursor-active">
      <div class="row">
        
        <div class="col">
          <div class="d-flex w-100 justify-content-between">
            <h4 class="mb-1">${element.user} - ${
      element.dateTime
    } ${agregarEstrellas(element.score)} </h4>
          </div>
          <p class="mb-1">${element.description}</p>
        </div>
      </div>
    </div>
  </div>
    
    `;
  });
};

//Estrellas-Puntuacion la cual contiene cada comentario
const agregarEstrellas = (cantidad) => {
  let estrellas = "";

  for (let i = 1; i <= 5; i++) {
    if (i <= cantidad) {
      estrellas += '<span class="fa fa-star checked"></span>'; //icono estrella llena
    } else {
      estrellas += '<i class="far fa-star"></i>'; //icono contorno estrella
    }
  }

  return estrellas;
};

//Fecha y Hora
const obtenerFecha = () => {
  const date = new Date();
  const fecha = [
    date.getFullYear().toString(),
    date.getMonth().toString(),
    date.getDate().toString(),
  ];

  // Fecha ordenada
  if (fecha[1] < 10) {
    return fecha[0] + "-0" + fecha[1] + "-" + fecha[2];
  }
  if (fecha[2] < 10) {
    return fecha[0] + "-" + fecha[1] + "-0" + fecha[2];
  }
  if (fecha[1] < 10 && fecha[2] < 10) {
    return fecha[0] + "-0" + fecha[1] + "-0" + fecha[2];
  } else {
    return fecha[0] + "-" + fecha[1] + "-" + fecha[2];
  }
};

const obtenerHora = () => {
  const date = new Date();
  const hora = [
    date.getHours().toString(),
    date.getMinutes().toString(),
    date.getSeconds().toString(),
  ];

  //Hora ordenada

  if (hora[0] < 10) {
    return "0" + hora[0] + ":" + hora[1] + ":" + hora[2];
  }
  if (hora[1] < 10) {
    return hora[0] + ":0" + hora[1] + ":" + hora[2];
  }
  if (hora[2] < 10) {
    return hora[0] + ":" + hora[1] + ":0" + hora[2];
  }
  if (hora[0] < 10 && hora[1] < 10) {
    return "0" + hora[0] + ":0" + hora[1] + ":" + hora[2];
  }
  if (hora[0] < 10 && hora[2] < 10) {
    return "0" + hora[0] + ":" + hora[1] + ":0" + hora[2];
  }
  if (hora[0] < 10 && hora[1] < 10 && hora[2] < 10) {
    return "0" + hora[0] + ":0" + hora[1] + ":0" + hora[2];
  }
  if (hora[1] < 10 && hora[2] < 10) {
    return hora[0] + ":0" + hora[1] + ":0" + hora[2];
  } else {
    return hora[0] + ":" + hora[1] + ":" + hora[2];
  }
};

//Agregar de forma manual un nuevo comentario a la pagina

document
  .getElementById("enviarComentario")
  .addEventListener("click", function () {
    const descripcionComentario = document.getElementById("opinion").value;
    const estrellaUno = document.getElementById("puntuacion1").checked;
    const estrellaDos = document.getElementById("puntuacion2").checked;
    const estrellaTres = document.getElementById("puntuacion3").checked;
    const estrellaCuatro = document.getElementById("puntuacion4").checked;
    const estrellaCinco = document.getElementById("puntuacion5").checked;
    const arrayValorEstrellas = [1, 2, 3, 4, 5];

    //Añadir el resto de informacion sobre el comentario

    document.getElementById(
      "nuevoComentario"
    ).innerHTML += `<div class="list-group-item list-group-item-action cursor-active">
      <div class="row">
        
        <div class="col">
          <div class="d-flex w-100 justify-content-between">
            <h4 class="mb-1">${localStorage.Email} - ${
      obtenerFecha() + " " + obtenerHora()
    } <span id="estrellaComentarioNuevo"></span> </h4>
          </div>
          <p class="mb-1">${descripcionComentario}</p>
        </div>
      </div>
    </div>`;
    //Añadir estrellas
    if (estrellaUno) {
      document.getElementById(
        "estrellaComentarioNuevo"
      ).innerHTML += `${agregarEstrellas(arrayValorEstrellas[4])}`;
    }
    if (estrellaDos) {
      document.getElementById(
        "estrellaComentarioNuevo"
      ).innerHTML += `${agregarEstrellas(arrayValorEstrellas[3])}`;
    }
    if (estrellaTres) {
      document.getElementById(
        "estrellaComentarioNuevo"
      ).innerHTML += `${agregarEstrellas(arrayValorEstrellas[2])}`;
    }
    if (estrellaCuatro) {
      document.getElementById(
        "estrellaComentarioNuevo"
      ).innerHTML += `${agregarEstrellas(arrayValorEstrellas[1])}`;
    }
    if (estrellaCinco) {
      document.getElementById(
        "estrellaComentarioNuevo"
      ).innerHTML += `${agregarEstrellas(arrayValorEstrellas[0])}`;
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  callApi();
  callApiComentarios();
});
