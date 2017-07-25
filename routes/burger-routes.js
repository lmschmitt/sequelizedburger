var express = require('express');
var db = require("../models");
var router = express.Router();

router.get('/', function(req, res) {
    res.redirect('/index')
});

//Index page
router.get('/index', function (req, res) {

  db.burgers.findAll({
  }).then(function(data){

    var hbsObject = { burgers: data };
    
    res.render('index', hbsObject);

  })

});

//Post route for new burger
router.post("/insert", function(req, res) {
    //  console.log (req.body.name)
  db.burgers.create(
    {
      name: req.body.name,
      devoured: false
    }
   
  ).then(function(){
    // After the burger is added to the database, refresh the page
    res.redirect('/index');

  });

});

router.post("/update/:id", function(req, res) {
  db.burgers.update(
    { 
        devoured: true
    }, 
        {
        where: { id: req.params.id }
        }
    ).then(function(data) {
    	res.redirect('/index')
    });
});






module.exports = router;


