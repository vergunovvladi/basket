const links = document.querySelector('.links'),
      items = document.querySelector('.list__items'),
      headerText = document.querySelector('.header__text'),
      headerButton = document.querySelector('.header__button'),
      inputProduct = document.querySelector('.header__product'),
      inputQuantity = document.querySelector('.header__quantity'),
      inputPrice = document.querySelector('.header__price'),
      shoppingList = document.querySelector('.list__shopping'),
      itemObj = {
          item: '',
          quantity: '',
          price: ''
      };

let counter = 1;

links.addEventListener('click', event => {
    for(item of items.children) {
        if(item.getAttribute('data-name') == event.target.getAttribute('data-name')) {
            item.classList.add('dOn');
            headerText.innerHTML = event.target.innerHTML + " list";
        } else {
            item.classList.remove('dOn');
        }
    }
});

headerButton.addEventListener('click', event => {
    newShoppingItem = document.createElement('li');
    counter++;
    shoppingList.append(newShoppingItem);
    newShoppingItem.className = 'list__shoppingItem';
    newShoppingItem.innerHTML = `
        <span class="list__number">${counter}</span>
        <span class="list__name">milk</span>
        <span class="list__quantity">3</span>
        <span class="list__price">2</span>
        <div class="list__button">
            <button class="list__doneButton">V</button>
            <button class="list__editButton">E</button>
            <button class="list__deleteButton">X</button>
        </div>
    `;
    addToLocalStorage();
});

const addToLocalStorage = function() {
    itemObj.item = inputProduct.value;
    itemObj.quantity = inputQuantity.value;
    itemObj.price = inputPrice.value;
    const productObj = JSON.stringify(itemObj);
    localStorage.setItem(counter, productObj);
}