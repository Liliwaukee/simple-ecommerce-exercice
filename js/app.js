function drawProducts(data) {
  let products = data.products;
  let productsContainer = document.getElementById("products-container");
  products.forEach((product, index) => {
    let productHTML = createProductHTML(product);
    productsContainer.appendChild(productHTML);
  });
}

function createProductHTML(product) {
  let template = `
    <h3>${product.title}</h3>
    <img src='${product.imageUrl}' alt='${product.description}'/>
    <p>${product.description}</p>
    <button data-product-id=${product.id}
      onclick="addToCart(this,${product.id})"
      class="btn btn-primary">
        Agregar a carrito
      </button>
    <hr/>
  `;
  let productContainer = document.createElement("div");
  productContainer.className = "col text-center";
  productContainer.innerHTML = template;
  return productContainer;
}

drawProducts(data);

let productsInCart = [];

function addToCart(product, productId) {
  /* cuando agrego a carrito, tengo que:
  1) Incrementar en uno mi contador del menu
  2) Guardar mi producto en algun lugar
  3) Cambiar el boton de agregar a carrito
  por quitar del carrito

  */

  let productItem = data.products[(productId-1)];
  productsInCart.push(productItem);
  localStorage.setItem("productsInCart", JSON.stringify(productsInCart));

  const counter = document.querySelector('#counterItems');

  changeButtonStatus(product);

  if (product.classList.contains('btn-addCart') === false) {
      increaseCounter(product, counter);

    } else if (product.classList.contains('btn-addCart') === true) {
      decreaseCounter(product, counter);

    }
}





function removeFromCart(product) {
  /* cuando agrego a carrito, tengo que:
  1) Decrementar en uno mi contador del menu
  2) Borrar mi producto de algun lugar
  3) Cambiar el boton de quitar del carrito
  por agregar a carrito
  */
}

function increaseCounter(product, counter) {
  /* como accedemos al HTML del contador
  y como lo incrementamos*/
  product.classList.toggle('btn-addCart')
  let counterNumber = parseInt(document.querySelector('#counterItems').textContent);
  counterNumber ++
  counter.innerHTML = counterNumber;
  productsCounter(counterNumber);
}

function decreaseCounter(product, counter) {
  /* como accedemos al HTML del contador
  y como lo incrementamos*/
  product.classList.toggle('btn-addCart')
  let counterNumber = parseInt(document.querySelector('#counterItems').textContent);
  counterNumber --
  counter.innerHTML = counterNumber;
  productsCounter(counterNumber);
}

function changeButtonStatus(button) {

  if (button.innerText =="Agregar a carrito") {
      button.innerText = "Quitar del carrito";
      button.classList.remove("btn-primary");
      button.classList.add("btn-secondary");

  }
   else {
     button.innerText = "Agregar a carrito";
     button.classList.add("btn-primary");
     button.classList.remove("btn-secondary");

  }
}

function productsCounter(counterNumber){
  localStorage.setItem("itemsCounter", counterNumber);
}
