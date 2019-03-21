var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get("/register", function(req, res, next){
  res.render('register')
})

router.post("/register", function(req, res, next){
  res.send(register_user(request));
})


function register_user(request){
  
}


module.exports = router;
