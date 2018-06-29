
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

// Show all items success
const showAllSuccess = function (showAllResponse) {
  console.log('showAllResponse is ', showAllResponse)
  // debugger
  for (let i = 0; i < showAllResponse.items.length; i++) {
    const table = createTable(showAllResponse.items[i])
    console.log('table is ', table)
    $('#items-list').append(table)
  }

}

// Show all items error
const showAllError = function (showAllError) {
  console.log('showAllError is ', showAllError)
}



module.exports = {
  createItemSuccess,
  createItemError,
  showAllSuccess,
  showAllError,
  createTable
}
