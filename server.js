import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import UserRoute from './Routes/User.route.js'
import InsuranceRoute from './Routes/Insurance.route.js'
import CarRoute from './Routes/Car.route.js'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import passport from 'passport'
import session from 'express-session'
import './auth/auth.js'
const app = express()

const database = "eConstat" 
const port = process.env.port || 3000
const hostname = '127.0.0.1'
import * as dotenv from 'dotenv' ;
dotenv.config()


app.use(express.json())





mongoose.set('debug', true)
mongoose.Promise = global.Promise
mongoose
    .connect(`mongodb://localhost:27017/${database}`)
    .then(() => {
        console.log(`connected to  ${database}`)
    })
    .catch(err => {
        console.log(err)
    })
app.use("/img",express.static('public/carIcons'))
app.use("/imgInsurance",express.static('public/InsuranceIcons'))
app.use(cors())

const options={
    definition:{
        openapi:'3.0.0',
        info : {
            title:'e-Constat Project',
            version:'1.0.0'
        },
        servers:[
            {
               url: 'http://localhost:3000/'
            }
        ]
    },
    apis:['./Routes/User.route.js']
    }
    
    const swaggerSpec=swaggerJSDoc(options)
    app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))




app.use("/user", UserRoute)
app.use("/car",CarRoute)
app.use("/insurance",InsuranceRoute)


//Pour les images
app.use(express.urlencoded({ extended: true }))

app.listen(port, hostname, () => {
    console.log(`Server running at https://${hostname}:${port}/`);
});


///////////////////////////////////////google auth

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));


app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
  });


function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
  }

  app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure'
  })
);


app.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.displayName}`);
  });

  app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Goodbye!');
  });

  app.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
  });