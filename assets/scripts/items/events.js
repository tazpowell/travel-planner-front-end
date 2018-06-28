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

module.exports = {
  onCreateItem
}
