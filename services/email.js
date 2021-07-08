const sgMail = require("@sendgrid/mail");
const Mailgen = require("mailgen");

require("dotenv").config();

const { SENDGRID_KEY } = process.env;

sgMail.setApiKey(SENDGRID_KEY);

const SendMail = async (verifyToken, email) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Contats",
      link: "http://localhost:3000/",
    },
  });

  const template = {
    body: {
      intro: "Welcome to System! We're very excited to have you on board.",
      action: {
        instructions: "To get started with System, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Confirm your account",
          link: `https://localhost:3000/api/users/verify/${verifyToken}`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  const emailBody = mailGenerator.generate(template);

  const mail = {
    to: email,
    from: "redcars2012gmail.com",
    subject,
    text,
    html: emailBody,
  };

  try {
    const result = await sgMail.send(mail);
    return result;
  } catch (error) {
    console.log(error);
    error.message = `Email not send. Reason - ${error.message}`;
    throw error;
  }
};

module.exports = SendMail;
