let cartCount = 0;

// Get all "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    cartCount++;
    alert("Added to cart! Total items: " + cartCount);
    updateCartDisplay();
  });
});

// Optional: Display cart count in corner
function updateCartDisplay() {
  const cartDisplay = document.querySelector('#cart-count');
  if (cartDisplay) {
    cartDisplay.innerText = cartCount;
  }
}
