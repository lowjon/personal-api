const user = require('../user.js');

// module.exports = {
//   index: function (req, res, next) {
//     res.status(200).json(cars)
//   },
//   show: function (req, res, next) {
//     let carId = parseInt(req.params.id)
//     res.status(200).json(cars.carId)
//   },
//   create: function (req, res, next) {
//     cars.push(req.body)
//     res.status(200).json(cars)
//   },
//   update: function (req, res, next) {
//     // from req.body
//     let carId = parseInt(req.params.id)
//     cars.splice(carId, 1, req.body)[0] // ask why we have this zero in bracket notation
//     res.status(200).json(cars)
//
//   },
//   destroy: function (req, res, next) {
//     let splicedCars = cars.splice(req.params.id, 1)
//   }
//
// }


module.exports = {
    getName: (req, res, next) => {
        // console.log(res.user.name)
        res.status(200).json({
            "name": user.name
        })

    },
    getLocation: (req, res, next) => {
        res.status(200).json({
            "location": user.location
        })
    },
    getOccupations: (req, res, next) => { // add an ordering query to the occupations
        console.log(req.query.order)
        if (req.query.order == 'dsc'){
          return res.status(200).json(user.occupations.sort())
        } else if (req.query.order === 'asc') {
          return res.status(200).json(user.occupations.sort().reverse())
        }

        res.status(200).json({
            "occupations": user.occupations
        })
    },
    getLatest: (req, res, next) => {
        res.status(200).json({
            "latestOccupation": user.occupations.slice(user.occupations.length - 1)
        })
    },
    getHobbies: (req, res, next) => {
        res.status(200).json({
            "hobbies": user.hobbies
        })
    },
    getHobbieType: (req, res, next) => {
      let type = user.hobbies.type
      console.log(req.params.type);
      let hobbiesByType = user.hobbies.filter((element) => {
          return (element.type == req.params.type)
      })
        res.status(200).json({
            "hobbies": hobbiesByType
        })
    },
    getFamily: (req, res, next) => {
      console.log(req.query);
      if (req.query.relation){
        let familyByRelation = user.family.filter((element) => {
          return element.relation == req.query.relation
        })
        return res.status(200).json({"family": familyByRelation})
      }


      res.status(200).json({"family": user.family})
    },
    getFamilyGender: (req, res, next) => {
      let gender = user.family.gender
      console.log(req.params.gender);
      let familyByGender = user.family.filter((element) => {
          return (element.gender == req.params.gender)
      })
        res.status(200).json({
            "family": familyByGender
        })
    },
    getRestaurants: (req, res, next) => {
      console.log(req.query.rating);
      if (req.query.rating >= 2){
        let restaurantsByRating = user.restaurants.filter((element) => {
          return element.rating >= req.query.rating
        })
        return res.status(200).json({"restaurants": restaurantsByRating})
      }


      res.status(200).json({
          "restaurants": user.restaurants
      })
    },
    getRestaurantName: (req, res, next) => {
      console.log(req.params.name);
      if (req.params.name){
        let restaurantByName = user.restaurants.filter((element) => {
          return element.name == req.params.name
        })
        return res.status(200).json({"restaurant": restaurantByName})
      }
      res.status(404)
    },
    updateName: (req, res, next) => {
      console.log(req.body);
      user.name = req.body.name
      res.status(200).json({"name": user.name})
    },
    updateLocation: (req, res, next) => {
      user.location = req.body.location
      res.status(200).json({"location": user.location})
    },
    addHobbie: (req, res, next) => {
      user.hobbies.push(req.body.hobbie)
    },
    addOccupation: (req, res, next) => {

    },
    addFamilyMember: (req, res, next) => {

    },
    addRestaurant: (req, res, next) => {

    },
}
