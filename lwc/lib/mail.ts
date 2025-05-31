import nodemailer from "nodemailer";
const domain = process.env.NEXT_PUBLIC_APP_URL;

const USER = process.env.EMAIL_USER;
// const PASS = process.env.EMAIL_PASS;
// console.log(USER, PASS);

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

// console.log(transporter);

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
        to: email, // list of receivers
        subject: "Reset your password", // Subject line
        // text: "Hello world?", // plain text body
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`, // html body
    });  
};
  
export const sendVerificationEmail = async (email: string, token: string) => {
    // console.log(domain);

    const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-verification?token=${token}`;
    // console.log(confirmLink);
    console.log("Email: "+email);
    // console.log(transporter);
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
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
    // console.log("ans:", ans);
};

// import { Resend } from "resend";
// const resend = new Resend(process.env.RESEND_API_KEY);
// export const sendTwoFactorEmail = async ( email: string, token: string) => {
//     await resend.emails.send({
//         from: "onboarding@resend.dev",
//         to: email,
//         subject: "2FA Code",
//         html: `<p>Your 2FA Code: ${token}</p>`
//     })
// }
// export const sendPasswordResetEmail = async(email:string,token:string) => {
//     const resetLink = `${domain}/auth/new-password?token=${token}`;
//     await resend.emails.send({
//         from: "onboarding@resend.dev",
//         to: email,
//         subject: "Reset your password",
//         html: `<p>Click <a href="${resetLink}">here</a> to confirm password.</p>`
//     })
// }
// export const sendVerificationEmail = async(email:string,token:string) => {
//     const confirmLink = `${domain}/auth/new-verification?token=${token}`;
//     await resend.emails.send({
//         from: "onboarding@resend.dev",
//         to: email,
//         subject: "Confirm your email",
//         html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
//     })
// }