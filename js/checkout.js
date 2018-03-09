function bringData() {
  let itemsCounter = localStorage.getItem("itemsCounter");
  const counter = document.querySelector('#counterItems');
  counter.innerText = itemsCounter;
  const productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
  calculateTotal(productsInCart)
}
bringData()




function calculateTotal(productsInCart) {
  //como le hacemos para extraer toda
  //de cantidades de los elementos
  //en mi carrito
  var totalPrice = 0;
  let productDetails = "";

  productsInCart.forEach(item => {
    totalPrice += item.price
    productDetails +=`
      <tr>
      <th scope="row">${item.title}</th>
      <td>${item.price}</td>
      </tr>
    `
    const tableBody = document.querySelector("#table-body");
    tableBody.innerHTML = productDetails;

  });

  document.write("TOTAL: " + totalPrice);

  let showTotalPrice = `
  <td>${totalPrice}</td>
  `;
  const totalPriceContainer = document.querySelector("#total-price");
  totalPriceContainer.innerHTML = showTotalPrice;
}
