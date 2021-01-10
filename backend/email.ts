const nodemailer = require('nodemailer');

let transporter = null;
if (
  process.env.EMAIL_EMAIL &&
  process.env.EMAIL_CLIENT_ID &&
  process.env.EMAIL_CLIENT_SECRET &&
  process.env.EMAIL_REFRESH_TOKEN
) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_EMAIL,
      clientId: process.env.EMAIL_CLIENT_ID,
      clientSecret: process.env.EMAIL_CLIENT_SECRET,
      refreshToken: process.env.EMAIL_REFRESH_TOKEN,
    },
  });
}

export const sendEmail = async (
  email: string,
  subject: string,
  text: string
): Promise<void> => {
  if (transporter) {
    const mailOptions = {
      from: process.env.EMAIL_SENDER,
      to: email,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
  } else {
    throw Error('Email could not be sent as auth credentials are missing');
  }
};
