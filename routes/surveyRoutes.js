const _ = require("lodash");
const path = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");

const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

// this way is used for running test
// without errors
// Creating instance of Survey
const Survey = mongoose.model("surveys");

module.exports = app => {
  app.get("/api/surveys/thanks", (req, res) => {
    res.send("Thanks For Voting!");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const events = _.map(req.body, event => {
      const pathname = new URL(event.url).pathname;
      const p = new Path("/api/surveys/:surveyId/:choice");
      const match = p.test(pathname);
      if (match) return match;
    });
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    // Getting Data from request Obj which is Post in 'api/surveys' with fields
    const { title, subject, body, recipients } = req.body;
    // Creating instance of Survey
    // Pushing value in Sechma of Mongoose Model With Survey Instance
    const survey = new Survey({
      title,
      body,
      subject,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
      lastResponded: Date.now()
    });

    // Great place to send email!
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      const resp = await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    } finally {
    }
  });
};
