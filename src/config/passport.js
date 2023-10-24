import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateRandomPassword from "../utils/generateRandomPassword.js";

const configurePassport = () => {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, cb) {
        try {
          let user = await User.findOne({ googleId: profile.id });
          if (user) {
            return cb(null, user);
          } else {
            const randomPassword = generateRandomPassword();

            const hashedPassword = await bcrypt.hash(randomPassword, 10);
            // Người dùng không tồn tại, tạo người dùng mới
            const newUser = new User({
              googleId: profile.id,
              username: profile.emails[0].value,
              full_name: profile.displayName,
              email: profile.emails[0].value,
              profile_image: profile.photos[0].value,
              password: hashedPassword,
            });

            user = await newUser.save();
            return cb(null, user);
          }
        } catch (error) {
          return cb(error, null);
        }
      }
    )
  );
};

export default configurePassport;
