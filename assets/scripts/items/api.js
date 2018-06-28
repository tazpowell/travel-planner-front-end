'use strict'
const config = require('../config.js')
const store = require('../store')

// CREATE
const createItem = function (data) {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/items',
    data: data,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createItem
}
