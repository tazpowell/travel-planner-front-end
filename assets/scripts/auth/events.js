'use strict'
const authUi = require('./ui.js')
const authApi = require('./api.js')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields.js')

// on Sign Up
const onSignUp = function (event) {
  event.preventDefault()
  // console.log('the sign up form was submitted')
  const data = getFormFields(event.target)
  // console.log('data is', data)
  // check if passwords matches
  if (data.credentials.password === data.credentials.password_confirmation) {
  } else {
    authUi.pwNotMatching()
    // console.log('passwords do not match')
    return
  }
  store.credentials = {}
  store.credentials.password = data.credentials.password
  // api
  authApi.signUp(data)
    .then(authUi.signUpSuccess)
    .catch(authUi.signUpError)
}

// on Sign In
const onSignIn = function (event) {
  event.preventDefault()
  // console.log('the sign in form was submitted')
  const data = getFormFields(event.target)
  // console.log('sign in data is ', data)
  // api
  authApi.signIn(data)
    .then(authUi.signInSuccess)
    .catch(authUi.signInError)
}

// on Change PW
const onChangePW = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  if (data.passwords.old !== data.passwords.new) {
  } else {
    authUi.pwMatching()
    return
  }
  // api
  authApi.changePW(data)
    .then(authUi.changePWSuccess)
    .catch(authUi.changePWError)
}

// SIGN OUT
const onSignOut = function (event) {
  event.preventDefault()
  // api
  authApi.signOut()
    .then(authUi.signOutSuccess)
    .catch(authUi.signOutError)
}

// whatever comes after the equals is what's passed
module.exports = {
  onSignUp,
  onSignIn,
  onChangePW,
  onSignOut
}
