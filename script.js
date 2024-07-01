const form = document.querySelector('#item-form');
const input = document.querySelector('#item-input');
const list = document.querySelector('#item-list');
const clearButton = document.querySelector('#clear');

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

const addItem = (e) => {
    e.preventDefault();
    const newItem = input.value;

    if (newItem === '') {
        alert('Please Fill In The Item Entry');
        return;
    } else {
        createItem(newItem);
        input.value = '';
    };
};

const deleteItem = (e) => {
    if (e.target.tagName === 'I') {
        e.target.parentElement.parentElement.remove();
    };
};

const deleteAll = () => {
    const listItems = document.querySelectorAll('li');
    listItems.forEach(item => {
        item.remove();
    });
};

form.addEventListener('submit', addItem);
list.addEventListener('click', deleteItem);
clearButton.addEventListener('click', deleteAll);