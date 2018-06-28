
// Create item success
const createItemSuccess = function (createResponse) {
  console.log('createResponse is ', createResponse)
}

// Create item error
const createItemError = function (createError) {
  console.log('createError is ', createError)
}

module.exports = {
  createItemSuccess,
  createItemError
}
