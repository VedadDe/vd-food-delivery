//https://github.com/bradtraversy/chatcord
//sa pomenute stranice chat preuzet// Urađen po tutorijalu
/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render("dashboard", { user: 'Express' });
});*/
const express = require("express");
var router = express.Router();
var mydate = require('current-date');
var nodemailer = require('nodemailer');
const { pool } = require("../dbConfig");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
require("dotenv").config();
//const router = express();
//var router = express.Router();

const PORT = process.env.PORT || 3005;

const initializePassport = require("../passportConfig");

initializePassport(passport);

// Middleware

// Parses details from a form
router.use(express.urlencoded({ extended: false }));
//router.set("view engine", "ejs");

router.use(
    session({
      // Key we want to keep secret which will encrypt all of our information
      secret: process.env.SESSION_SECRET,
      // Should we resave our session variables if nothing has changes which we dont
      resave: false,
      // Save empty value if there is no vaue which we do not want to do
      saveUninitialized: false
    })
);
// Funtion inside passport which initializes passport
router.use(passport.initialize());
// Store our variables to be persisted across the whole session. Works with router.use(Session) above
router.use(passport.session());
router.use(flash());

router.get("/", (req, res) => {
  res.render("index");
});


router.get("/delivery/login", checkAuthenticated, (req, res) => {
  // flash sets a messages variable. passport sets the error message
  console.log(req.session.flash.error);
  res.render("login.ejs");
});

router.get("/delivery/dashboard", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  res.render("dashboard", { user: req.user.name });
});




router.get("/delivery/logout", (req, res) => {
  req.logout();
  res.render("index", { message: "You have logged out successfully" });
});


router.post(
    "/delivery/login",
    passport.authenticate("local", {
      successRedirect: "/delivery/dashboard",
      failureRedirect: "/delivery/login",
      failureFlash: true
    })
);







router.get('/delivery/moje/narudzbe', checkNotAuthenticated,  (req, res, next) =>{
    pool.connect(function (err, client, done) {
        if (err) {
            res.end('{"error" : "Error", "status" : 500}');
        }
        client.query(`select narudzba.id as id,narudzba.cijena as cijena,  narudzba.id_kupca as kupac_id,
        r.name as restoran, r.email as email, m.name as jelo, k.telephone as telefon, k.name as kupac, k.email as mail
        from narudzba

inner join restaurant r on r.id = narudzba.id_restorana
inner join menu m on m.id = narudzba.id_jela
inner join korisnik k on k.id = narudzba.id_kupca
 where id_kurira = $1 and datum = $2 and dostavljeno=$3;`, [req.user.id, mydate('date'), false], function (err, result) {
            done();

            if (err) {
                console.info(err);
                res.sendStatus(500);
            } else {
                console.info(result.rows);
                res.render('narudzbe', { title: 'Express', narudzbe: result.rows});
            }
        });
    });
});



router.post("/mapa", async (req, res) => {

    var {kupac} = req.body;

    console.log(
        'proab',
        kupac,


    );

    pool.connect(function (err, client, done) {
        if (err) {
            res.end('{"error" : "Error", "status" : 500}');
        }
        client.query(`
select * from korisnik where id = $1`,[kupac], function (err, result) {
            done();

            if (err) {
                console.info(err);
                res.sendStatus(500);
            } else {

                res.render('mapa', { korisnik: result.rows});
            }
        });
    });





});




router.post("/dostavio", async (req, res) => {

    var {narId, email, mail, dostavio} = req.body;


    console.log({
        narId,
        email,
        mail,
        dostavio
    });
 var boolean=dostavio;
    if (boolean==1){
    pool.query(`


update narudzba
    set dostavljeno=true
    where narudzba.id=$1

;`,[narId]);



    //nemoj zaboravit ugasit avast inace ne radi :)


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'projekat.testiranje@gmail.com',
            pass: 'Sarajevo123'
        }
    });




    var mailOptions = {
        from: 'projekat.testiranje@gmail.com',
        to: email,
        subject: 'Potvrda',
        text: 'Potvrda o isporuci narudžbe broj: ' + narId,
        //html: '<h1 style="color: maroon">Vaša narudžba je uspješno odstavljena</h1><hr>'


    };

    var mailOptions1 = {
        from: 'projekat.testiranje@gmail.com',
        to: mail,
        subject: 'Hvala sto koristite usluge projekata dostave!',
        text: 'Izvršen je prijem isporuke narudžbe broj: ' + narId + "molim popunite anketu o uslugama na linku: " +
            "https://forms.gle/F3JK8QbYWF8p9hrEA",
        //html: '<h1 style="color: maroon">Vaša narudžba je uspješno odstavljena</h1><hr>'


    };



    transporter.sendMail(mailOptions,
        function(error, info){
            if (error) {
                console.log('greska'+error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    transporter.sendMail(mailOptions1,
        function(error, info){
            if (error) {
                console.log('greska'+error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });}
    else {


        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'projekat.testiranje@gmail.com',
                pass: 'Sarajevo123'
            }
        });




        var mailOptions = {
            from: 'projekat.testiranje@gmail.com',
            to: email,
            subject: 'Neuspjela dostava',
            text: 'Kurir na žalost nije uspio dostavit Vašu narudžbu broj: ' + narId,
            //html: '<h1 style="color: maroon">Vaša narudžba je uspješno odstavljena</h1><hr>'


        };

        var mailOptions1 = {
            from: 'projekat.testiranje@gmail.com',
            to: mail,
            subject: 'Neuspjela dostava',
            text: 'Nemogućnost prijema isporuke narudžbe broj: ' + narId,
            //html: '<h1 style="color: maroon">Vaša narudžba je uspješno odstavljena</h1><hr>'


        };



        transporter.sendMail(mailOptions,
            function(error, info){
                if (error) {
                    console.log('greska'+error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

        transporter.sendMail(mailOptions1,
            function(error, info){
                if (error) {
                    console.log('greska'+error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });




    }










    res.redirect('/delivery/dashboard');
    //res.redirect('/users/svi/restorani/'+restoran+'/menu');
});










function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/delivery/dashboard");
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/delivery/login");
}

module.exports = router;
