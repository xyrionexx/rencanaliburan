import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { renderEmailTemplate } from "@/components/rendertemplate/rendertempalte";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const htmlContent = await renderEmailTemplate();

    // Check if EMAIL_USER and EMAIL_PASS environment variables are available
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.log("⚠️ Email credentials not found in environment variables");
      // For development only, return success for testing the UI flow
      return NextResponse.json({
        message: "Email simulation successful in development mode",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: emailUser,
      to: email,
      subject: "Thank You For Subcribe Lumotrip 💌",
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email terkirim:", info);

    return NextResponse.json({ message: "Email terkirim ✅" });
  } catch (error) {
    console.error("❌ Error Nodemailer:", error);
    return NextResponse.json(
      { message: "Gagal kirim email", error: error.message },
      { status: 500 }
    );
  }
}
