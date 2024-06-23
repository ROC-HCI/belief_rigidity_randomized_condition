import { Email } from "meteor/email";
import { WebApp } from "meteor/webapp";

WebApp.connectHandlers.use("/send-email", (req, res) => {
  const { gameID, mturkID, issues } = JSON.parse(req.body);

  // Configure the email options
  const emailOptions = {
    from: "sifengchen2002@gmail.com",
    to: "schen133@u.rochester.com",
    subject: "Issue Report",
    text: `Game ID: ${gameID}\nMturk ID: ${mturkID}\nIssues: ${issues}`,
  };

  // Send the email
  try {
    Email.send(emailOptions);
    res.writeHead(200);
    res.end("Email sent successfully");
  } catch (error) {
    console.error(error);
    res.writeHead(500);
    res.end("Error sending email");
  }
});
