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
	email: {
		type: String,
		required: [true, "Please add an email."],
	},
	preferredEsport: {
		type: String,
		required: [true, "Please add a preferred eSport."],
		enum: ["lol", "overwatch", "hearthstone"]
	},
	gameName: {
		type: String,
		required: [true, "Please add a main game name."],
	},
	flag: {
		type: String,
		enum: ['none', "yellow", "orange", "red"],
		default: "none"
	},
	adminMessages: [{
		adminName: String,
		dateAdded: Date,
		message: String
	}],
	punches: [{
		rawDate: Date,
		date: {
			type: Date,
			default: Date.now
		},
		time: String,
		type: String,
		computer: Number
	}],
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Student', studentSchema);
