document.querySelectorAll(".image-container img").forEach((image) => {
  image.onclick = () => {
    document.querySelector(".popup-image").style.display = "block";
    document.querySelector(".popup-image img").src = image.getAttribute("src");
  };
});
document.querySelector(".popup-image span").onclick = () => {
  document.querySelector(".popup-image").style.display = "none";
};

let arrayOfImages = [
  "images/shoes.webp",
  "images/watch.jfif",
  "images/tshirt.jpeg",
  "images/pen.webp",
  "images/card.jpg",
  "images/ball.webp",
];
let counter = 0;

document.querySelector(".popup-image .right-icon ").onclick = () => {
  document.querySelector(".popup-image img").src = arrayOfImages[counter];
  counter += 1;
  if (counter > arrayOfImages.length) {
    counter = 0;
  }
};
document.querySelector(".popup-image .left-icon").onclick = () => {
  document.querySelector(".popup-image img").src = arrayOfImages[counter];
  counter += 1;
  if (counter > arrayOfImages.length) {
    counter = 0;
  }
};
