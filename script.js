var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescriptionInput = document.getElementById("productDescriptionInput");
var productTable = document.getElementById("productTable");
var addButton = document.getElementById("addProductBtn");
var updateButton = document.getElementById("updateProductBtn");
var productContainer;
if (localStorage.getItem("my produsts") != null) {
    productContainer =JSON.parse(localStorage.getItem("my produsts"));// get the data from local storage and parse it to array of object
    displayProducts(productContainer)
}else {
    productContainer = [];
}
function checkEmpty(){
    if (productNameInput.value == "") {
        productNameInput.value="system user"
    }
    if (productPriceInput.value == "") {
        productPriceInput.value="system user"
    }
    if (productCategoryInput.value == "") {
        productCategoryInput.value="system user"
    }
    if (productDescriptionInput.value == "") {
        productDescriptionInput.value="system user"
    }
}
function clearInput() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescriptionInput.value = "";
}
function addProduct() {
    if(validation()==true)
    {
    checkEmpty();
    var product={
    Name:productNameInput.value,
    Price:productPriceInput.value,
    Category:productCategoryInput.value,
    Description:productDescriptionInput.value   
   }
   productContainer.push(product);
   localStorage.setItem("my produsts" , JSON.stringify(productContainer)) // change the arry of object to array of string and save it in local storage
   clearInput()
   displayProducts(productContainer)
//    console.log(productContainer)
    }else{
        alert("wrong data");
    }
    
} 
function displayProducts(productList) { // dsplay list on table and display search list just pass the parametar
    var productRow = ``
    for(var i=0;i<productList.length;i++){
        productRow +=`
        <tr class="text-center">
                <td>${i+1}</td>
                <td>${productList[i].Name}</td>
                <td>${productList[i].Price}</td>
                <td>${productList[i].Category}</td>
                <td>${productList[i].Description}</td>
                <td><button onclick="updateProduct(${i})" class="btn  btn-warning btn-sm ">update</button></td>
                <td><button onclick="deleteProduct(${i})" class="btn  btn-danger btn-sm ">delete</button></td>
        </tr>`
    }
    productTable.innerHTML=productRow;
}
function searchProduct(searchTerm) {
        var searchBeta =[]; //array to store the search result
        for(var i=0;i<productContainer.length;i++){
            if(productContainer[i].Name.toLowerCase().includes(searchTerm.toLowerCase())==true) 
            {
                searchBeta.push(productContainer[i]);
            }
            displayProducts(searchBeta);
        }
}
function deleteProduct(index) {
    productContainer.splice(index,1); // remove the item from the array
    localStorage.setItem("my produsts" , JSON.stringify(productContainer)) // change the arry of object to array of string and save it in local storage
    displayProducts(productContainer);
    if(productContainer.length==0)
    {
        localStorage.clear(); // clear the local storage if the array is empty
    }
}

function  updateProduct(updateIndex){
         productNameInput.value=productContainer[updateIndex].Name
         productPriceInput.value=productContainer[updateIndex].Price
         productCategoryInput.value=productContainer[updateIndex].Category
         productDescriptionInput.value=productContainer[updateIndex].Description
         updateButton.classList.remove("d-none")
         addButton.classList.add("d-none")
         updateButton.onclick = function () 
         {
            checkEmpty()
            var product={
                Name:productNameInput.value,
                Price:productPriceInput.value,
                Category:productCategoryInput.value,
                Description:productDescriptionInput.value   
               }
               productContainer[updateIndex]=product; // update the item in the array
               localStorage.setItem("my produsts" , JSON.stringify(productContainer)) // change the arry of object to array of string and save it in local storage
               clearInput()
               displayProducts(productContainer)
               updateButton.classList.add("d-none")
               addButton.classList.remove("d-none")
         }   
}
function validation(){
    var regax=/^[a-z]{3,8}$/
    if(regax.test(productNameInput.value)){
        productNameInput.classList.replace('is-invalid','is-valid')
        return true;
    }else{
        productNameInput.classList.add('is-invalid')
        return false;
    }
}



 


