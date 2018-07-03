const store = require('../store')
const itemsUi = require('../items/ui.js')
const itemsApi = require('../items/api.js')
const authApi = require('./api.js')

// Clear form fields
const clearForms = function () {
  $('.form-area input[type=email]').val('')
  $('.form-area input[type=password]').val('')
}

// Clear messages under form fields
const clearAlerts = function () {
  $('.alert').html('')
}

// PASSWORD do not match
const pwNotMatching = function () {
  clearAlerts()
  $('.sign-up-alert-danger').html('Passwords do not match').toggleClass('hide').fadeOut(6000)
  clearForms()
}

// PASSWORD do not match
const pwMatching = function () {
  clearAlerts()
  $('.change-pw-alert-danger').html('New password must be different than old').toggleClass('hide').fadeOut(6000)
  clearForms()
}

// SIGN UP error
const signUpError = function () {
  console.log('signUpError ran')
  clearAlerts()
  $('.sign-up-alert-danger').html('Sign up unsuccessful').toggleClass('hide').fadeOut(6000)
  clearForms()
}

// SIGN UP success
const signUpSuccess = function (signUpResponse) {
  clearAlerts()
  console.log('signUpResponse is ', signUpResponse)
  console.log('sign up success')
  store.credentials.email = signUpResponse.user.email

  // on Sign In after a Sign Up
  const onSignInAfterUp = function () {
    console.log('signing in after a sign up')
    // console.log('store.credentials is', store.credentials)
    authApi.signIn(store)
      .then(signInSuccess)
      .catch(signInError)
  }
  onSignInAfterUp()
  clearForms()
}

// SIGN IN success
const signInSuccess = function (signInResponse) {
  clearAlerts()
  console.log('signInResponse is ', signInResponse)
  store.user = signInResponse.user
  console.log('store.user is ', store.user)
  // console.log('store is ', store)
  $('.navbar-text').html('Signed in as ' + signInResponse.user.email)
  // $('#show-all-items-btn').toggleClass('hide')
  // $('#hide-all-items-btn').toggleClass('hide')
  // $('#create-new-item-btn').toggleClass('hide')
  $('.landing-intro').toggleClass('hide')
  // $('.navbar-signout-changepw').toggleClass('hide')
  $('.sign-in-sign-up-forms').toggleClass('hide')
  $('.navbar-default').toggleClass('hide')
  // $('.alert-success').toggleClass('hide').fadeOut(6000)
  clearForms()
  itemsApi.showAllItems()
    .then(itemsUi.showAllSuccess)
    .catch(itemsUi.showAllError)
}

// SIGN IN error
const signInError = function () {
  clearAlerts()
  $('.sign-in-alert-danger').html('Sign in unsuccessful').toggleClass('hide').fadeOut(6000)
  clearForms()
}

// Change PW success
const changePWSuccess = function () {
  clearAlerts()
  console.log('password successfuly updated')
  $('.alert-success-full-width').html('Password was successfully updated for: ' + store.user.email).toggleClass('hide').fadeOut(6000)
  $('#change-pw-btn').dropdown('toggle')
  clearForms()
}
// Change PW error
const changePWError = function () {
  clearAlerts()
  $('.change-pw-alert-danger').html('Password change failed').toggleClass('hide').fadeOut(6000)
  clearForms()
}

// SIGN OUT success
const signOutSuccess = function () {
  clearAlerts()
  console.log('sign out successful')
  $('.alert-success-full-width').html('Successfully signed out').toggleClass('hide').fadeOut(6000)
  delete store.user
  delete store.update
  delete store.delete
  delete store.items
  // debugger
  clearForms()
  $('.navbar-text').html('')
  $('.landing-intro').toggleClass('hide')
  $('.sign-in-sign-up-forms').toggleClass('hide')
  $('.navbar-default').toggleClass('hide')
  console.log('store is ', store)
  itemsUi.clearItemBucket()
}

// SIGN OUT error
const signOutError = function () {
  clearAlerts()
  $('.alert-danger-full-width').html('Sign out failed').toggleClass('hide').fadeOut(6000)
  clearForms()
}

module.exports = {
  clearForms,
  clearAlerts,
  pwNotMatching,
  pwMatching,
  signUpSuccess,
  signUpError,
  signInSuccess,
  signInError,
  changePWSuccess,
  changePWError,
  signOutSuccess,
  signOutError
}
