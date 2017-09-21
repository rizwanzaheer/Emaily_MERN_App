const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = app => {
  app.get("/api/surveys/thanks", (req, res) => {
    res.send("Thanks For Voting!");
  });
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      body,
      subject,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });
    console.log("api/surveys");
    // Great place to send email!
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      const promise = await survey.save();
      promise.then((doc) => {
        console.log(doc);
      });
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      console.log(err);
      res.status(422).send(err);
    }
  });
};
