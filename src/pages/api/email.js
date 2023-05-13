import { render } from "@react-email/render";
import WelcomeTemplate from "../../emails/SetTimeTemplate";
import { sendEmail } from "../../lib/email";

export default async function handler(req, res) {
  await sendEmail({
    to: "flybird1400@gmail.com",
    subject: "Welcome to NextAPI",
    html: render(WelcomeTemplate()),
  });

  res.status(200).json({ message: "Email sent successfully" });
}
