import nodemailer from "nodemailer"

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        })
    }

    try {
        const {
            name,
            email,
            company,
            message,
        } = req.body

        const transporter =
            nodemailer.createTransport({
                host: "live.smtp.mailtrap.io",

                port: 587,

                secure: false,

                auth: {
                    user: "smtp@mailtrap.io",

                    pass: "936cad19c8373c1357dbb9877a0c4ca5",
                },
            })

        await transporter.sendMail({
            from: "contactus@thwindeffect.com",

            to: [
                "contactus@thwindeffect.com",
                "Zak@thwindeffect.com",
                "Oyinda@thwindeffect.com",
            ],

            subject: `New Submission From ${name}`,

            html: `
                <div style="font-family: Arial; padding: 20px;">
                    <h2>New Contact Form Submission</h2>

                    <p>
                        <strong>Name:</strong>
                        ${name}
                    </p>

                    <p>
                        <strong>Email:</strong>
                        ${email}
                    </p>

                    <p>
                        <strong>Company:</strong>
                        ${company}
                    </p>

                    <p>
                        <strong>Message:</strong>
                    </p>

                    <p>${message}</p>
                </div>
            `,
        })

        return res.status(200).json({
            success: true,
        })
    } catch (error) {
        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Failed to send email",
        })
    }
}
