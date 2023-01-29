var express = require("express");
const path = require("path");
var router = express.Router();
var db = require("../lib/db");
const bcrypt = require('bcrypt');
const { count } = require("console");



/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.session.loggedin) {
    res.render("home/home", { myVar: 1 });
  } else {
    res.render("home/home", { myVar: 0 });
  }
});

// LOGS THE USER OUT
router.get("/logout", function (req, res, next) {
  // render to views/user/add.ejs
  req.session.loggedin = false;
  delete req.session.rows;

  req.flash("success", "Logged out successfully");
  res.render("home/home", { myVar: 0 });
});

/* GET checkout page. */
router.get("/checkout", function (req, res, next) {
  console.log("Checkput");
  console.log(req.session.rows);

  if (req.session.rows) {
    console.log("No");
    res.render("checkout/checkout", {
      page_title: "Customers - Node.js",
      data: req.session.rows,
    });
  } else {
    console.log("Yes");

    res.render("checkout/checkout", {
      page_title: "Customers - Node.js",
      data: "",
    });
  }
});


/* GET checkout page. */
router.post("/checkout", function (req, res, next) {

  var address = req.body

  var num = "select MAX(saleId) Test from sales_line";
  db.query(num, function (err, num1) {

    var line = num1[0].Test + 1;
    // console.log(line);

    for ( i = 0; i < req.session.rows.length; i++) {
      // console.log(req.session.rows[i].pId);
      // console.log(req.session.rows[i].pQuantity);
  
  
      var sql = "INSERT INTO sales_line (saleId,uId, pId, stockReq, sAddress, sTotal) VALUES (?, ?, ?, ?, ?, ?)";
      db.query(sql, [line, req.session.userId, req.session.rows[i].pId, req.session.rows[i].pQuantity, address.sAddress, (req.session.rows[i].pPrice * req.session.rows[i].pQuantity)], function (err, data) {
        if (err) throw err;
        console.log("User data is inserted successfully ");
      });
  
    }
    // res.redirect("/checkout");

  });
  req.flash("success", "Checked Out Successfully");
  res.redirect("/checkout");

});



// delete checkout get
router.get("/checkout/delete/(:pId)", function (req, res, next) {
  for (var i = 0; i < req.session.rows.length; i++) {
    if (req.session.rows[i].pId.toString() === req.params.pId) {
      req.session.rows.splice(i, 1);
    }
  }

  res.redirect("/checkout");
});

// GET register page
router.get("/register", function (req, res, next) {
  // render to views/user/add.ejs
  res.render("register/register", {
    uName: "",
    uEmail: "",
    userName: "",
    userPassword: "",
  });
});

/* GET products page. */
router.get("/products", function (req, res, next) {
  db.query("SELECT * FROM products ORDER BY pId desc", function (err, rows) {
    // console.log(rows)
    if (req.session.loggedin) {
      if (err) {
        req.flash("error", err);
        res.render("products/products", {
          page_title: "Customers - Node.js",
          data: "",
          myVar: 1,
        });
      } else {
        res.render("products/products", {
          page_title: "Customers - Node.js",
          data: rows,
          myVar: 1,
        });
      }
    } else {
      if (err) {
        req.flash("error", err);
        res.render("products/products", {
          page_title: "Customers - Node.js",
          data: "",
          myVar: 0,
        });
      } else {
        res.render("products/products", {
          page_title: "Customers - Node.js",
          data: rows,
          myVar: 0,
        });
      }
    }
  });
});

// ADD NEW products get ACTION
router.get("/products/add/(:pId)/(:quantity)", function (req, res, next) {
  const quantity = req.params.quantity;

  if (req.session.loggedin) {
    const userDetails = req.params.pId;
    console.log(userDetails);

    db.query(
      "SELECT * FROM products WHERE pId = " + req.params.pId,
      function (err, rows, fields) {
        console.log(req.session.rows);

        if (!req.session.rows) {
          req.session.rows = [];
        }

        rows[0].pQuantity = quantity;
        req.session.rows.push(rows[0]);


        if (err) throw err;
        if (rows.length <= 0) {
          req.flash("error", "Customers not found with id = " + req.params.id);
          res.redirect("/products");
        } else {

          req.flash(
            "success",
            "Successfully added to the basket"
          );
          res.redirect("/products");
        }
      }
    );
  } else {
    req.flash("login", "You must be logged in");
    res.redirect("/login");
  }
});








/* GET about page. */
router.get("/about", function (req, res, next) {
  if (req.session.loggedin) {
    res.render("about/about", { myVar: 1 });
  } else {
    res.render("about/about", { myVar: 0 });
  }
});






/* GET profile page. */
router.get("/profile", function (req, res, next) {
  var userId = req.session.userId;
  console.log(userId);
  db.query("SELECT * FROM user WHERE uId =" + userId, function (err, rows) {
    if (err) {
      db.query("SELECT * FROM sales_line WHERE uId =" + userId, function (err, rows1) {
        req.flash("error", err);
        res.render("profile/profile", {
          page_title: "Customers - Node.js",
          data: "",
          data1: ""
        });
      })
    }
     else {
      db.query("SELECT * FROM sales_line WHERE uId =" + userId, function (err, rows1) {
        console.log(rows1);
        req.flash("error", err);
        res.render("profile/profile", {
          page_title: "Customers - Node.js",
          data: rows,
          uName: rows[0].uName,
          userName: rows[0].userName,
          userPassword: rows[0].userPassword,
          uEmail: rows[0].uEmail,
          data1 : rows1,
        });
      })
    }
  });
});

// DELETE USER
router.get("/profile/delete/", function (req, res, next) {
  var userId = req.session.userId;

  db.query("DELETE FROM user WHERE uId =" + userId, function (err, result) {
    //if(err) throw err
    if (err) {
      req.flash("error", err);

      res.redirect("/profile");
    } else {
      req.session.loggedin = false;
      req.flash("success", "Customer deleted successfully!");

      res.redirect("/");
    }
  });
});




// EDIT login POST ACTION
router.post("/profile/update/", async function (req, res, next) {

  var userId = req.session.userId;
  const salt = await bcrypt.genSalt(10);

    var user = {
      uName: req.sanitize("uName").escape().trim(),
      userName: req.sanitize("userName").escape().trim(),
      userPassword: req.sanitize("userPassword"),
      uEmail: req.sanitize("uEmail").escape().trim(),
    };

    if (req.body.userPassword.length < 25) {
      req.body.userPassword = await bcrypt.hash(req.body.userPassword, salt);
      user.userPassword = req.body.userPassword
    }



    db.query(
      "UPDATE user SET ? WHERE uId = " + userId,
      user,
      function (err, result) {
        //if(err) throw err
        if (err) {
          req.flash("error", err);

          res.render("about/about", {
            title: "Edit",
            id: req.params.id,
            name: req.body.name,
            email: req.body.email,
          });
        } else {
          req.flash("update", "Data updated successfully!");
          res.redirect("/profile");
        }
      }
    );
});






/* GET login page. */
router.get("/login", function (req, res, next) {
  res.render("login/login");
});


/* POST login listing. */
router.post("/login/auth", async function (req, res, next) {
  // store all the user input data
  const userDetails = req.body;

  var sql1 = "SELECT * FROM user WHERE userName = ?";
  db.query(
    sql1,
    [userDetails["userName"]],
    async function (err, results, data) {

      var string = JSON.stringify(results);
      var json = JSON.parse(string);
      
      if (json[0]) {
        console.log(json[0]);

        console.log(json[0].userPassword);
        console.log(userDetails["userPassword"]);
  
        const validPassword = await bcrypt.compare(userDetails["userPassword"], json[0].userPassword);
        console.log(validPassword);
  
        if (validPassword) {
          req.session.userId = json[0].uId;
  
  
          req.session.loggedin = true;
  
          req.flash("success", "Logged in successfully");
          res.redirect("/");
        } else {
          req.flash("error", "Incorrect Username or Password");
          res.redirect("/login");
        }
      } else {
        req.flash("error", "Incorrect Username or Password");
          res.redirect("/login");
      }
      

    })
});







/* GET register listing. */
router.get("/register", function (req, res, next) {
  res.render("register/register");
});

/* POST register listing. */
router.post("/register/create", async function (req, res, next) {
  // store all the user input data
  const user = req.body;
  console.log(user);

  const salt = await bcrypt.genSalt(10);
  console.log(user["userPassword"]);
  user["userPassword"] = await bcrypt.hash(user["userPassword"], salt);
  console.log(user);

  // insert user data into users table
  var sql = "INSERT INTO user SET ?";
  db.query(sql, user, function (err, data) {
    if (err) throw err;
    console.log("User data is inserted successfully ");
  });

  req.flash("register", "Created new user");
  res.redirect("/login"); // redirect to login form page after
});

module.exports = router;
