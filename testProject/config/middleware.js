var passport = require('passport'),
    bcrypt = require('bcrypt-nodejs/bCrypt.js'),
    LocalStrategy = require('passport-local').Strategy,
    GitHubStrategy = require('passport-github').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var verifyHandler = function (token, tokenSecret, profile, done) {
    process.nextTick(function () {

        User.findOneBySocial_id(profile.id.toString()).done(
            function (err, user) {
                var data;

                if (user) {
                    return done(null, user);
                } else {
                    if (profile.provider === 'github') {

                        data = {
                            provider : 'github',
                            socialId : profile.id,
                            displayName : profile._json.login,
                            socialUrl : profile._json.html_url,
                            avatarUrl : profile._json.avatar_url,
                            email : (profile.emails && profile.emails[0] && profile.emails[0].value) ?
                                profile.emails[0].value : undefined
                        };
                    } else {
                        data = {
                            provider: profile.provider,
                            id: profile.id,
                            displayName: profile.displayName
                        };

                        if(profile.emails && profile.emails[0] && profile.emails[0].value) {
                            data.email = profile.emails[0].value;
                        }
                        if(profile.name && profile.name.givenName) {
                            data.fistname = profile.name.givenName;
                        }
                        if(profile.name && profile.name.familyName) {
                            data.lastname = profile.name.familyName;
                        }
                    }

                    User.create(data).done(function (err, user) {
                        if (err) console.log(err);
                        return done(err, user);
                    });
                }
            });
    });
};

var verifyLocalHandler = function(username, password, next) {
    User.findOne()
            .where({
                or: [{
                    displayName : username,
                    provider : 'local'
                }, {
                    email: username,
                    provider : 'local'
                }]
            })
            .done(function(error, user) {
                console.log('here');
                console.log(error);
                console.log(user);
                if (error) {
                    next(error);
                } else if (!user) {
                    next(false, false, 'This user not exists');
                } else if (!bcrypt.compareSync(password, user.encryptedPassword)) {
                    next(false, false, 'Wrong password');
                } else {
                    console.log('rrrr');
                    next(false, user);
                }
            });
}

passport.serializeUser(function (user, done) {
    done(null, user.socialId ? user.socialId : user.id);
    //done(null, user._id);
});

passport.deserializeUser(function (uid, done) {
    console.log('deserialize');
    console.log(uid);
    User.findOneById(uid).done(function (err, user) {
        if (!user) {
            User.findOne({ socialId : uid}).done(function(err, user) {
                done(err, user);
            });
        } else {
            done(err, user)
        }
    });
});

module.exports = {

    // Init custom express middleware
    express: {
        customMiddleware: function (app) {

            passport.use(new LocalStrategy({
                    username : 'display_name',
                    password : 'encrypted_password'
                },
                verifyLocalHandler
            ));

            passport.use(new GitHubStrategy({
                    clientID: "48bd6d594647e40a14ba",
                    clientSecret: "1c4adb70a346824c38486a2ae43c8e4933f048c3",
                    callbackURL: "http://localhost:1337/auth/github/callback"
                },
                verifyHandler
            ));

            passport.use(new FacebookStrategy({
                    clientID: "YOUR_CLIENT_ID",
                    clientSecret: "YOUR_CLIENT_SECRET",
                    callbackURL: "http://localhost:1337/auth/facebook/callback"
                },
                verifyHandler
            ));

            passport.use(new GoogleStrategy({
                    clientID: 'YOUR_CLIENT_ID',
                    clientSecret: 'YOUR_CLIENT_SECRET',
                    callbackURL: 'http://localhost:1337/auth/google/callback'
                },
                verifyHandler
            ));

            app.use(passport.initialize());
            app.use(passport.session());
        }
    }

};