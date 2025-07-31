let popup = document.querySelector(".popup");
let placeOrder = document.querySelector(".placeOrder");

//display popup modal
placeOrder.addEventListener("click", function () {
  popup.style.display = "block";
});

//close successful popup modal
let closePopup = document.querySelector(".closePopup");

closePopup.addEventListener("click", function () {
    popup.style.display = "none";
});



