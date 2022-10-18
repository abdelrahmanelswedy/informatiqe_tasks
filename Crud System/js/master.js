let title = document.getElementById("title");
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let command = "create";
let temp;
// GET TOTAL
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +tax.value + +ads.value;
    let discou = +discount.value;
    total.innerHTML = result - discou;
    total.style.background = "#7dcfb6";
  } else {
    total.innerHTML = "";
    total.style.background = "#fff";
  }
}

// CREATE PRODUCT
let productData;

if (localStorage.product != null) {
  productData = JSON.parse(localStorage.product);
} else {
  productData = [];
}

create.onclick = function () {
  let porductDetails = {
    title: title.value.toLowerCase(),
    price: price.value,
    tax: tax.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    porductDetails.count <= 100
  ) {
    if (command === "create") {
      // COUNT
      if (porductDetails.count > 1) {
        for (let i = 0; i < porductDetails.count; i++) {
          productData.push(porductDetails);
        }
      } else {
        productData.push(porductDetails);
      }
    } else {
      productData[temp] = porductDetails;
      command = "create";
      create.innerHTML = "CREATE";
      count.style.display = "block";
    }
    clearData();
  }

  // SAVE IN LOCALSTORGAE
  localStorage.setItem("product", JSON.stringify(productData));
  // product is the item we create in localStorage
  // Remember localStorage can't read array so we use json.stringify
  showData();
};

// CLEAR INPUTS
function clearData() {
  title.value = "";
  price.value = "";
  tax.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// READ INPUTS IN OUTPUTS
function showData() {
  let table = "";
  for (i = 0; i < productData.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${productData[i].title}</td>
    <td>${productData[i].price}</td>
    <td>${productData[i].tax}</td>
    <td>${productData[i].ads}</td>
    <td>${productData[i].discount}</td>
    <td>${productData[i].total}</td>
    <td>${productData[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">Update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
  </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  if (productData.length > 0) {
    document.getElementById("delete-all").style.display = "block";
  } else {
    document.getElementById("delete-all").style.display = "none";
  }
  getTotal();
}
showData();

// DELETE DATA
function deleteData(i) {
  productData.splice(i, 1);
  // TO delete product from local storage
  localStorage.product = JSON.stringify(productData);
  showData();
}

function deleteAll() {
  localStorage.clear();
  productData.splice(0);
  // splice(0) to delete from 0 to the end of array
  showData();
}

// UPDATE
function updateData(i) {
  title.value = productData[i].title;
  price.value = productData[i].price;
  tax.value = productData[i].tax;
  ads.value = productData[i].ads;
  discount.value = productData[i].discount;
  getTotal();
  category.value = productData[i].category;
  count.style.display = "none";
  create.innerHTML = "UPDATE";
  command = "update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// SEARCH
let searchMood = "title";
function changeSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "search-by-title") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < productData.length; i++) {
      if (productData[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${productData[i].title}</td>
        <td>${productData[i].price}</td>
        <td>${productData[i].tax}</td>
        <td>${productData[i].ads}</td>
        <td>${productData[i].discount}</td>
        <td>${productData[i].total}</td>
        <td>${productData[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
      </tr>`;
      }
    }
  } else {
    for (let i = 0; i < productData.length; i++) {
      if (productData[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${productData[i].title}</td>
        <td>${productData[i].price}</td>
        <td>${productData[i].tax}</td>
        <td>${productData[i].ads}</td>
        <td>${productData[i].discount}</td>
        <td>${productData[i].total}</td>
        <td>${productData[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
      </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

// CLEAN DATA (to manage inputs)
