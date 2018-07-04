# TravelBox itinerary organizer
- Deployed front-end: https://tazukopowell.com/travel-planner-front-end/
- Deployed back-end:  https://aqueous-forest-96537.herokuapp.com
- Back-end repo: https://github.com/tazpowell/travel-planner-back-end

## Front-end
This repo is the front-end for my TravelBox web app.
It is a simple organizer for saving trip itineray items. Users can create and delete items associated with their account and update the fields. Items are color coded by whether they are part of the final trip plan or not.

## Technologies
JavaScript, jQuery, AJAX, Ruby on Rails, Ruby, HTML, CSS

## Development Process
#### Planning
- Review project requirements and select project idea
- Create user stories, ERD, and wireframe

#### Set up
- Create front and back end repos
- Deploy front end to GitHub pages
- Deploy back end to Heroku

#### API
- Scaffold 'Items' resource and add relationship to User resource
- Test end poins with curl scripts

#### Client
- Test api with curl scripts
- Create & test functions to send requests to API
- Create forms and buttons for User (sign-up, sign-in, change-pw, sign-out)
- Create forms and buttons for Items (create, show, update, delete)

## Problem Solving
- Used console logs and debugger to troubleshoot bugs
- Created a to do list of features and bugs, and worked through them one at a time
- Commited after resolving an issue or completing a task
- Opened GitHub issue on the general project repo to get instructor's help when googling for references and solutions did not yield desired results

## Future Iterations
- Rebuild nav so it collapses correctly in mobile widths
- Add additional fields in Items resource
- Update visual layout of an item card
- Add sort functionality for items (by date, active status, categories)
- Rename 'Active' status to make it easy to understand its meaning (such as 'Add to trip')

V2:
- Create join table named 'Days' that would allow items to be grouped into a 'day' within a trip
- Add a drag and drop functionality to move items in and out of a day

V3:
- Create a 'Trips' resource that would hold multiple 'days'

## Wireframes & User Stories
[Wireframe](https://drive.google.com/file/d/1uOK6jkrRa2GQpEcej5ihhd2EI9dDDhxn/view?usp=sharing)

Version 1
### As an unregisterd user, I want to:
- sign up with email and password
- be told when my passwords do not match
- after a successful sign up, be automatically signed in

### As a registered user, I want to:
- sign in with my email and password
- be shown an error message if my sign in unsuccessful

### After a successful sign-in, I want to:
show/hide my items:
- automatically see all of my items
- have the ability to hide all my items from view
- re-display all of my items after hiding them
- be alerted when I have no items to hide or show

sign-out:
- sign out when I finish my session
- be shown an error messsage when sign out is unsuccessful

change password:
- change my password to a new password
- be shown an error if my old password is same as new password
- be shown an error message when change password is unsuccessful

items:
- create a new item and view it immediately
- edit an item's name, date, or active status
- delete an item
