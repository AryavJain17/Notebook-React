const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "Aryavcreatedthis@app";
var fetchuser
 = require('../middleware/fetchuser');

//ROUTE 1:  Create a user usinng Post "/api/auth/createuser".No login Required. Doesnt require Auth

router.post(
  "/createuser",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password is too short").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //Ifthere are error return Bad Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Check Whether the user with this email exisst alreaady
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        // password: req.body.password,
        // }).then(user => res.json(user))
        // .catch(err=>{console.log(err)
        // res.json({error:'Please enter a unique value'})});
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      // res.json({user})
      success = true;
      res.json({success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error occured");
    }
  }
);

//ROUTE 2:  Login usinng Post "/api/auth/login".No login Required. Doesnt require Auth
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Check pass").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Check login creds" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        let success = false;
        return res.status(400).json({ success, error: "Check login creds" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success,authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3:  Get  Loggedin user details using POST "/api/aauth/getuser" . Login Required

router.post(
  "/getuser",fetchuser, async (req, res) => {
try {
 userId = req.user.id;
 const user = await User.findById(userId).select("-password");
 res.send(user);
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error");
}
  })
module.exports = router;
