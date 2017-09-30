const _ = require("lodash");
const Path = require("path-parser");
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
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });
    res.send(surveys);
  });

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks For Voting!");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");
    const events = _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match)
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice
          };
      })
      // compact used to romove undefined records
      .compact()
      // UniqBy use to remove for dublicate records by
      // checking keys of 'email'/ 'suerveyId'
      .uniqBy("email", "surveyId")
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();
    console.log(events);
    res.send({});
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
