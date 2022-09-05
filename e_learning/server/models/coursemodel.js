// Write your cod
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    title: String,
    author: String,
    overview: String,
    free: Boolean,
    img: String,
});

module.exports = mongoose.model("CourseModel", CourseSchema);