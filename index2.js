/* global strftime, cuid */
'use strict';
/* global $ */

const STORE = {
  items: [
    {id: cuid(), name: 'apples', checked: false, createdAt: Date.now() - 100000000},
    {id: cuid(), name: 'oranges', checked: false, createdAt: Date.now() - 4000000},
    {id: cuid(), name: 'milk', checked: true, createdAt: Date.now() - 820000000},
    {id: cuid(), name: 'bread', checked: false, createdAt: Date.now() - 6000000}
  ],
  sortBy: 'alpha',
};

function displayTimeCreated(createdAt) {
  return strftime('%h-%d %H:%M', new Date(createdAt));
}





function generateItemElement(item) {
  return `
    <li class="js-item-index-element" data-item-id="${item.id}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <span class="shopping-item-timestamp">${displayTimeCreated(item.createdAt)}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');

  const items = shoppingList.map((item) => generateItemElement(item));
  
  return items.join('');
}


function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');

  let filteredItems = [ ...STORE.items ];

  if (STORE.sortBy === 'alpha') {
    filteredItems.sort((a, b) => a.name > b.name);
  } else if (STORE.sortBy === 'time') {
    filteredItems.sort((a, b) => a.createdAt < b.createdAt);
  }

  const shoppingListItemsString = generateShoppingItemsString(filteredItems);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}


function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({id: cuid(), name: itemName, checked: false, createdAt: Date.now()});
}








function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function getItemIdFromElement(item) {
  return $(item)
    .closest('.js-item-index-element')
    .data('item-id');
}

function findItemById(id) {
  return STORE.items.find(i => i.id === id);
}







function toggleCheckedForListItem(itemId) {
  const item = findItemById(itemId);
  item.checked = !item.checked;
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const itemId = getItemIdFromElement(event.currentTarget);
    toggleCheckedForListItem(itemId);
    renderShoppingList();
  });
}









// name says it all. responsible for deleting a list item.
function deleteListItem(itemId) {
  const itemIndex = STORE.items.findIndex(i => i.id === itemId);
  STORE.items.splice(itemIndex, 1);
}


function handleDeleteItemClicked() {
  // like in `handleItemCheckClicked`, we use event delegation
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    const itemId = getItemIdFromElement(event.currentTarget);
    // delete the item
    deleteListItem(itemId);
    // render the updated shopping list
    renderShoppingList();
  });
}








function changeSortDropdown(sortByValue) {
  STORE.sortBy = sortByValue;
}

function handleChangeSortDropdown() {
  $('#js-shopping-list-sortby').on('change', e => {
    // 1. Get info from DOM
    const sortByValue = $(e.target).val();

    // 2. Change the store
    changeSortDropdown(sortByValue);

    // 3. Render
    renderShoppingList();
  });
}











// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleChangeSortDropdown();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);