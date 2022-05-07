var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");
var inputs = document.getElementsByClassName("form-control");
var submitBtn = document.getElementById("submitBtn");
var searchInput = document.getElementById("search");
var nameAlertInput = document.getElementById("nameAlert");
var currentIndex = 0;
var productContainer = [];
if (inputs.value == null) {
    submitBtn.disabled = "true";
}

productNameInput.onkeyup = function() {
    var nameRejex = /^[A-Z][a-z]{2,8}$/;
    if (!nameRejex.test(productNameInput.value)) {

        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");
        nameAlertInput.classList.remove("d-none");
        submitBtn.disabled = "true";
    } else {
        submitBtn.removeAttribute("disabled")
        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid");
        nameAlertInput.classList.add("d-none");
    }
}



if (JSON.parse(localStorage.getItem("ourProducts")) != null) {
    productContainer = JSON.parse(localStorage.getItem("ourProducts"));
    displayProduct();
}





submitBtn.onclick = function() {
    if (submitBtn.innerHTML == "add Product") {

        addProduct();
    } else {
        updateProduct();
    }

    displayProduct();
    clearForm();

}



function addProduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value,
    }
    productContainer.push(product);
    localStorage.setItem("ourProducts", JSON.stringify(productContainer));
}

function displayProduct() {
    var cartoona = ``;
    for (var i = 0; i < productContainer.length; i++) {
        cartoona += `<tr>
        <td>${i}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].desc}</td>
        <td><button onclick="deleteProduct(${i});" class="btn btn-danger">delete</button></td>
        <td><button onclick="editProduct(${i});" class="btn btn-info">update</button></td>
    </tr> `;

    }
    document.getElementById('tableBody').innerHTML = cartoona;

}

function clearForm() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }

}



function deleteProduct(index) {
    productContainer.splice(index, 1);
    displayProduct();
    localStorage.setItem("ourProducts", JSON.stringify(productContainer));

}



function editProduct(index) {
    productNameInput.value = productContainer[index].name;
    productPriceInput.value = productContainer[index].price;
    productCategoryInput.value = productContainer[index].category;
    productDescInput.value = productContainer[index].desc;

    submitBtn.innerHTML = "update Product";
    currentIndex = index;
}



function updateProduct(index) {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value,
    }
    productContainer[currentIndex] = product;
    localStorage.setItem("ourProducts", JSON.stringify(productContainer));
    submitBtn.innerHTML = "add Product";
}

searchInput.onkeyup = function() {

    var cartoona = ``;
    var term = searchInput.value;
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            cartoona += `<tr>
        <td>${i}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].desc}</td>
        <td><button onclick="deleteProduct(${i});" class="btn btn-danger">delete</button></td>
        <td><button onclick="editProduct();" class="btn btn-info">update</button></td>
    </tr> `;

        }
        document.getElementById('tableBody').innerHTML = cartoona;
    }
}

















// حل تاني لل clear form
// function clearForm() {
//     productNameInput.value="";
//     productPriceInput.value="";
//     productCategoryInput.value="";
//     productDescInput.value="";
// }