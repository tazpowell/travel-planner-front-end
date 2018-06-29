'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth/events')
const itemsEvents = require('./items/events')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // submit forms/button
  $('#sign-up-form').on('submit', authEvents.onSignUp)
  $('#sign-in-form').on('submit', authEvents.onSignIn)
  $('#change-pw-form').on('submit', authEvents.onChangePW)
  $('#sign-out-btn').on('click', authEvents.onSignOut)

  // item forms/buttons
  $('#create-item-form').on('submit', itemsEvents.onCreateItem)
  $('#show-all-items-btn').on('click', itemsEvents.onShowAllItems)
})
