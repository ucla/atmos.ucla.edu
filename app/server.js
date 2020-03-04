import http from "http";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import passport from "passport";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";

// Add environment variables from .env file to process.env variable
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "http://cms.atmos.ucla.edu:3000/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      return done(null, profile);
    }
  )
);

const app = express();

// Log requests
app.use(morgan("tiny"));

// Serve admin page
app.get("/auth", passport.authenticate("google", { scope: ["https://www.googleapis.com/auth/plus.login"] }));
app.get("/callback", passport.authenticate("google", { successRedirect: "/admin", failureRedirect: "/" }));

// Serve public pages
app.get("/admin", (req, res) => {
  res.redirect("/auth");
});
app.use(express.static(`${process.cwd()}/public`));

// Start server
http.createServer(app).listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
