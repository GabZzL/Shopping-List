// DOM elements

const form = document.querySelector('#item-form');
const input = document.querySelector('#item-input');
const list = document.querySelector('#item-list');
const filter = document.querySelector('div .filter');
const clearButton = document.querySelector('#clear');

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

// add item function
const addItem = (e) => {
    e.preventDefault();
    const newItem = input.value;

    if (newItem === '') {
        alert('Please Fill In The Item Entry');
        return;
    } else {
        createItem(newItem);
        checkUI();
        input.value = '';
    };
};

// delete item function
const deleteItem = (e) => {
    if (e.target.tagName === 'I') {
        if (confirm('Do you want to detele this item?')) {
            e.target.parentElement.parentElement.remove();
            checkUI();
        };
    };
};

// delete all items function
const deleteAll = () => {
    if (confirm('Do you want to delete everything?')) {
        const listItems = document.querySelectorAll('li');

        listItems.forEach(item => {
            item.remove();
        });
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

// check the item number
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

form.addEventListener('submit', addItem);
list.addEventListener('click', deleteItem);
clearButton.addEventListener('click', deleteAll);
filter.addEventListener('input', filterItems);
