// DOM elements

const form = document.querySelector('#item-form');
const input = document.querySelector('#item-input');
const list = document.querySelector('#item-list');
const filter = document.querySelector('div .filter');
const clearButton = document.querySelector('#clear');
const formButton = form.querySelector('button');

// variable to switch the edit mode
let editMode = false;

// create item function
const createItem = (content) => {
    const listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode(content));

    const button = document.createElement('button');
    button.className = 'remove-item btn-link text-red';

    const img = document.createElement('i');
    img.className = 'fa-solid fa-xmark';

    button.appendChild(img);
    listItem.appendChild(button);
    list.appendChild(listItem);
};

// get items from the local storage
const getItemsFromLocalStorage = () => {
    let itemsFromStorage;

    if(localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'))
    };

    return itemsFromStorage;
};

// add items to the local storage
const addItemToLocalStorage = (item) => {
    const itemsFromStorage = getItemsFromLocalStorage();

    itemsFromStorage.push(item);

    // convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

// remove items from the local storage
const removeItemFromLocalStorage = (itemToRemove) => {
    let itemsFromStorage = getItemsFromLocalStorage();

    itemsFromStorage = itemsFromStorage.filter(item => {
        return item !== itemToRemove;
    });

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

// remove all items from local storage
const removeItemsFromLocalStorage = () => {
    localStorage.clear();
};

// show the items from the local storage to the DOM
const showItemsDOM = () => {
    const itemsFromStorage = getItemsFromLocalStorage();

    itemsFromStorage.forEach(item => {
        createItem(item);
    });

    checkUI();
};

// add item
const addItem = (item) => {
    if (item === '') {
        alert('Please Fill In The Item Entry');
        return;
    } else {
        // create item in the DOM
        createItem(item);
        // add item to local storage
        addItemToLocalStorage(item);
        checkUI();
        input.value = '';
    };
};

// edit item
const editItem = (updateItem) => {
    const itemToEdit = document.querySelector('.edit-mode');
    removeItemFromLocalStorage(itemToEdit.innerText);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();

    addItem(updateItem);

    formButton.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formButton.style.backgroundColor = '#333';
};

// check if the item already exists
const checkItemExists = (item) => {
    const itemsFromStorage = getItemsFromLocalStorage();
    return itemsFromStorage.includes(item);
};

// submit function
const onSubmitItem = (e) => {
    e.preventDefault();
    const item = input.value;

    if (editMode) {
        editItem(item);
        editMode = false;
    } else {
        if (checkItemExists(item)) {
            alert('The item already exists!');
        } else {
            addItem(item);
        };
    };
};

// function to delete a single item
const deleteItem = (item) => {
    if (confirm('Do you want to detele this item?')) {
        const itemToRemove = item.parentElement.parentElement;
        // remove item from the DOM
        itemToRemove.remove();
        // remove item from the local storage
        removeItemFromLocalStorage(itemToRemove.innerText);
        checkUI();
    };
};

// function to edit one item
const activateEditMode = (item) => {
    const listItems = document.querySelectorAll('li');

    listItems.forEach(item => {
        item.classList.remove('edit-mode');
    });

    item.classList.add('edit-mode');
    formButton.innerHTML = '<i class="fa-solid fa-pen"></i> Edit Item';
    formButton.style.backgroundColor = '#228B22';

    input.value = item.innerText;
};

// click list item(delete item or update item)
const clickListItem = (e) => {
    // click the 'x' button to delete the item
    const clickItem = e.target;
    if (clickItem.tagName === 'I') {
       deleteItem(clickItem);
    } else {
        // start the edit mode
        editMode = true
        activateEditMode(clickItem);
    };
};

// delete all items function
const deleteAll = () => {
    if (confirm('Do you want to delete everything?')) {
        const listItems = document.querySelectorAll('li');
        // remove items from the DOM
        listItems.forEach(item => {
            item.remove();
        });
        // remove items from the local storage
        removeItemsFromLocalStorage()
        checkUI();
    }; 
};

// filter items function
const filterItems = (e) => {
    const filterText = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll('li');

    listItems.forEach(item => {
        const itemName = item.innerText.toLocaleLowerCase();
        
        if (itemName.indexOf(filterText) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        };
    });
};

// check UI to display DOM elements
const checkUI = () => { 
    const listItems = document.querySelectorAll('li');

    if (listItems.length === 0) {
        filter.style.display = 'none';
        clearButton.style.display = 'none';
    } else {
        filter.style.display = 'block';
        clearButton.style.display = 'block';
    };
};

// event listeners

form.addEventListener('submit', onSubmitItem);
list.addEventListener('click', clickListItem);
clearButton.addEventListener('click', deleteAll);
filter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', showItemsDOM);

checkUI();
