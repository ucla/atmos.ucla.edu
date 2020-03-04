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

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.displayName);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Serve admin page
app.get("/auth", passport.authenticate("google", { scope: ["https://www.googleapis.com/auth/plus.login"] }));
app.get("/callback", passport.authenticate("google", { successRedirect: "/admin", failureRedirect: "/" }));

// Serve public pages
app.get(
  "/admin",
  passport.authenticate("google", { scope: ["https://www.googleapis.com/auth/plus.login"] }),
  (req, res) => {
    res.send("/admin/index.html").status(200);
  }
);
app.use(express.static(`${process.cwd()}/public`));

// Start server
http.createServer(app).listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
