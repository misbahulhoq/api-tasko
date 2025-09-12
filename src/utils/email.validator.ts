import nodemailer from "nodemailer";
import envVars from "../config/env.config";
import AppError from "./AppError";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: envVars.EMAIL,
    pass: envVars.EMAIL_APP_PASS,
  },
});

export const sendVerificationEmail = async (to: string, code: string) => {
  const mailOptions = {
    from: `"Tasko" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: "Verify Your Login ✔",
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
        <h2>Welcome!</h2>
        <p>Thank you for loging into Tasko. Please use the following code to verify your account. The code is valid for 5 minutes.</p>
        <p style="font-size: 24px; font-weight: bold; letter-spacing: 5px; background: #f0f0f0; padding: 10px 20px; border-radius: 5px;">
          ${code}
        </p>
        <p style="font-size: 14px; color: #777;">
          <em>This code is valid for 5 minutes.</em>
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully.");
  } catch (error) {
    console.error("Error sending verification email:", error);
    const errorMessage =
      error && typeof error === "object" && "message" in error
        ? (error as { message?: string }).message
        : "Could not send verification email.";
    throw new AppError(
      500,
      errorMessage || "Could not send verification email."
    );
  }
};
