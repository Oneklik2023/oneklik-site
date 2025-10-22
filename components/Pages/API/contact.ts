/*import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import axios from 'axios';

type ContactRequest = {
  name: string;
  email: string;
  phone: string;
  message: string;
  token: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, phone, message, token }: ContactRequest = req.body;

  try {
    // Verify reCAPTCHA
    const captchaRes = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token,
        },
      }
    );

    const isHuman = captchaRes.data.success && captchaRes.data.score >= 0.5;

    if (!isHuman) {
      return res.status(400).json({ success: false, message: 'reCAPTCHA failed' });
    }

    // Send email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.SMTP_USER,
      subject: `Nowa wiadomość od ${name}`,
      html: `
        <h3>Nowa wiadomość z formularza kontaktowego</h3>
        <p><strong>Imię:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Wiadomość:</strong><br>${message}</p>
      `,
    });

    return res.status(200).json({ success: true, message: 'Email sent!' });
  } catch (err) {
    console.error('Email error:', err);
    return res.status(500).json({ success: false, message: 'Email sending failed' });
  }
}*/
