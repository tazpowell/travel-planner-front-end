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

// GET ALL
const showAllItems = function () {
  return $.ajax({
    method: 'GET',
    url: config.apiUrl + '/items',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// UPDATE ONE
const updateOneItem = function (data) {
  console.log('updateOneItem data is', data)
  return $.ajax({
    method: 'PATCH',
    url: config.apiUrl + '/items/' + data.item.id,
    data: data,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// DELETE ONE
const deleteOneItem = function (id) {
  return $.ajax({
    method: 'DELETE',
    url: config.apiUrl + '/items/' + id,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createItem,
  showAllItems,
  updateOneItem,
  deleteOneItem
}
