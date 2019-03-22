var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var passwordHash = require('password-hash');
var user_table = "users_detail";



var con = mysql.createConnection({
  host: "localhost",
  user: "me",
  password: "Javesh@13"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

function alert_response(message){
  return '<script>alert("'+message+'");</script>';
}//generates formatted alert_response for post


function user_exist(email){
  con.query("select * from"+user_table+" where email = " + email + " ;", function (err, result) {
   
    if (err) {
      console.log("user_exist:Error checking user");
      return false;
    }
    console.log("Success user check");
    console.log(result);
    return (result.size() == 0)?false:true;
    
  });
}  //checks whether user exist or not
function register_user(email, password){
  var sql = "INSERT INTO"+user_table+" (email, password) VALUES ?";
  var values = [
    [email, passwordHash.generate('password')],
  ];
  con.query(sql, [values], function (err, result) {
    if (err) {
      console.log("register_user:connection_error");
      return false;
    }
    console.log("Number of records inserted: " + result.affectedRows);
    return true;
  });
}//registers_user in database

var chain_degbug = true;

//////////////////////////////////////////////////////////
/* GET home page. */
router.get('/', function(req, res, next) {
  if(chain_debug) console.log("get / ");
  res.render('index');
});

router.get("/register", function(req, res, next){
  res.render('register')
});

router.post("/register", function(req, res, next){
  console.log(req.body);
  var email = req.body.email;
  var password = req.body.password;
  var confirm_password = req.body.confirmPassword;
  console.log(email);
  console.log(password);
  console.log(confirm_password);

  if(password != confirm_password) {
    res.send(alert_response("Passwords donot match"));
    console.log("Password donot match");
    return ;
  }
  if(user_exist){
     res.send(alert_response("Already registered"));
     return;
  } else {
    if(register_user(email, password)){
        res.send(alert_response("Successfully registered Please Login!!"));
        return ;
    } else{
        res.send(alert_response("Error in Registering User. Please try again."));
        return;
    }
  }
});


router.post("/login", function(req, res, next){

});

module.exports = router;
