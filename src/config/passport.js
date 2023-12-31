import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import randomstring from "randomstring";
import "dotenv/config";

const configurePassport = () => {
  // serializeUser: Lưu thông tin user.id vào session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // deserializeUser: Lấy thông tin user từ id trong session
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
        callbackURL: `${process.env.URL_CLIENT}/auth/google/callback`,
      },
      async function (accessToken, refreshToken, profile, cb) {
        try {
          let user = await User.findOne({
            $or: [{ googleId: profile.id }, { email: profile.emails[0].value }],
          });
          if (user) {
            return cb(null, user);
          } else {
            const password = randomstring.generate({
              length: 6,
              charset: "numeric",
            });

            const hashedPassword = await bcrypt.hash(password, 10);
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
