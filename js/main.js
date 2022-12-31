let lbProduct = document.getElementById('lbQuantity');
console.log(lbProduct)

let ddlCategory = document.getElementById("ddlCategory");
let category = document.getElementById("category");
let product = document.getElementById("product");
let quantity = document.getElementById("quantity");
let price = document.getElementById("price");
let discount = document.getElementById("discount");
let total = document.getElementById("total");

let categoryArray;
let productArray;
let btnStatus = 'Create';
let proID;

localStorage.Category != null? (categoryArray = JSON.parse(localStorage.Category)): (categoryArray = []);
localStorage.Product != null? (productArray = JSON.parse(localStorage.Product)): (productArray = []);

// Save Category
function saveCategory() {
  let objCat = {
    category: category.value,
  };
  categoryArray.push(objCat);
  localStorage.setItem("Category", JSON.stringify(categoryArray)); //  stringify =>  array to string
  resetCategory();
  showCategory();
  showTableCategory();
  countCategory();
}

// Reset Category
function resetCategory() {
  category.value = "";
}

// Show Category

function showCategory() {
  let item = "";
  item += `<option value="">Select Category</option>`;
  for (let i = 0; i < categoryArray.length; i++) {
    item += `<option value="${i}">${categoryArray[i].category}</option>`;
  }
  ddlCategory.innerHTML = item;
}

// SHow Table Category

function showTableCategory() {
  let table = "";
  for (let i = 0; i < categoryArray.length; i++) {
    table += `
            <tr>
                <td>${i + 1}</td>
                <td>${categoryArray[i].category}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteCategory(${i})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
  }
  document.getElementById("bodyCategory").innerHTML = table;
}

// Delete Category

function deleteCategory(id) {
  if (confirm("Are You sure from Deleted.....?") == true) {
    categoryArray.splice(id, 1);
    localStorage.Category = JSON.stringify(categoryArray);
    showTableCategory();
    showCategory();
    countCategory();
  }
}

// count category

function countCategory() {
  document.getElementById(
    "countCategory"
  ).innerHTML = `Total Category : ${categoryArray.length}`;
}

// validation category

function validationCategory() {
  let valid = true;
  if (category.value == "") {
    alert("Enter Name Category");
    valid = false;
  } else {
    saveCategory();
    valid = true;
  }
  return valid;
}

// get Total product

function getTotalProduct() {
  if (price.value != 0) {
    let totalValue = quantity.value * price.value - discount.value;
    total.value = totalValue;
    total.className.replace = "form-control bg-danger text-center";
    total.className = "form-control bg-success text-center";
  } else {
    total.value = 0;
    total.className.replace = "form-control bg-success text-center";
    total.className = "form-control bg-danger text-center";
  }
}

// save product
function saveProduct() {
  let objProduct = {
    ddlCategory: ddlCategory.options[ddlCategory.selectedIndex].text,
    product: product.value,
    quantity: quantity.value,
    price: price.value,
    discount: discount.value,
    total: total.value,
  };
  if(btnStatus === 'Create') { 
    productArray.push(objProduct) 
  }else {
    productArray[proID] = objProduct;
    document.getElementById('btnSave').className.replace = 'btn btn-info w-25';
    document.getElementById('btnSave').className = 'btn btn-success w-25';
  }

  localStorage.setItem("Product", JSON.stringify(productArray));
  resetProduct();
  showTableProduct();
  countProduct();
  getTotalProduct();

}

// reset product

function resetProduct() {
  ddlCategory.options[ddlCategory.selectedIndex].text = "Select Category";
  product.value = "";
  quantity.value = 0;
  price.value = 0;
  discount.value = 0;
  total.value = 0;
  document.getElementById('btnSave').className.replace = 'btn btn-info w-25';
  document.getElementById('btnSave').className = 'btn btn-success w-25';
}

function showTableProduct(){
    let table = "";
    for (let i = 0; i < productArray.length; i++) {
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${productArray[i].ddlCategory}</td>
                <td>${productArray[i].product}</td>
                <td>${productArray[i].quantity}</td>
                <td>${productArray[i].price}</td>
                <td>${productArray[i].discount}</td>
                <td>${productArray[i].total}</td>
                <td>
                    <button class="btn btn-info" onclick="editProduct(${i})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger" onclick="deleteProduct(${i})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
            `;
    }
    document.getElementById("bodyProduct").innerHTML = table;
}

// Delete Product 

function deleteProduct(id){
    if (confirm("Are You sure from Deleted.....?") == true) {
        productArray.splice(id, 1);
        localStorage.Product = JSON.stringify(productArray);
        showTableProduct();
        countProduct();
      }
}


// edit Product

function editProduct(id){
  // reset data of product in 
  ddlCategory.options[ddlCategory.selectedIndex].text = productArray[id].ddlCategory;
  product.value = productArray[id].product;
  price.value = productArray[id].price;
  quantity.value = productArray[id].quantity;
  discount.value = productArray[id].discount;
  total.value = productArray[id].total;
  btnStatus = 'Edit';
  proID = id;
  document.getElementById('btnSave').className.replace = 'btn btn-success w-25';
  document.getElementById('btnSave').className = 'btn btn-info w-25';
}


// count Product 

function countProduct() {
  document.getElementById('countProduct').innerHTML = `Total Product (${productArray.length})`;
}


//validation Product

function validationProduct() {
  let lbcate = document.getElementById('lbCata');
  let lbProduct = document.getElementById('lbProduct');
  let lbqutity = document.getElementById('lbQuantity');
  let lbPrice = document.getElementById('lbPrice');

  let valid = true;

  if (ddlCategory.options[ddlCategory.selectedIndex].text == 'Select Category') {

      lbcate.innerHTML = 'Category : * [Required]';
      lbcate.style.color = 'red';
      valid = false;

  } else {
      lbcate.innerHTML = 'Category :';
      lbcate.style.color = 'white';
      valid = true;
  }



  if (product.value == '') {

      lbProduct.innerHTML = 'Product Name : * [Required]';
      lbProduct.style.color = 'red';
      valid = false;

  } else {
      lbProduct.innerHTML = 'Product Name : * ';
      lbProduct.style.color = 'white';
      valid = true;
  }



  if (quantity.value == 0) {

      lbqutity.innerHTML = 'Quantity :* [Required]';
      lbqutity.style.color = 'red';
      valid = false;

  } else {
      lbqutity.innerHTML = 'Quntity : *';
      lbqutity.style.color = 'white';
      valid = true;
  }

  if (price.value == 0) {

      lbPrice.innerHTML = 'Price : * [Requred]';
      lbPrice.style.color = 'red';
      valid = false;

  } else {
      lbPrice.innerHTML = 'Price : *';
      lbPrice.style.color = 'white';
      valid = true;

  }

  if (ddlCategory.options[ddlCategory.selectedIndex].text != '' &&
      product.value != '' && quantity.value != 0 && price.value != 0) {

      saveProduct();

  }




  return valid;
}

$(document).ready(function () {
  showCategory();
  showTableCategory();
  countCategory();
  showTableProduct();
  countProduct();
  $("#tablePro").DataTable();
});


