import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth2';

const GOOGLE_CLIENT_ID = '1063888789863-rf6rbrhct8lub2a100305n32ia5du20g.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});