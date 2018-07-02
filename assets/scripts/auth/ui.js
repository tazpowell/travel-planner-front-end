const store = require('../store')
const itemsUi = require('../items/ui.js')

// Clear form fields
const clearForms = function () {
  $('.form-area input[type=email]').val('')
  $('.form-area input[type=password]').val('')
}

// Clear messages under form fields
const clearMessages = function () {
  $('.ui-message').html('')
}

// SIGN UP error
const signUpError = function () {
  clearMessages()
  $('#sign-up-msg').html('Sign up unsuccessful').css('color', '#DE3A0D')
  clearForms()
}

// SIGN UP success
const signUpSuccess = function (signUpResponse) {
  clearMessages()
  console.log('signUpResponse is ', signUpResponse)
  console.log('sign up success')
  // store.credentials.email = signUpResponse.user.email
  // $('#sign-out-msg').html('')
  // on Sign In after a Sign Up
  // const onSignInAfterUp = function () {
  //   console.log('signing in after a sign up')
  //   // console.log('store.credentials is', store.credentials)
  //   authApi.signIn(store)
  //     .then(signInSuccess)
  //     .catch(signInError)
  // }
  // onSignInAfterUp()
  clearForms()
}

// SIGN IN success
const signInSuccess = function (signInResponse) {
  clearMessages()
  console.log('signInResponse is ', signInResponse)
  store.user = signInResponse.user
  console.log('store.user is ', store.user)
  // console.log('store is ', store)
  $('.navbar-text').html('Signed in as ' + signInResponse.user.email)
  $('#show-all-items-btn').toggleClass('hide')
  $('#create-new-item-btn').toggleClass('hide')
  // $('#create-item-form').toggleClass('hide')
  $('.landing-intro').toggleClass('hide')
  $('.navbar-signout-changepw').toggleClass('hide')
  $('.sign-in-sign-up-forms').toggleClass('hide')
  $('.navbar-default').toggleClass('hide')
  clearForms()
}

// SIGN IN error
const signInError = function () {
  clearMessages()
  $('#sign-in-msg').html('Sign in unsuccessful ').css('color', '#DE3A0D')
  clearForms()
}

// Change PW success
const changePWSuccess = function () {
  clearMessages()
  console.log('password successfuly updated')
  // $('#change-pw-msg').html('Password was successfully updated for: ' + store.user.email).css('color', '#005f19')
  $('#change-pw-btn').dropdown('toggle')
  clearForms()
}
// Change PW error
const changePWError = function () {
  clearMessages()
  $('#change-pw-msg').html('Password change failed').css('color', '#DE3A0D')
  clearForms()
}

// SIGN OUT success
const signOutSuccess = function () {
  // clearMessages()
  console.log('sign out successful')
  // $('#sign-out-msg').html('Successfully signed out as: ' + store.user.email).css('color', '#005f19')
  delete store.user
  delete store.update
  delete store.delete
  delete store.items
  // debugger
  // store.clear()
  clearForms()
  clearMessages()
  $('.navbar-text').html('')
  $('#show-all-items-btn').toggleClass('hide')
  // $('#create-item-form').toggleClass('hide')
  $('.landing-intro').toggleClass('hide')
  $('.navbar-signout-changepw').toggleClass('hide')
  $('.sign-in-sign-up-forms').toggleClass('hide')
  $('#create-new-item-btn').toggleClass('hide')
  $('.navbar-default').toggleClass('hide')
  console.log('store is ', store)
  itemsUi.clearItemBucket()
}

// SIGN OUT error
const signOutError = function () {
  clearMessages()
  $('#sign-out-msg').html('Sign out failed').css('color', '#DE3A0D')
  clearForms()
}

module.exports = {
  clearForms,
  clearMessages,
  signUpSuccess,
  signUpError,
  signInSuccess,
  signInError,
  changePWSuccess,
  changePWError,
  signOutSuccess,
  signOutError
}
