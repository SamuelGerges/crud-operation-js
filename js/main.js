let ddlCategory = document.getElementById('ddlCategory');
let category = document.getElementById('category');
let product = document.getElementById('product');
let quantity = document.getElementById('quantity');
let price = document.getElementById('price');
let discount = document.getElementById('discount');
let total = document.getElementById('total');


let categoryArray ;

localStorage.Category != null ? categoryArray = JSON.parse(localStorage.Category) : categoryArray = [];


// Save Category
function saveCategory(){
    let objCat = {
        category : category.value
    };
    categoryArray.push(objCat);
    // console.log(JSON.stringify(categoryArray));
    localStorage.setItem('Category',JSON.stringify(categoryArray));    //  stringify =>  array to string
    resetCategory();
    showCategory();
    showTableCategory();
    countCategory();




}

// Reset Category
function resetCategory() {
    category.value = '';
    
}

// Show Category

function showCategory(){
    let item =''
    item += `<option value="">Select Category</option>`;
    for(let i =0 ;i < categoryArray.length ; i++){
        item += `<option value="${i}">${categoryArray[i].category}</option>`
    }
    ddlCategory.innerHTML = item;
}

// SHow Table Category

function showTableCategory(){
    let table = '';
    for(let i =0 ;i < categoryArray.length ; i++){
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${categoryArray[i].category}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteCategory(${i})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }
    document.getElementById('bodyCategory').innerHTML = table;

}


// Delete Category

function deleteCategory(id){
    if(confirm('Are You sure from Deleted.....?') == true ){
        categoryArray.splice(id,1);
        localStorage.Category = JSON.stringify(categoryArray);
        showTableCategory();
        showCategory();
        countCategory();
    }
}


// count category

function countCategory(){
    document.getElementById('countCategory').innerHTML = `Total Category : ${categoryArray.length}`;
}


// validation category

function validationCategory(){
    let valid = true ;
    if(category.value == ''){
        alert('Enter Name Category');
        valid = false;
    }else{
        saveCategory();
        valid = true;
    }
    return valid;
}



$(document).ready(function(){
    showCategory();
    showTableCategory();
    countCategory();
    $("#tablePro").DataTable();
});