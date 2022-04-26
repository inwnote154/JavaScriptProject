var express = require('express');
var router = express.Router();
const db = require('monk')(process.env.DATABASE_URL || 'localhost:27017/registerDB')
const { check , validationResult } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Desktop05', { title: 'Express' });
});

router.post('/', [
  check("Dormitory","").not().isEmpty(),
  check("Room","").not().isEmpty(),
  check("Appointment_request","").not().isEmpty(),
  check("TimeStart","").not().isEmpty(),
  check("TimeStop","").not().isEmpty(),
  check("Participant","").not().isEmpty(),
],function(req,res,next) {
  const result = validationResult(req);
  if(!result.isEmpty()){
    res.render('Desktop05');
  }
  else{
    var ct=db.get('Blogs1');
    ct.find({$and:[{Dormitory:req.body.Dormitory}, {Room:req.body.Room},
      {Appointment_request:req.body.Appointment_request}]}).then((doc1) => {
     if(doc1.length == 0 ){
       ct.insert({
         Dormitory:req.body.Dormitory,
         Room:req.body.Room,
         Appointment_request:req.body.Appointment_request,
         TimeStart:req.body.TimeStart,
         TimeStop:req.body.TimeStop,
         Participant:req.body.Participant
       })
       res.render('Desktop06');
       
     } else {
       res.render('Desktop05');
     }
   });
 }
});
module.exports = router;