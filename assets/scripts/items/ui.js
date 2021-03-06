const showItemsTemplate = require('../templates/item-box.handlebars')
const showItemsTemplate2 = require('../templates/item-card.handlebars')
const store = require('../store.js')
const itemsApi = require('./api.js')

// Clear modal forms
const clearModalForms = function () {
  $('#updateInputName').val('')
  $('#updateInputDate').val('')
  document.getElementById('updateCheckActive').checked = false
  // console.log('clearModalForms ran')
}

// Clear item-bucket
const clearItemBucket = function () {
  $('#item-bucket').html('')
}

// Chech active status to add active-color and active-label classes
const checkActiveStatus = function (data) {
  // console.log('checkActiveStatus data is ', data)
  // debugger
  if (data.querySelector('.item-active-status').getAttribute('data-status') === 'true') {
    data.classList.add('active-color')
    data.querySelector('.item-active-status').classList.add('glyphicon-star')
    // const labelsSelected = data.getElementsByClassName('item-label')
    // for (let i = 0; i < labelsSelected.length; i++) {
    //   labelsSelected[i].classList.add('active-label')
    // }
  }
}

// Create item div for list of all items
const createAllItemBoxes = function (data) {
  // console.log('createAllItemBoxes data is ', data)
  const showItemsHtml = showItemsTemplate2({ items: data.items })
  $('#item-bucket').append(showItemsHtml)
  const itemsCreated = document.getElementsByClassName('bucket-2')
  // console.log('itemsCreated is ', itemsCreated)
  // converts htmlCollection into array
  const arr = Array.prototype.slice.call(itemsCreated)
  arr.forEach(function (x) {
    checkActiveStatus(x)
  })
}

// Create item div for one item
const createOneItemBox = function (data) {
  // console.log('createOneItemBox data is ', data)
  const showItemsHtml = showItemsTemplate({ items: data })
  // console.log('showItemsHtml is ', showItemsHtml)
  $('#item-bucket').append(showItemsHtml)
  const checkNewItem = $('#item-bucket .bucket').last()
  // console.log('checkNewItem[0] is ', checkNewItem[0])
  checkActiveStatus(checkNewItem[0])
  // debugger
  // console.log('createOneItemBox ran')
}

// Create item success
const createItemSuccess = function (createResponse) {
  console.log('createResponse is ', createResponse)
  createOneItemBox(createResponse)
  // console.log('store.items is ', store.items)
  $('#createItemName').val('')
  $('#createItemDate').val('')
  document.getElementById('createCheckActive').checked = false
  $('#create-new-item-btn').dropdown('toggle')
}

// Create item error
const createItemError = function (createError) {
  // console.log('createError is ', createError)
  $('.create-item-alert-container').html('<div class="alert alert-danger alert-change-pw-error">' +
  '<button type="button" class="close" aria-hidden="true" data-dismiss="alert">&times;</button>' +
      'Create item was unsuccessful </div>')
  $('.alert-change-pw-error').delay(3000).fadeOut()
  // $('.create-item-alert-container').html('Create item unsuccessful').toggleClass('hide').delay(3000).fadeOut()
}

// Remove one item from html
const removeOneItemBox = function (itemID) {
  // console.log('removeOneItemBox itemID is ', itemID)
  // console.log('filter result is ', $('.form-horizontal[data-id=' + itemID + ']'))
  $('.bucket-2[data-id=' + itemID + ']').remove()
  // console.log('removeOneItemBox ran')
  // debugger
}

// Show all items success
const showAllSuccess = function (showAllResponse) {
  console.log('showAllSuccess ran')
  if (showAllResponse.items.length > 0 && $('#item-bucket').html() !== '') {
    $('.full-width-alert-container').html('<div class="alert alert-success alert-user-items-refreshed">' +
    '<button type="button" class="close" aria-hidden="true" data-dismiss="alert">&times;</button>' +
        'Items view refreshed. </div>')
    $('.alert-user-items-refreshed').delay(3000).fadeOut()
  }
  clearItemBucket()
  console.log('showAllResponse is ', showAllResponse)

  // check if user has any items
  if (showAllResponse.items.length === 0) {
    $('.full-width-alert-container').html('<div class="alert alert-success alert-user-items-empty">' +
    '<button type="button" class="close" aria-hidden="true" data-dismiss="alert">&times;</button>' +
        'No items to show. Create a new item to start. </div>')
    $('.alert-user-items-empty').delay(3000).fadeOut()
    // console.log('items is empty')
    // debugger
    return
  }
  createAllItemBoxes(showAllResponse)
  store.items = showAllResponse.items
}

// Show all items error
const showAllError = function (showAllError) {
  // console.log('showAllError is ', showAllError)
}

// Populate modal with one item
const populateItemInModal = function (itemData) {
  $('#updateModal').modal('show')
  clearModalForms()
  // console.log('populateItemInModal itemData is ', itemData)
  const item = itemData
  store.update = {item}
  // console.log('store.update inside populateItemInModal is ', store.update)
  $('#updateInputName').val(itemData.name)
  $('#updateInputDate').val(itemData.date)
  $('#updateInputAddress').val(itemData.address)
  $('#updateInputUrl').val(itemData.url)
  $('#updateInputHours').val(itemData.hours)
  $('#updateInputDuration').val(itemData.duration)
  $('#updateInputCost').val(itemData.cost)
  $('#updateInputTags').val(itemData.tags)
  $('#updateInputNotes').val(itemData.notes)
  if (itemData.active === true) {
    document.getElementById('updateCheckActive').checked = true
  }
  // console.log(document.getElementById('updateCheckActive').checked)
  // debugger
}

// Update one item success
const updateOneSuccess = function (updateResponse) {
  // console.log('updateResponse is ', updateResponse)
  $('#updateModal').modal('toggle')
  itemsApi.showAllItems()
    .then(showAllSuccess)
    .catch(showAllError)
  // const itemID = updateResponse.item.id
  // removeOneItemBox(itemID)
  // createOneItemBox(updateResponse)
  // console.log('updateOneSuccess ran')
}

// Update one item error
const updateOneError = function (updateOneError) {
  // console.log('updateOneError is ', updateOneError)
  $('.form-horizontal[data-id=' + store.update.item.id + ']').append('<div class="alert alert-danger alert-update-error">' +
  '<button type="button" class="close" aria-hidden="true" data-dismiss="alert">&times;</button>' +
      'Update item was unsuccessful. </div>')
  $('.alert-update-error').delay(3000).fadeOut()
}

// create delete confirmation alert
const createDeleteConfAlert = function (itemData) {
  console.log('createDeleteConfAlert itemData is', itemData)
  $('.bucket-2[data-id=' + itemData.id + ']').append('<div class="alert alert-warning fade in item-alert" role="alert">' +
    '<div><a href="#" class="alert-link">Are you sure you want to delete ' +
    itemData.name +
    '?</a></div>' +
    '<br>' +
    '<button type="button" class="btn btn-default delete-item-conf-btn">Delete</button>' +
    '<button type="button" class="btn btn-default" data-dismiss="alert" aria-label="Close">Cancel</button>' +
    '</div>')
  store.delete = itemData.id
  // console.log('store.delete is ', store.delete)
  // debugger
}

// Delete one success
const deleteOneSuccess = function () {
  // console.log('deleteOneSuccess ran')
  removeOneItemBox(store.delete)
  $('.item-alert').alert('close')
  // insert success alert?
  // debugger
}

// Delete one error
const deleteOneError = function () {
  // console.log('deleteOneError ran')
  $('.full-width-alert-container').html('<div class="alert alert-danger alert-delete-item-error">' +
  '<button type="button" class="close" aria-hidden="true" data-dismiss="alert">&times;</button>' +
      'Delete item was unsuccessful. </div>')
  $('.alert-delete-item-error').delay(3000).fadeOut()
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
