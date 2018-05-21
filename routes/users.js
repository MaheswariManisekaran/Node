var express = require('express');
var router = express.Router();

var fs = require("fs");
var read = fs.createReadStream("./db.json");
var CategoryJson = {};

var Products = [];
read.on("data", data => {
  Products = JSON.parse(data);
});

router.get('/', function (req, res, next) {
  res.json({ Products });
});
router.get('/add', function (req, res, next) {
  res.json({ Products });
});

router.post('/add', function (req, res, next) {
  var item = req.body;
  var id = Products.ProductStore.length;
  item.id = ++id;
  Products.ProductStore.push(item);
  var write = fs.createWriteStream("./db.json");
  write.write(JSON.stringify(Products), err => {
    if (err) throw err;
    else {
      var success = "Item" + " " + item.id + " " + "Successfully added to the Product List";
      res.json({ success });
    }
  });
});

router.get("/edit/:id", function (req, res, next) {
  var id = req.params.id;
  var index = Products.ProductStore.findIndex(p => p.id == id);
  res.json({ EditProduct: Products.ProductStore[index] });
});

router.post("/edit/:id", function (req, res) {
  var item = req.body;
  var id = req.params.id;
  var index = Products.ProductStore.findIndex(p => p.id == id);
  item.id = id;
  Products.ProductStore[index] = item;
  var write = fs.createWriteStream("./db.json");
  write.write(JSON.stringify(Products), err => {
    if (err) throw err;
    else {
      var edit = "Item" + " " + id + " " + "Successfully edited";
      res.json({ edit });
    }
  });
});

router.get("/del/:id", function (req, res) {
  var id = req.params.id;
  var index = Products.ProductStore.findIndex(p => p.id == id);
  Products.ProductStore.splice(index, 1);
  var write = fs.createWriteStream("./db.json");
  write.write(JSON.stringify(Products), err => {
    if (err) throw err;
    else {
      var del = "Item" + " " + id + " " + "Successfully deleted";
      res.json({ del });
    }
  });
});

router.post("/getProductByIDorName", function (req, res) {
  var id = req.body.id;
  var name = req.body.productName;
  if (id) {
    var index1 = Products.ProductStore.findIndex(p => p.id == id);
    res.json({ Product: Products.ProductStore[index1] });
  }
  else if (name) {
    var index2 = Products.ProductStore.filter(p => p.productName == name);
    res.json({ Product: index2 });
  }
});

router.get("/search/:val", function (req, res, next) {
  var val = req.params.val.toLowerCase();
  var searchProduct = [];
  searchProduct = Products.ProductStore.filter(function (obj) {
    return obj.productName
      .toString()
      .toLowerCase()
      .includes(val);
  });
  res.json({ Products: searchProduct });
});

router.get("/category", function (req, res) {
  var category = [];
  for (var i = 0; i < Products.ProductStore.length; i++) {
    category.push(Products.ProductStore[i].category);
  }
  console.log("category1", category);
  for (var i = 0; i < category.length; i++) {
    for (var j = 0; j < category.length; j++) {
      if (category[i] == category[j]) {
        category.splice(j, 1);
      }
    }
  }
  console.log("category2", category);
  for (i = 0; i < category.length; i++) {
    var cateArr = [];
    var count = 0;
    for (j = 0; j < Products.ProductStore.length; j++) {
      if (category[i] == Products.ProductStore[j].category) {
        cateArr[count] = Products.ProductStore[j];
        count++;
      }
    }

    CategoryJson[category[i]] = cateArr;
  }
  res.json({ Category: CategoryJson });
});

router.get("/globalSearch/:val", (req, res, next) => {
  var globalSearchProduct = [];
  var val = req.params.val.toLowerCase();
  globalSearchProduct = Products.ProductStore.filter(function (obj) {
    return Object.keys(obj).some(function (key) {
      return obj[key]
        .toString()
        .toLowerCase()
        .includes(val);
    });
  });
  res.json({ globalSearchProduct: globalSearchProduct });
});


module.exports = router;
