const getFormFields = require('../../../lib/get-form-fields.js')
const itemsApi = require('./api.js')
const itemsUi = require('./ui.js')
const store = require('../store.js')

// on Create Item
const onCreateItem = function (event) {
  event.preventDefault()
  console.log('the create item form was submitted')
  const data = getFormFields(event.target)
  if (!('active' in data.item)) {
    data.item.active = false
  }
  console.log('data is ', data)
  // debugger
  // api
  itemsApi.createItem(data)
    .then(itemsUi.createItemSuccess)
    .catch(itemsUi.createItemError)
    .then(onShowAllItems)
}

// SHOW ALL ITEMS from server
const onShowAllItems = function (event) {
  // console.log('show all items was clicked')
  itemsApi.showAllItems()
    .then(itemsUi.showAllSuccess)
    .catch(itemsUi.showAllError)
}

// HIDE ALL ITEMS
const onHideAllItems = function () {
  // console.log('onHideAllItems ran')
  // check if user has any items
  if ($.trim($('#item-bucket').html()) === '') {
    $('.full-width-alert-container').html('<div class="alert alert-success alert-user-items-empty">' +
    '<button type="button" class="close" aria-hidden="true" data-dismiss="alert">&times;</button>' +
        'No items to hide. </div>')
    $('.alert-user-items-empty').delay(3000).fadeOut()
    // console.log('items is empty')
    // debugger
    return
  }
  itemsUi.clearItemBucket()
}

// OPEN CREATE DROPDOWN
const onOpenCreateItem = function (event) {
  $('.create-dropdown').dropdown('toggle')
  // console.log('onOpenCreateItem ran')
}

// OPEN UPDATE MODAL
const onOpenUpdate = function (event) {
  console.log('open update was clicked')
  let dataID = event.currentTarget.parentElement.parentElement.getAttribute('data-id')
  console.log('dataID is ', dataID)
  dataID = Number(dataID)
  const itemData = store.items.find(x => x.id === dataID)
  console.log('itemData is ', itemData)
  // debugger
  itemsUi.populateItemInModal(itemData)
}

// OPEN DELETE CONFIRMATION
const onOpenDelete = function (event) {
  // console.log('delete was clicked')
  let dataID = event.currentTarget.parentElement.parentElement.getAttribute('data-id')
  // console.log('dataID is ', dataID)
  dataID = Number(dataID)
  const itemData = store.items.find(x => x.id === dataID)
  // console.log('itemData is ', itemData)
  itemsUi.createDeleteConfAlert(itemData)
  // debugger
}

// DELETE ITEM
const onConfirmDeleteItem = function (event) {
  event.preventDefault()
  console.log('confirm delete was clicked')
  // console.log('event is ', event)
  console.log('store.delete is ', store.delete)
  itemsApi.deleteOneItem(store.delete)
    .then(itemsUi.deleteOneSuccess)
    .catch(itemsUi.deleteOneError)
  // debugger
}

// UPDATE ITEM
const onUpdateItem = function (event) {
  event.preventDefault()
  console.log('update item was clicked')
  // console.log('event is ', event)
  const data = getFormFields(event.target)
  console.log('data is ', data)
  if (!('active' in data.item)) {
    data.item.active = false
  }
  console.log('data is ', data)
  // debugger
  store.update.item.name = data.item.name
  store.update.item.date = data.item.date
  store.update.item.active = data.item.active
  store.update.item.address = data.item.address
  store.update.item.url = data.item.url
  store.update.item.hours = data.item.hours
  store.update.item.duration = data.item.duration
  store.update.item.cost = data.item.cost
  store.update.item.tags = data.item.tags
  store.update.item.notes = data.item.notes
  console.log('store.update is', store.update)
  // debugger
  itemsApi.updateOneItem(store.update)
    .then(itemsUi.updateOneSuccess)
    .catch(itemsUi.updateOneError)
}

module.exports = {
  onCreateItem,
  onShowAllItems,
  onHideAllItems,
  onOpenCreateItem,
  onOpenUpdate,
  onOpenDelete,
  onUpdateItem,
  onConfirmDeleteItem
}
