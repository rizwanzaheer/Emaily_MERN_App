const passport = require("passport");
// Routes
module.exports = app => {
  app.get("/", (req, res) => {
    res.send({ hi: "hello,Rizwan" });
  });
  app.get(
    "/auth/google/",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      console.log("surveys");
      res.redirect("/surveys");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get("/api/current_user", (req, res) => {
    console.log("current_user");
    res.send(req.user);
  });
};
