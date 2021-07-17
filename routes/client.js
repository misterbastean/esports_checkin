const express = require('express')
const router = express.Router()
const Student = require('../models/student')
const punchUtils = require('../utils/punch')

// Landing page
router.get('/', (req, res) => {
  res.render('index')
})

// New Student Form
router.get("/students/new", (req, res) => {
  res.render("studentsNew")
})

// View Student Data
router.get("/students/:id", async (req, res) => {
  try {
    const student = await Student.findOne({studentId: req.params.id})
    if (!student) {
      console.log(`No student found with ID of ${req.params.id}`);
      return res.redirect("/")
    }

    // Calculate total time
    let totalTime = 0 // Will be in milliseconds

    // Check if there is an odd number of punches. If so, add blank item to array to stop error
    punchUtils.garbageHack(student.punches);

    // Loop through punches, putting them into blocks
		const punchData = punchUtils.punchLoop(student.punches);

    // Handle case where there is only one punch, which throws error otherwise
		if (punchData === -1) {
			return res.render('students/show', { student, totalTime: 0, monthPunches: 1, monthTime: 0 });
		}
    const timeBlocks = punchData.timeBlocks;
		const missingPunches = punchData.missingPunches;

    // Calculate time value of each block and add to totalTime
    timeBlocks.forEach(block => {
				datTime = block.out - block.in;
				// Check if time extends beyond 1 day - if so, do nothing
				if (datTime >= (28800000)) {
					console.log("Total Time Error: One punch block was greater than 8 hours. Disregarded this likely error.");
					return
				} else {
					totalTime += datTime;
				}
			});
      totalTime = Math.round(totalTime / 60000);

      // Get time for current monthTime
			const monthData = punchUtils.getMonthPunches(student.punches);
			const monthPunches = monthData.monthBlocks;
			const monthTime = monthData.monthTime;

      res.render('studentShow', { student, totalTime, monthPunches, monthTime });

  } catch (err) {
    console.log(err);
    res.redirect("/")
  }
})

module.exports = router;
