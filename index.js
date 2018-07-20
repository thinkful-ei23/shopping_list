'use strict';
/* global $ */


const STORE = [{
  name: 'apples',
  checked: false
},
{
  name: 'oranges',
  checked: false
},
{
  name: 'milk',
  checked: true
},
{
  name: 'bread',
  checked: false
}
];

function generateItemElement(item, itemIndex, template) {
  return `
    <li>${item.name}</li>`;
}

function generateShoppingItemsString(shoppingList) {
  console.log("Generating shopping list element");

  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  
  return items.join('');
}

function renderShoppingList() {
  // this function will be responsible for rendering the shopping list in
  // the DOM
  console.log('renderShoppingList ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);

}

function handleNewItemSubmit() {
  // this function will be responsible for when users add a new shopping list item
  console.log('handleNewItemSubmit ran');
}

function handleItemCheckedClicked() {
  // this function will be responsible for when users click the "check" button on
  // a shopping list item.
  console.log('handleItemCheckedClicked');
}

function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item
  console.log('handleDeleteItemClicked');
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

}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);