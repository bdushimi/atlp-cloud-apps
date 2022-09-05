// Write your code here
const express = require('express');
const coursecontroller = require('../controllers/coursecontroller');
const router = express.Router();

router.get('/', (req, res) => res.send("Backend has started!"));
router.get('/loadAllCourses', coursecontroller.loadAllCourses);
router.get('/fetchAllCourses', coursecontroller.findCourses);
module.exports = router;