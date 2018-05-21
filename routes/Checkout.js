var express = require("express");
var router = express.Router();
var db = require("../db");
var checkout = require("./Checkout_Schema");

router.post("/putDetails", function(req, res, next) {
  db.dbOpen();
  try {
    var c = new checkout();
    c.FullName = req.body.FullName;
    c.Email = req.body.Email;
    c.Address = req.body.Address;
    c.City = req.body.City;
    c.Zip = req.body.Zip;
    c.State = req.body.State;
    c.NameOnCard = req.body.NameOnCard;
    c.CreditCardNumber = req.body.CreditCardNumber;
    c.ExpMonth = req.body.ExpMonth;
    c.ExpYear = req.body.ExpYear;
    c.CVV = req.body.CVV;
    c.save(function(err) {
      if (err) {
        res.status(404).json({ message: err });
      }
      res.status(200).json({ message: "Checkout Users Added !" });
    });
  } catch (error) {
    res.json({ message: "Unable to save to the Database" });
  }
  db.dbClose();
});

router.get("/getDetails", function(req, res, next) {
  db.dbOpen();
  try {
    checkout.find(function(err, checkout) {
      if (err) {
        res.status(404).json({ message: err });
      }
      res.status(200).send(checkout);
    });
  } catch (error) {
    res.json({ message: "Unable to get from the Database" });
  }
  db.dbClose();
});

router.get("/getDetails/:checkoutId", function(req, res, next) {
  db.dbOpen();
  var Id = req.params.checkoutId;
  try {
    checkout.findById(Id, function(err, checkout) {
      if (err) {
        res.status(404).json({ message: err });
      }
      res.status(200).json(checkout);
    });
  } catch (error) {
    res.json({ message: "Unable to get ID from the Database" });
  }
  db.dbClose();
});

router.put("/updateDetails/:checkoutId", function(req, res, next) {
  db.dbOpen();
  var Id = req.params.checkoutId;
  try {
    checkout.findByIdAndUpdate(Id, { $set: req.body }, function(err, checkout) {
      if (err) {
        res.status(404).json({ message: err });
      }
      res.status(200).json({ message: "Updated Successfully" });
    });
  } catch (error) {
    res.json({ message: "Unable to Update data" });
  }
  db.dbClose();
});

module.exports = router;
