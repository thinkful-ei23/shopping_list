'use strict';
/* global $ */


const STORE = {
  items: [
    {name: 'apples',checked: false},
    {name: 'oranges',checked: false},
    {name: 'milk',checked: true},
    {name: 'bread',checked: false}
  ],
  hideChecked: false,
  searchTerm: ''
};






function generateItemElement(item, itemIndex, template) {
  console.log('function generateItemElement() ran');
  return `
  <li class="js-item-index-element ${STORE.hideChecked === true && item.checked ? 'shopping-item__hidden' : ''}" data-item-index="${itemIndex}">
    <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
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

  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  console.log('function generateShoppingItemString ran');

  return items.join('');
}

function renderShoppingList() {
  let filteredItems = [...STORE.items];

  if (STORE.searchTerm !== '') {
    filteredItems = filteredItems.filter(item => item.name.includes(STORE.searchTerm));
  }
  // this function will be responsible for rendering the shopping list in
  // the DOM
  const shoppingListItemsString = generateShoppingItemsString(filteredItems);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
  console.log('function renderShoppingList() ran' + '\n\n');
}












function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({
    name: itemName,
    checked: false
  });
}

function handleNewItemSubmit() {
  $('#js-shopping-list-add-form').submit(function (event) {
    event.preventDefault();
    console.log('function handleNewItemSubmit() ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}























function handleItemCheckedClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', function (event) {
    console.log('function handleItemCheckedClicked() ran');
    console.log(event.currentTarget);
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function toggleCheckedForListItem(itemIndex) {
  console.log(`Toggling checked property for item at index ${itemIndex}`);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}























function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    console.log('function handleDeleteItemClicked() ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    console.log('itemIndex: ' + itemIndex);
    deleteItemFromStore(itemIndex);
    renderShoppingList();
  });
}

function deleteItemFromStore(index) {
  STORE.items.splice(index, 1);
}


















function handleSearchSubmit() {
  console.log('entered handleSearchSubmit function');
  $('#js-shopping-list-search-form').submit(function (event) {
    event.preventDefault();
    const searchTerm = $('#shopping-list-search').val();
    searchItems(searchTerm);
    renderShoppingList();
  });
}


function searchItems(searchTerm) {
  STORE.searchTerm = searchTerm;
}

















function handleEditItem() {
  $('.js-shopping-item').dblclick(function () {
    $(this).html('<input class="edit-item" type="text">');
  });

  
  $('.js-shopping-item').on('keyup', function (e) {
    if (e.key === 'Enter') {
      let userValue = $('.edit-item').val();
      let itemIndex = (getItemIndexFromElement(e.currentTarget));
      editNameInStore(itemIndex, userValue);
      renderShoppingList();
    }
  });
}

function editNameInStore(itemIndex, userValue) {
  STORE.items[itemIndex].name = userValue;
}





















function handleHideCheckedItems() {
  $('.checkboxToggle').click(function () {
    console.log('handleHideCheckedItems ran');
    toggleHideCheckedItems();
    renderShoppingList();
  });
}


function toggleHideCheckedItems() {
  STORE.hideChecked = !STORE.hideChecked;
}





// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckedClicked();
  handleDeleteItemClicked();
  handleSearchSubmit();
  handleHideCheckedItems();
  handleEditItem();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);