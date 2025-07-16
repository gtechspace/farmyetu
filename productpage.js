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


window.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#cart-table tbody");
  if (!tableBody) return;

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  let total = 0;

  cartItems.forEach(item => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = item.name;

    const quantityCell = document.createElement("td");
    quantityCell.textContent = item.quantity;

    const priceCell = document.createElement("td");
    priceCell.textContent = `KES ${item.price.toFixed(2)}`;

    const subtotal = item.quantity * item.price;
    const subtotalCell = document.createElement("td");
    subtotalCell.textContent = `KES ${subtotal.toFixed(2)}`;

    total += subtotal;

    row.appendChild(nameCell);
    row.appendChild(quantityCell);
    row.appendChild(priceCell);
    row.appendChild(subtotalCell);

    tableBody.appendChild(row);
  });


  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td colspan="3"><strong>Total</strong></td>
    <td><strong>KES ${total.toFixed(2)}</strong></td>
  `;
  tableBody.appendChild(totalRow);
});
