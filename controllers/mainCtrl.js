const user = require('../user.js');
const skillz = require('../skillz');
const secrets = require('../superSecret');


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
        if (req.query.order == 'dsc') {
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
        if (req.query.relation) {
            let familyByRelation = user.family.filter((element) => {
                return element.relation == req.query.relation
            })
            return res.status(200).json({
                "family": familyByRelation
            })
        }


        res.status(200).json({
            "family": user.family
        })
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
        if (req.query.rating >= 2) {
            let restaurantsByRating = user.restaurants.filter((element) => {
                return element.rating >= req.query.rating
            })
            return res.status(200).json({
                "restaurants": restaurantsByRating
            })
        }


        res.status(200).json({
            "restaurants": user.restaurants
        })
    },
    getRestaurantName: (req, res, next) => {
        console.log(req.params.name);
        if (req.params.name) {
            let restaurantByName = user.restaurants.filter((element) => {
                return element.name == req.params.name
            })
            return res.status(200).json({
                "restaurant": restaurantByName
            })
        }
        res.status(404)
    },
    updateName: (req, res, next) => {
        console.log(req.body);
        user.name = req.body.name
        res.status(200).json({
            "name": user.name
        })
    },
    updateLocation: (req, res, next) => {
        user.location = req.body.location
        res.status(200).json({
            "location": user.location
        })
    },
    addHobby: (req, res, next) => {
        console.log(req.body);
        user.hobbies.push(req.body)
        res.status(200).json(user.hobbies)
    },
    addOccupation: (req, res, next) => {
        user.occupations.push(req.body)
        res.status(200).json(user.occupations)
    },
    addFamilyMember: (req, res, next) => {
        user.family.push(req.body)
        res.status(200).json(user.family)
    },
    addRestaurant: (req, res, next) => {
        user.restaurants.push(req.body)
        res.status(200).json(user.restaurants)
    },
    getSkillz: (req, res, next) => {
        console.log(req.query.experience);
        if (req.query.experience) {
            let filteredSkillz = skillz.filter((val) => {
                return val.experience == req.query.experience
            })
            return res.status(200).json(filteredSkillz)
        }
        res.status(200).json({
            skillz
        })
    },
    addSkillz: (req, res, next) => {
      let newSkill = req.body
      newSkill.id = req.body.id
      skillz.push(newSkill)
      return res.status(200).json(skillz)

    },
    getSecrets: (req, res, next) => {
      res.status(200).json(secrets)
    }
}
