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
      callbackURL: "http://cms.atmos.ucla.edu:3000/admin"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      User.findOrCreate({ googleId: profile.id }, (err, user) => {
        return done(err, user);
      });
    }
  )
);

const app = express();

// Log requests
app.use(morgan("tiny"));

// Serve admin page
app.get("/auth", passport.authenticate("google", { scope: ["https://www.googleapis.com/auth/plus.login"] }));

// Serve public pages
app.use(express.static(`${process.cwd()}/public`));

// Start server
http.createServer(app).listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
