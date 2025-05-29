import * as nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
    secure: false,
  });

  const body = await request.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { message: "Please fill out the necessary fields" },
      { status: 400 },
    );
  }

  const mailData = {
    from: email,
    to: "jibrankhairyy@gmail.com",
    subject: `Message from ${name}`,
    text: `${message} | Sent from: ${email}`,
    html: `<div>${message}</div><p>Sent from: ${email}</p>`,
  };

  try {
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailData, (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });
    });

    return NextResponse.json({ message: "Message sent!" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 },
    );
  }
};
