const callApiCars = async () => {
  const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";
  const respuesta = await fetch(url);
  const resultado = await respuesta.json();
  const arrayAutos = resultado.products;
  document.getElementById("catName").innerHTML = resultado.catName;
  arrayAutos.forEach((element) => {
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
  });
};

callApiCars();
