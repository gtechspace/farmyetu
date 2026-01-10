function addToCart(button) {
  const card = button.closest(".product-card");
  const name = card.querySelector("h3").textContent.trim();
  const priceText = card.querySelector(".price").textContent;
  const price = parseFloat(priceText.replace("Ksh", "").trim());

  const quantityInput = card.querySelector('input[type="number"]');
  const quantity = parseInt(quantityInput.value);

  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const existingItem = cartItems.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({ name, price, quantity });
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  window.location.href = "cart.html";
}

//main totalCell
const totalRow = document.createElement("tr");

//totalCell after row is deleted
const totalCell = document.createElement("tr")

//create an array to hold the stored products
let orders = []

window.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#cart-table tbody");
  if (!tableBody) return;

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  let total = 0;

  cartItems.forEach((item) => {
    const row = document.createElement("tr");
    row.setAttribute("class", "cart-row")

    const nameCell = document.createElement("td");
    nameCell.textContent = item.name;

    const quantityCell = document.createElement("td");
    quantityCell.textContent = item.quantity;

    const priceCell = document.createElement("td");
    priceCell.textContent = `KES ${item.price.toFixed(2)}`;

    //create a delete button to delete rows in the cart
    const deleteItem = document.createElement("button")
    deleteItem.textContent = "X"

    const subtotal = item.quantity * item.price;
    const subtotalCell = document.createElement("td");
    subtotalCell.textContent = `KES ${subtotal.toFixed(2)}`;

    total += subtotal;

    console.log(item)



    row.appendChild(nameCell);
    row.appendChild(quantityCell);
    row.appendChild(priceCell);
    row.appendChild(subtotalCell);
    row.appendChild(deleteItem)

    tableBody.appendChild(row);

    let orderedItems = {
      productName: item.name,
      quantity: item.quantity,
      price: item.price,
      total: total
    }

    //save order in the localStorage to be retrieved in orderPage
    orders.push(orderedItems)
    localStorage.setItem("order", JSON.stringify(orders))

    //delete item from cart and save remaining items in local storage
    deleteItem.addEventListener("click", () => {
      totalRow.innerHTML = ""
      //localStorage.clear()

      tableBody.removeChild(row)
      let subTotal = item.quantity * item.price
      total -= subTotal

      let newOrder = []

      cartItems.filter(i => {
        console.log(item.name)
        console.log(i.name)
        if (item.name !== i.name) {
          localStorage.removeItem(i)
          localStorage.clear()

          orderedItems = {
            productName: i.name,
            quantity: i.quantity,
            price: i.price,
            total: total
          }

          newOrder.push(orderedItems)
          
          localStorage.setItem("order", JSON.stringify(newOrder))
        }
      })

      totalCell.innerHTML = `
      <td colspan="3"><strong>Total</strong></td>
      <td><strong>KES ${total.toFixed(2)}</strong></td>
      `;
      tableBody.appendChild(totalCell);

      //   order = [
      //     {
      //     productName: item.productName,
      //     quantity: item.quantity,
      //     price: item.price,
      //     total: total
      //   }
      // ]


      //   localStorage.setItem("order", JSON.stringify(order))

    })


  });




  totalRow.innerHTML = `
    <td colspan="3"><strong>Total</strong></td>
    <td><strong>KES ${total.toFixed(2)}</strong></td>
  `;
  tableBody.appendChild(totalRow);
});
