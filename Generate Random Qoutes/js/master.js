let qouteText = document.getElementById("qoute-text");
let qouteAuthor = document.getElementById("qoute-author");
let Generateqoute = document.getElementById("qoute-btn");

function randomQoute() {
  fetch("https://api.quotable.io/random", {
    method: "get",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      qouteText.textContent = `${data.content}`;
      qouteAuthor.textContent = `-- ${data.author}`;
      // console.log(`${data.content} -${data.author}`);
    });
}
Generateqoute.addEventListener("click", () => {
  randomQoute();
});


