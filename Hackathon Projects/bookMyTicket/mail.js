import nodemailer from 'nodemailer'
import 'dotenv/config.js'
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendVerificationEmail = async (email, token) => {

  const baseUrl = process.env.BASE_URL || "http://localhost:8080";
  const url = `${baseUrl}/verify?token=${token}`;
  
  await transporter.sendMail({
    from: '"Cinema Admin" <admin@cinema.com>',
    to: email,
    subject: "Verify Your Account",
    html: `<p>Click <a href="${url}">here</a> to verify your account.</p>`,
  });
};

// This is how you make it available to other files
export { sendVerificationEmail };