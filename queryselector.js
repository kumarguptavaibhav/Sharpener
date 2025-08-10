// Write the code as shown in the video below:
const mainHeading = document.querySelector('#main-heading');
mainHeading.style.textAlign = "center";

const fruits = document.querySelector('.fruits');
fruits.style.backgroundColor = "grey";
fruits.style.padding = "30px";
fruits.style.margin = "30px";
fruits.style.width = "50%";
fruits.style.borderRadius = "5px";
fruits.style.listStyleType = "none";

const basketHeading = document.querySelector('h2');
basketHeading.style.marginLeft = "30px";

const fruitItems = document.querySelectorAll('.fruit');
for (let items of fruitItems) {
    items.style.backgroundColor = "white";
    items.style.padding = "10px";
    items.style.margin = "10px";
    items.style.borderRadius = "5px";
}

const oddfruititems = document.querySelectorAll('.fruit:nth-child(odd)');
for (let items of oddfruititems) {
    items.style.backgroundColor = "lightgray";
}
// Write answer to the questions asked below:

document.querySelector('#basket-heading').style.color = "brown";

let evenItems = document.querySelectorAll('.fruit:nth-child(even)');
for (let items of evenItems) {
    items.style.backgroundColor = "brown";
    items.style.color = "white";
}
