const getFormFields = require('../../../lib/get-form-fields.js')
const itemsApi = require('./api.js')
const itemsUi = require('./ui.js')
const store = require('../store.js')

// Clear modal forms
const clearModalForms = function () {
  $('#updateInputName').val('')
  $('#updateInputDate').val('')
  document.getElementById('updateCheckActive').checked = false
  console.log('clearModalForms ran')
}

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
  // data-toggle="modal" data-target="#updateModal"
  $('#updateModal').modal('show')
  clearModalForms()
  // debugger
  console.log('open update was clicked')
  console.log('event.target data id is ', $(event.currentTarget).data('id'))
  const dataID = $(event.currentTarget).data('id')
  console.log('dataID is ', dataID)
  const itemData = store.items[dataID - 1]
  console.log('itemData is ', itemData)
  // debugger
  $('#updateInputName').val(itemData.name)
  $('#updateInputDate').val(itemData.date)
  if (itemData.active === true) {
    // $('#updateCheckActive').checked = false
    document.getElementById('updateCheckActive').checked = true
  }
  console.log(document.getElementById('updateCheckActive').checked)
  // debugger
}

// UPDATE ITEM
const onUpdateItem = function (event) {
  console.log('update item was clicked')
  console.log('event is ', event)
  // debugger
  itemsApi.updateOneItem()
    .then(itemsUi.updateOneSuccess)
    .catch(itemsUi.updateOneError)
}

module.exports = {
  onCreateItem,
  onShowAllItems,
  onOpenUpdate,
  onUpdateItem
}
