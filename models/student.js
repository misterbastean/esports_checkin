const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
	studentId: {
		type: String,
    required: [true, "Please add a Student ID."],
    unique: true,
		maxlength: [7, "Student ID must be 7 numbers long"],
		minlength: [7, "Student ID must be 7 numbers long"]
	},
	firstName: {
		type: String,
		required: [true, "Please add a first name."],
		maxlength: [19, "First name must be less than 20 characters long"],
	},
	lastName: {
		type: String,
		required: [true, "Please add a last name."],
		maxlength: [19, "Last name must be less than 20 characters long"],
	},
	punches: [{}]
});

module.exports = mongoose.model('Student', studentSchema);
