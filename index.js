const express = require('express');
const bodyParser = require('body-parser');
const middleware = require('./controllers/middleware');
const mainCtrl = require('./controllers/mainCtrl');

const app = express ()

app.use(bodyParser.json())
app.use(middleware.addHeaders)

app.get('/name', mainCtrl.getName)
app.get('/location', mainCtrl.getLocation)
app.get('/occupations', mainCtrl.getOccupations)
app.get('/occupations/latest', mainCtrl.getLatest) // not sure if I should be using a variable here or not
app.get('/hobbies', mainCtrl.getHobbies)
app.get('/hobbies/:type', mainCtrl.getHobbieType)
app.get('/family', mainCtrl.getFamily)
app.get('/family/:gender', mainCtrl.getFamilyGender)
app.get('/restaurants', mainCtrl.getRestaurants)
app.get('/restaurants/:name', mainCtrl.getRestaurantName)
app.put('/name', mainCtrl.updateName)
app.put('/location', mainCtrl.updateLocation)
app.post('/hobbies', mainCtrl.addHobby)
app.post('./occupations', mainCtrl.addOccupation)
app.post('./family', mainCtrl.addFamilyMember)
app.post('./restaurants', mainCtrl.addRestaurant)
app.get('/skillz', mainCtrl.getSkillz)
app.post('/skillz', middleware.generateId, mainCtrl.addSkillz)
app.get('/secrets/:username/:pin', middleware.verifyUser, mainCtrl.getSecrets)



app.listen(3000, function () {
  console.log('now listening at port 3k');
})
