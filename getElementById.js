
const mainHeading = document.getElementById("main-heading");
mainHeading.textContent = "Fruit World"

mainHeading.style.color = "orange"

const mainDiv = document.getElementById("header");
mainDiv.style.backgroundColor = "green";

mainDiv.style.borderBottom = "3px solid orange";

const basketHeading = document.getElementById("basket-heading");

basketHeading.style.color = "green";

const createP = document.createElement("p");
createP.textContent = "Please visit us again"
const thanksdiv = document.getElementById("thanks");
thanksdiv.appendChild(createP);
