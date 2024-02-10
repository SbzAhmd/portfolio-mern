const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const sendGridTransport = require("nodemailer-sendgrid-transport");

// tramnsporter
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.API_SENDGRID,
    },
  })
);

const sendEmailController = (req, res) => {
  try {
    const { name, email, msg } = rew.body;
    // validation
    if (!name || !email || !msg) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    // email matters
    transporter.sendMail({
        to: "sbzahmd21101@gmail.com",
        from: "sbzahmd21101@gmail.com",
        subject: 'Mern App',
        html: `
        <h5>Detail Information</h5>
        <ul>
          <li><p>Name : ${name}</p></li>
          <li><p>Email : ${email}</p></li>
          <li><p>Message : ${msg}</p></li>
        </ul>
      `, 
    })

    return res.status(200).send({
      success: true,
      message: "Your message send successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "send email api error",
      error,
    });
  }
};

module.exports = { sendEmailController };
