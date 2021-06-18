const links = document.querySelector('.links'),
      items = document.querySelector('.list__items'),
      headerText = document.querySelector('.header__text'),
      headerButton = document.querySelector('.header__button'),
      inputProduct = document.querySelector('.header__product'),
      inputQuantity = document.querySelector('.header__quantity'),
      inputPrice = document.querySelector('.header__price'),
      shoppingList = document.querySelector('.list__shopping'),
      listDelete = document.querySelector('.list__delete');


const addToProductLocal = function() {
    let productArr = [];
    const returnLocal = JSON.parse(localStorage.getItem('products'));
    if(returnLocal !== null) {
        for(i = 0; i < returnLocal.length; i++) {
            productArr.push(returnLocal[i]);
        }
    }
    const productObj = {
        item: inputProduct.value,
        quantity: inputQuantity.value,
        price: inputPrice.value
    };
    productArr.push(productObj);
    localStorage.setItem('products', JSON.stringify(productArr));
}

const addToDeleteLocal = function(index) {
    let deleteArr = [];
    const returnLocal = JSON.parse(localStorage.getItem('deleteProducts')),
          returnProductsLocal = JSON.parse(localStorage.getItem('products'));
    if(returnLocal !== null) {
        for(i = 0; i < returnLocal.length; i++) {
            deleteArr.push(returnLocal[i]);
        }
    }
    const deleteItemLocal = returnProductsLocal.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(returnProductsLocal));
    deleteArr.push(deleteItemLocal[0]);
    localStorage.setItem('deleteProducts', JSON.stringify(deleteArr));
    showDeleteList();
}

const showShoppingList = function() {
    const returnLocal = JSON.parse(localStorage.getItem('products'));
    if(returnLocal !== null) {
        shoppingList.innerHTML = '';
    }
    for(let i = 0; i < returnLocal.length; i++) {
        let newShoppingItem = document.createElement('li');
        shoppingList.append(newShoppingItem);
        newShoppingItem.className = 'list__shoppingItem';
        newShoppingItem.innerHTML = `
        <span class="list__number">${i+1}</span>
        <span class="list__name">${returnLocal[i].item}</span>
        <span class="list__quantity">${returnLocal[i].quantity}</span>
        <span class="list__price">${returnLocal[i].price}</span>
        <div class="list__button">
            <button class="list__doneButton">V</button>
            <button class="list__editButton">E</button>
            <button class="list__deleteButton">X</button>
        </div>
        `;
    }
}

const showDeleteList = function () {
    const returnLocal = JSON.parse(localStorage.getItem('deleteProducts'));
    if(returnLocal != null) {
        listDelete.innerHTML = '';
    }
    for(let i = 0; i < returnLocal.length; i++) {
        let newDeleteItem = document.createElement('li');
        listDelete.append(newDeleteItem);
        newDeleteItem.className = 'list__deleteItem';
        newDeleteItem.innerHTML = `
        <span class="list__number">${i+1}</span>
        <span class="list__name">${returnLocal[i].item}</span>
        <span class="list__quantity">${returnLocal[i].quantity}</span>
        <span class="list__price">${returnLocal[i].price}</span>
        <div class="list__button">
            <button class="list__doneButton">V</button>
            <button class="list__editButton">E</button>
            <button class="list__deleteButton">X</button>
        </div>
        `;
    }
}

showShoppingList();
showDeleteList();

shoppingList.addEventListener('click', (event) => {
    const deleteTarget = event.target.closest('li'),
        deleteItem = deleteTarget.querySelector('.list__number'),
        indexItem = parseInt(deleteItem.innerHTML);
        addToDeleteLocal(indexItem - 1);
        showShoppingList();
});

links.addEventListener('click', (event) => {
    for(item of items.children) {
        if(item.getAttribute('data-name') == event.target.getAttribute('data-name')) {
            item.classList.add('dOn');
            headerText.innerHTML = event.target.innerHTML + " list";
        } else {
            item.classList.remove('dOn');
        }
    }
});

headerButton.addEventListener('click', () => {
    addToProductLocal();
    showShoppingList();
    showDeleteList();
});