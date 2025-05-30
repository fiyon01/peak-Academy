const programsController = require("../controllers/programsController")
const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken");


//function to verify JWT token
// This function checks if the token is valid and not expired
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.userId = decoded.id;
    next();
  });
};

router.get("/programs",programsController.getPrograms)
router.get("/programs/:programId/timetable",verifyToken,programsController.getTimeSlots)

module.exports = router