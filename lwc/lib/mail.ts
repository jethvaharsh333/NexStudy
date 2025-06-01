import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    logger: true,
});

export const sendTwoFactorEmail = async (email: string, token: string) => {
    const ans = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "2FA Code",
        text: "Hello world?",
        html: `<p>Your 2FA Code: ${token}</p>`,
    });  
};
  
export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-password?token=${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`, // html body
    });  
};
  
export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-verification?token=${token}`;
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email, // list of receivers
        subject: "Confirm your email", // Subject line
        // text: "Hello world?", // plain text body
        // attachDataUrls: `${confirmLink}`,
        // html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p> <p>${confirmLink}</p>`, // html body
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #4CAF50;">Welcome!</h2>
                <p style="font-size: 16px;">Thank you for joining our service.</p>
                <p style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">
                    Please verify your email address to get started.
                </p>
                <a href="${confirmLink}">Click here</a>
            </div>
        `,
    });
};