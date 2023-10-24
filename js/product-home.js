const productosCard = JSON.parse(localStorage.getItem("productosCargados")) || []
const cardContainer = document.getElementById("card-container")

productosCard.forEach((prod) => {

    cardContainer.innerHTML += `
    <article class="card">
    <div class="card-header">
        <figure class="tortugas">
            <img src="${prod.imagen}">
        </figure>
        </div>
    </div>

    <div class="card-main">
        <h2>${prod.titulo}</h2>
        <div class="card-description">
            <p>
            ${prod.descripcion} 
            </p>
        </div>
        
        <div class="card-prices">
            <div class="card-fecha">${prod.fecha}</div>
            <div class="card-price">$${prod.precio}</div>
        </div>
    </div>

    <div class="card-footer">
      <button class="button">
          <span class="button-content">Ver detalles</span>
        </button>
        <button class="button">
          <span class="button-content">Comprar</span>
        </button>
    </div>
</article>
    `
})