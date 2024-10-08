let productName = document.getElementById('productNameInput');
let productCategory = document.getElementById('productCategoryInput');
let productPrice = document.getElementById('productPriceInput');
let productQuantity = document.getElementById('productQuantityInput');
let searchInput = document.getElementById('searchProduct');
let createButton = document.getElementById('createButton');

let mood = 'create';
let productData;
let tmv;

// Create product
if (localStorage.product != null) {
    productData = JSON.parse(localStorage.product)
}
else {
    productData = [];
}

function create() {
    if ((productName.value != '') && (productCategory.value != '') && (productPrice.value != '') && (productQuantity.value != '') && (productPrice.value > 0) && (productQuantity.value > 1)) {
        let newProduct = {
            productName: productName.value,
            productCategory: productCategory.value,
            productPrice: productPrice.value,
            productQuantity: productQuantity.value
        }
        if (mood == 'create') {
            productData.push(newProduct);
            localStorage.setItem('product', JSON.stringify(productData));
        }
        else {
            productData[tmv] = newProduct;
            localStorage.setItem('product', JSON.stringify(productData));
            showData();
            mood = 'create';
            createButton.setAttribute('class', 'col-4 col-lg-2 mb-4 btn btn-success');
            createButton.innerText = 'CREATE';
        }
        clear();  
    }  
    showData();
}


// Clear the inputs
function clear() {
    productName.value = '';
    productCategory.value = '';
    productPrice.value = '';
    productQuantity.value = '';
    searchInput.value = '';
}


// Read product
function showData() {
    let tr = '';
    for (let i = 0; i < productData.length; i++) {
        tr += `
            <tr>
                <td class="pt-3 pb-3 text-center">${i+1}</td>
                <td class="pt-3 pb-3 text-center">${productData[i].productName}</td>
                <td class="pt-3 pb-3 text-center">${productData[i].productCategory}</td>
                <td class="pt-3 pb-3 text-center">${productData[i].productPrice} €</td>
                <td class="pt-3 pb-3 text-center">${productData[i].productQuantity}</td>
                <td class="pt-3 pb-3 text-center"><button onclick="update(${i})" id="update" class="btn btn-warning">UPDATE</button></td>
                <td class="pt-3 pb-3 text-center"><button onclick="deleteProduct(${i})" id="delete" class="btn btn-danger">DELETE</button></td>
            </tr>    
        `;
    }
    document.getElementById('tbody').innerHTML = tr;
    let deleteAllDiv = document.getElementById('deleteAllDiv');
    if (productData.length > 0) {
        deleteAllDiv.innerHTML = `
            <div onclick="deleteAll()" id="deleteAllButton" class="col-4 col-lg-2 btn btn-danger">DELETE ALL</div>
        `;
    }
    else {
        deleteAllDiv.innerHTML = '';
    }

}showData();


// Delete product
function deleteProduct(rowID) {
    productData.splice(rowID,1);
    localStorage.setItem('product', JSON.stringify(productData));
    showData();
}


// Delete All
function deleteAll() {
    localStorage.clear();
    productData.splice(0);
    clear();
    mood = 'create';
    createButton.setAttribute('class', 'col-4 col-lg-2 mb-4 btn btn-success');
    createButton.innerText = 'CREATE';
    showData();
}


// Update product
function update(rowID) {
    productName.value = productData[rowID].productName;
    productCategory.value = productData[rowID].productCategory;
    productPrice.value = productData[rowID].productPrice;
    productQuantity.value = productData[rowID].productQuantity;
    mood = 'update';
    createButton.setAttribute('class', 'col-4 col-lg-2 mb-4 btn btn-warning');
    createButton.innerText = 'UPDATE'
    tmv = rowID;
}


// Search product
function search(value) {
    let tr = '';
    for (let i = 0; i < productData.length; i++) {
        if (productData[i].productName.toLowerCase().includes(value.toLowerCase())) {
            tr += `
            <tr>
                <td class="pt-3 pb-3 text-center">${i+1}</td>
                <td class="pt-3 pb-3 text-center">${productData[i].productName}</td>
                <td class="pt-3 pb-3 text-center">${productData[i].productCategory}</td>
                <td class="pt-3 pb-3 text-center">${productData[i].productPrice}</td>
                <td class="pt-3 pb-3 text-center">${productData[i].productQuantity}</td>
                <td class="pt-3 pb-3 text-center"><button onclick="update(${i})" id="update" class="btn btn-warning">UPDATE</button></td>
                <td class="pt-3 pb-3 text-center"><button onclick="deleteProduct(${i})" id="delete" class="btn btn-danger">DELETE</button></td>
            </tr>    
        `;
        }
    }
    document.getElementById('tbody').innerHTML = tr;
}
