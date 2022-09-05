// Write your code here
const CourseModel = require('../models/coursemodel');
const data = require('../data/courses.json');

const insertCourses = async () => {
    await CourseModel.insertMany(data, (err,elem) => {
        if (!err) console.log("Course Inserted Successfully with elemnts\n:" + elem);
        else console.log("Error on Inserting Course: " + err);
    });
};

module.exports.loadAllCourses = async (req, res) => {
    try {
        await insertCourses();
        res.send("Data has been inserted successfully!");
    }
    catch (error) {
        console.log(error);
    }
}

module.exports.findCourses = async (req, res) => {
    try {
        insertCourses();
        results = await CourseModel.find();
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.json(results);
    }
    catch (error) {
        console.log(error);
    }
}