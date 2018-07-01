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
}

// SHOW ALL ITEMS from server
const onShowAllItems = function (event) {
  console.log('show all items was clicked')
  itemsApi.showAllItems()
    .then(itemsUi.showAllSuccess)
    .catch(itemsUi.showAllError)
}

// SHOW ONE ITEM
// const onShowOneItem = function (event)

// OPEN UPDATE MODAL
const onOpenUpdate = function (event) {
  console.log('open update was clicked')
  // console.log('event.target data id is ', $(event.currentTarget).data('id'))
  const dataID = $(event.currentTarget.form).data('id')
  console.log('dataID is ', dataID)
  const itemData = store.items.find(x => x.id === dataID)
  console.log('itemData is ', itemData)
  // debugger
  itemsUi.populateItemInModal(itemData)
}

// OPEN DELETE CONFIRMATION
const onOpenDelete = function (event) {
  console.log('delete was clicked')
  const dataID = $(event.currentTarget.form).data('id')
  console.log('dataID is ', dataID)
  const itemData = store.items.find(x => x.id === dataID)
  console.log('itemData is ', itemData)
  itemsUi.createDeleteConfAlert(itemData)
  // debugger
}

// DELETE ITEM
const onConfirmDeleteItem = function (event) {
  event.preventDefault()
  console.log('confirm delete was clicked')
  console.log('event is ', event)
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
  console.log('event is ', event)
  const data = getFormFields(event.target)
  // console.log('data is ', data)
  if (!('active' in data.item)) {
    data.item.active = false
  }
  console.log('data is ', data)
  // debugger
  store.update.item.name = data.item.name
  store.update.item.date = data.item.date
  store.update.item.active = data.item.active
  console.log('store.update is', store.update)
  // debugger
  itemsApi.updateOneItem(store.update)
    .then(itemsUi.updateOneSuccess)
    .catch(itemsUi.updateOneError)
}

module.exports = {
  onCreateItem,
  onShowAllItems,
  onOpenUpdate,
  onOpenDelete,
  onUpdateItem,
  onConfirmDeleteItem
}
