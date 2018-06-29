const getFormFields = require('../../../lib/get-form-fields.js')
const itemsApi = require('./api.js')
const itemsUi = require('./ui.js')

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

// OPEN UPDATE MODAL
const onOpenUpdate = function (event) {
  console.log('update item was clicked')
  console.log('event.target data id is ', $(event.target).data('id'))
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
