const store = require('../store')

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
  // console.log('signInResponse is ', signInResponse)
  store.user = signInResponse.user
  console.log('store.user is ', store.user)
  // console.log('store is ', store)
  $('#sign-in-msg').html('Signed in as ' + signInResponse.user.email).css('color', '#005f19')
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
  $('#change-pw-msg').html('Password was successfully updated for: ' + store.user.email).css('color', '#005f19')
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
  $('#sign-out-msg').html('Successfully signed out as: ' + store.user.email).css('color', '#005f19')
  delete store.user
  clearForms()
  clearMessages()
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
