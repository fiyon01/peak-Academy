const express = require("express")
const signupController = require("../controllers/signupController")
const router = express.Router()

router.post("/signup", signupController.signupStudents)

module.exports = router