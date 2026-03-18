import nodemailer from "nodemailer";

const sendEmail = async (name, email, message) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASSWORD
    }
  });

  await transporter.sendMail({
    from: email,
    to: process.env.APP_EMAIL,
    subject: `New Contact Message from ${name}`,
    html: `
      <h3>New Message From Portfolio</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `
  });

};

export default sendEmail;