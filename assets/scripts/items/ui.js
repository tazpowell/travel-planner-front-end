const showItemsTemplate = require('../templates/item-box.handlebars')
const store = require('../store.js')

// Clear modal forms
const clearModalForms = function () {
  $('#updateInputName').val('')
  $('#updateInputDate').val('')
  document.getElementById('updateCheckActive').checked = false
  console.log('clearModalForms ran')
}

// Clear item-bucket
const clearItemBucket = function () {
  $('#item-bucket').html('')
}

// Create item div for list of all items
const createAllItemBoxes = function (data) {
  console.log('data is ', data)
  const showItemsHtml = showItemsTemplate({ items: data.items })
  $('#item-bucket').append(showItemsHtml)
}

// Create item div for one item
const createOneItemBox = function (data) {
  console.log('createOneItemBox data is ', data)
  const showItemsHtml = showItemsTemplate({ items: data })
  $('#item-bucket').append(showItemsHtml)
  console.log('createOneItemBox ran')
}

// Create item success
const createItemSuccess = function (createResponse) {
  console.log('createResponse is ', createResponse)
  createOneItemBox(createResponse)
  $('#createItemName').val('')
  $('#createItemDate').val('')
  document.getElementById('createCheckActive').checked = false
  $('.create-dropdown').dropdown('toggle')
}

// Create item error
const createItemError = function (createError) {
  console.log('createError is ', createError)
}

// Remove one item from html
const removeOneItemBox = function (itemID) {
  console.log('removeOneItemBox itemID is ', itemID)
  console.log('filter result is ', $('.form-horizontal[data-id=' + itemID + ']'))
  $('.form-horizontal[data-id=' + itemID + ']').remove()
  console.log('removeOneItemBox ran')
  // debugger
}

// Show all items success
const showAllSuccess = function (showAllResponse) {
  console.log('showAllSuccess ran')
  clearItemBucket()
  console.log('showAllResponse is ', showAllResponse)
  createAllItemBoxes(showAllResponse)
  store.items = showAllResponse.items
  console.log('store.items is ', store.items)
  // debugger
  // for (let i = 0; i < showAllResponse.items.length; i++) {
  //   const table = createTable(showAllResponse.items[i])
  //   console.log('table is ', table)
  //   $('#items-list').append(table)
  // }
}

// Show all items error
const showAllError = function (showAllError) {
  console.log('showAllError is ', showAllError)
}

// Show one item
// const showOneItemSuccess = function (itemData) {
//  console.log('show one item success')
//  $('.form-horizontal').data('id')
// }

// Populate modal with one item
const populateItemInModal = function (itemData) {
  $('#updateModal').modal('show')
  clearModalForms()
  console.log('populateItemInModal itemData is ', itemData)
  const item = itemData
  store.update = {item}
  console.log('store.update inside populateItemInModal is ', store.update)
  $('#updateInputName').val(itemData.name)
  $('#updateInputDate').val(itemData.date)
  if (itemData.active === true) {
    document.getElementById('updateCheckActive').checked = true
  }
  console.log(document.getElementById('updateCheckActive').checked)
  // debugger
}

// Update one item success
const updateOneSuccess = function (updateResponse) {
  console.log('updateResponse is ', updateResponse)
  $('#updateModal').modal('toggle')
  // showAllSuccess()
  const itemID = updateResponse.item.id
  removeOneItemBox(itemID)
  createOneItemBox(updateResponse)
  console.log('updateOneSuccess ran')
}

// Update one item error
const updateOneError = function (updateOneError) {
  console.log('updateOneError is ', updateOneError)
}

// create delete confirmation alert
const createDeleteConfAlert = function (itemData) {
  console.log('createDeleteConfAlert itemData is', itemData)
  $('.form-horizontal[data-id=' + itemData.id + ']').append('<div class="alert alert-warning fade in item-alert" role="alert">' +
    '<div><a href="#" class="alert-link">Are you sure you want to delete ' +
    itemData.name +
    '?</a></div>' +
    '<br>' +
    '<button type="button" class="btn btn-default delete-item-conf-btn">Delete</button>' +
    '<button type="button" class="btn btn-default" data-dismiss="alert" aria-label="Close">Cancel</button>' +
    '</div>')
  store.delete = itemData.id
  console.log('store.delete is ', store.delete)
  // debugger
}

// Delete one success
const deleteOneSuccess = function () {
  console.log('deleteOneSuccess ran')
  removeOneItemBox(store.delete)
  $('.item-alert').alert('close')
  // insert success alert?
  // debugger
}

// Delete one error
const deleteOneError = function () {
  console.log('deleteOneError ran')
}

module.exports = {
  clearModalForms,
  clearItemBucket,
  createItemSuccess,
  createItemError,
  createAllItemBoxes,
  createOneItemBox,
  removeOneItemBox,
  showAllSuccess,
  showAllError,
  populateItemInModal,
  updateOneSuccess,
  updateOneError,
  createDeleteConfAlert,
  deleteOneSuccess,
  deleteOneError
}
