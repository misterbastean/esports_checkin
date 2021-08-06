const nodemailer = require('nodemailer');

const sendEmail = async (flaggedUser, flagColor, punchType) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'Testing Professor" <testprofessor@coker.edu>', // sender address
    to: 'jbastean@coker.edu', // list of receivers
    subject: `[eSports Punch System] Flagged User ${flaggedUser} Punched ${punchType}`, // Subject line
    text: `Flagged user ${flaggedUser} just punched ${punchType}. They are flagged ${flagColor.toUpperCase()}.`, // plain text body
    html: `<p>Flagged user ${flaggedUser} just punched ${punchType}. They are flagged ${flagColor.toUpperCase()}.</p>`, // html body
  });

  console.log(`Message sent: ${info.messageId}`);
};

module.exports = sendEmail;
