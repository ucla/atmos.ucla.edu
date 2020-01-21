import http from "http";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import passport from "passport";
// import { OAuthStrategy } from "passport-google-oauth";

// Add environment variables from .env file to process.env variable
dotenv.config();

// const GoogleStrategy = OAuthStrategy.GoogleStrategy;
// passport.use(
//   new GoogleStrategy(
//     {
//       consumerKey: GOOGLE_CONSUMER_KEY,
//       consumerSecret: GOOGLE_CONSUMER_SECRET,
//       callbackURL: "http://www.example.com/auth/google/callback"
//     },
//     (token, tokenSecret, profile, done) => {
//       User.findOrCreate({ googleId: profile.id }, function(err, user) {
//         return done(err, user);
//       });
//     }
//   )
// );

const app = express();

// Log requests
app.use(morgan("tiny"));

// Serve public pages
app.use(express.static(`${process.cwd()}/public`));

// Start server
http.createServer(app).listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
