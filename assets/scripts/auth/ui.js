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
  console.log('clearAlerts ran')
  $('.alert').html('')
}

// PASSWORD do not match
const pwNotMatching = function () {
  clearAlerts()
  $('.sign-up-alert-container').html('<div class="alert alert-danger alert-sign-up-error">' +
      'Passwords do not match </div>')
  $('.alert-sign-up-error').delay(3000).fadeOut()
  // $('.sign-up-alert-danger').html('Passwords do not match').toggleClass('hide').delay(3000).fadeOut()
  clearForms()
}

// PASSWORD do not match
const pwMatching = function () {
  clearAlerts()
  $('.change-pw-alert-container').html('<div class="alert alert-danger alert-change-pw-error">' +
      'New password must be different than old </div>')
  $('.alert-change-pw-error').delay(3000).fadeOut()
  // $('.change-pw-alert-danger').html('New password must be different than old').toggleClass('hide').delay(3000).fadeOut()
  clearForms()
}

// SIGN UP error
const signUpError = function () {
  // console.log('signUpError ran')
  clearAlerts()
  $('.sign-up-alert-container').html('<div class="alert alert-danger alert-sign-up-error">' +
      'Sign up was unsuccessful </div>')
  $('.alert-sign-up-error').delay(3000).fadeOut()
  clearForms()
}

// SIGN UP success
const signUpSuccess = function (signUpResponse) {
  clearAlerts()
  // console.log('signUpResponse is ', signUpResponse)
  // console.log('sign up success')
  store.credentials.email = signUpResponse.user.email

  // on Sign In after a Sign Up
  const onSignInAfterUp = function () {
    // console.log('signing in after a sign up')
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
  // console.log('signInResponse is ', signInResponse)
  store.user = signInResponse.user
  // console.log('store.user is ', store.user)
  // console.log('store is ', store)
  $('.navbar-text').html('Signed in as ' + signInResponse.user.email)
  $('.landing-intro').toggleClass('hide')
  $('.sign-in-sign-up-forms').toggleClass('hide')
  $('.navbar-default').toggleClass('hide')
  $('.full-width-alert-container').toggleClass('landing-view-only')
  clearForms()
  itemsApi.showAllItems()
    .then(itemsUi.showAllSuccess)
    .catch(itemsUi.showAllError)
}

// SIGN IN error
const signInError = function () {
  clearAlerts()
  $('.sign-in-alert-container').html('<div class="alert alert-danger alert-sign-in-error">' +
      'Sign in was unsuccessful </div>')
  $('.alert-sign-in-error').delay(3000).fadeOut()
  clearForms()
}

// Change PW success
const changePWSuccess = function () {
  clearAlerts()
  // console.log('password successfuly updated')
  $('.full-width-alert-container').html('<div class="alert alert-success alert-change-pw-success">' +
  '<button type="button" class="close" aria-hidden="true" data-dismiss="alert">&times;</button>' +
      'Password was successfully updated for: ' + store.user.email +
      '</div>')
  $('.alert-change-pw-success').delay(3000).fadeOut()
  $('#change-pw-btn').dropdown('toggle')
  clearForms()
}
// Change PW error
const changePWError = function () {
  clearAlerts()
  $('.change-pw-alert-container').html('<div class="alert alert-danger alert-change-pw-error">' +
      'Password change was unsuccessful </div>')
  $('.alert-change-pw-error').delay(3000).fadeOut()
  // $('.change-pw-alert-danger').html('Password change failed').toggleClass('hide').delay(3000).fadeOut()
  clearForms()
}

// SIGN OUT success
const signOutSuccess = function () {
  clearAlerts()
  // console.log('sign out successful')
  $('.full-width-alert-container').html('<div class="alert alert-success alert-sign-out-success full-width-alert">' +
  '<button type="button" class="close" aria-hidden="true" data-dismiss="alert">&times;</button>' +
      'Signed out successfully. </div>')
  $('.alert-sign-out-success').delay(3000).fadeOut()
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
  $('.full-width-alert-container').toggleClass('landing-view-only')
  // console.log('store is ', store)
  itemsUi.clearItemBucket()
}

// SIGN OUT error
const signOutError = function () {
  clearAlerts()
  $('.full-width-alert-container').html('<div class="alert alert-danger alert-sign-out-error">' +
  '<button type="button" class="close" aria-hidden="true" data-dismiss="alert">&times;</button>' +
      'Failed to sign out. </div>')
  $('.alert-sign-out-error').delay(3000).fadeOut()
  // $('.alert-danger-full-width').html('Sign out failed').toggleClass('hide').delay(3000).fadeOut()
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
