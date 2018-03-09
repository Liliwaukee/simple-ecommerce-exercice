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


  let showTotalPrice = `
  <td><td>
  <td><h3>${totalPrice}</h3></td>
  `;
  const totalPriceContainer = document.querySelector("#total-price");
  totalPriceContainer.innerHTML = showTotalPrice;

  paypalPay(totalPrice)
}


function paypalPay(totalPrice){
    paypal.Button.render({

      env: 'sandbox', // sandbox | production

      // PayPal Client IDs - replace with your own
      // Create a PayPal app: https://developer.paypal.com/developer/applications/create
      client: {
          sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
          production: 'AZwtebwVV7oNYII1ZGc4tZF74uhotXDvle87uMGMeSvwvVvZ4oJTQ6JtR611__YSOvXFDyUVaa0aT70V'
      },

      // Show the buyer a 'Pay Now' button in the checkout flow
      commit: true,

      // payment() is called when the button is clicked
      payment: function(data, actions) {

          // Make a call to the REST api to create the payment
          return actions.payment.create({

              payment: {
                  transactions: [
                      {
                          amount: { total: `${totalPrice}`, currency: 'MXN' }
                      }
                  ]
              }
          });
      },

      // onAuthorize() is called when the buyer approves the payment
      onAuthorize: function(data, actions) {

          // Make a call to the REST api to execute the payment
          return actions.payment.execute().then(function() {
              window.alert('Payment Complete!');
          });
      }

  }, '#paypal-button-container');
}
