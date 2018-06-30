const showItemsTemplate = require('../templates/item-box.handlebars')
const store = require('../store.js')

// Create item success
const createItemSuccess = function (createResponse) {
  console.log('createResponse is ', createResponse)
}

// Create item error
const createItemError = function (createError) {
  console.log('createError is ', createError)
}

// CREATE html table from one JSON object
const createTable = function (json) {
  let bodyRows = ''
  // create bodyrows
  bodyRows += '<tr>'
  // bodyRows += '<td><button type="button" class="btn-line clickable">View</button></td>'
  bodyRows += '<td>' + json.id + '</td>'
  bodyRows += '<td>' + json.name + '</td>'
  bodyRows += '<td>' + json.date + '</td>'
  bodyRows += '<td>' + json.active + '</td>'
  bodyRows += '</tr>'
  // return table html
  return '<div><table class="table" data-id="' +
          json.id + '"><thead><tr></tr></thead><tbody>' +
          bodyRows + '</tbody></table></div>'
}

// create item div from one JSON object
const createItemBox = function (data) {
  console.log('data is ', data)
  const showItemsHtml = showItemsTemplate({ items: data.items })
  $('#item-bucket').append(showItemsHtml)
}

// Show all items success
const showAllSuccess = function (showAllResponse) {
  console.log('showAllResponse is ', showAllResponse)
  createItemBox(showAllResponse)
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

// Update one item success
const updateOneSuccess = function (updateResponse) {
  console.log('updateResponse is ', updateResponse)
}

// Update one item error
const updateOneError = function (updateOneError) {
  console.log('updateOneError is ', updateOneError)
}

module.exports = {
  createItemSuccess,
  createItemError,
  createItemBox,
  showAllSuccess,
  showAllError,
  updateOneSuccess,
  updateOneError,
  createTable
}
