
/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render("dashboard", { user: 'Express' });
});*/
const express = require("express");
var router = express.Router();
var nodemailer = require('nodemailer');
var mydate = require('current-date');
const { pool } = require("../dbConfig");
const bcrypt = require("bcrypt");
const passport = require("passport");
const timestamp = require('time-stamp');
const flash = require("express-flash");
const notifier = require('node-notifier');
const session = require("express-session");
require("dotenv").config();
//const router = express();
//var router = express.Router();
var geodist = require('geodist')

const PORT = process.env.PORT || 3001;

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

router.get("/users/register", checkAuthenticated, (req, res) => {
    res.render("register.ejs");
});

router.get("/users/login", checkAuthenticated, (req, res) => {
    // flash sets a messages variable. passport sets the error message
    console.log(req.session.flash.error);
    res.render("login.ejs");
});
/*
router.get("/users/dashboard", checkNotAuthenticated, (req, res) => {
    console.log(req.isAuthenticated());
    res.render("dashboard", { user: req.user.name });
});
*/
router.get("/users/dashboard", checkNotAuthenticated, (req, res) => {
    pool.connect(function (err, client, done) {
        if (err) {
            res.end('{"error" : "Error", "status" : 500}');
        }
        client.query(`SELECT * from preporuke where vidljivo is true`, function (err, result) {
            done();

            if (err) {
                console.info(err);
                res.sendStatus(500);
            } else {
                console.info(result.rows);
                res.render('dashboard', {user: req.user.name, menu: result.rows});
            }
        });

        console.log(req.isAuthenticated());
        //res.render("dashboard", { user: req.user.name });
    });

});


router.get("/users/logout", (req, res) => {
    req.logout();
    res.render("index", { message: "You have logged out successfully" });
});

router.post("/users/register", async (req, res) => {
    let { name, email, password, password2, telephone, hValue, wValue } = req.body;

    let errors = [];

    console.log({
        name,
        email,
        password,
        password2,
        telephone,
        hValue,
        wValue
    });

    if (!name || !email || !password || !password2) {
        errors.push({ message: "Please enter all fields" });
    }

    if (password.length < 6) {
        errors.push({ message: "Password must be a least 6 characters long" });
    }

    if (password !== password2) {
        errors.push({ message: "Passwords do not match" });
    }

    if (errors.length > 0) {
        res.render("register", { errors, name, email, password, password2 });
    } else {
        hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        // Validation passed
        pool.query(
            `SELECT * FROM korisnik
        WHERE email = $1`,
            [email],
            (err, results) => {
                if (err) {
                    console.log(err);
                }
                console.log(results.rows);

                if (results.rows.length > 0) {
                    return res.render("register", {
                        message: "Email already registered"
                    });
                } else {
                    pool.query(
                        `INSERT INTO korisnik (name, email, password, telephone, sirina, visina)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id, password`,
                        [name, email, hashedPassword, telephone, hValue, wValue],
                        (err, results) => {
                            if (err) {
                                throw err;
                            }
                            console.log(results.rows);
                            req.flash("success_msg", "You are now registered. Please log in");
                            res.redirect("/users/login");
                        }
                    );
                }
            }
        );
    }
});

router.post(
    "/users/login",
    passport.authenticate("local", {
        successRedirect: "/users/dashboard",
        failureRedirect: "/users/login",
        failureFlash: true
    })
);

router.get('/users/svi/restorani', checkNotAuthenticated,  (req, res, next) =>{
    pool.connect(function (err, client, done) {
        if (err) {
            res.end('{"error" : "Error", "status" : 500}');

        }

        client.query(`SELECT * FROM restaurant where restaurant.aktivan is true order by id;`, [], function (err, result) {
            done();

            if (err) {
                console.info(err);
                res.sendStatus(500);
            } else {
                console.info(result.rows);
                res.render('indexx', { title: 'Express', restaurant: result.rows });
            }
        });






    });
});

router.get('/users/sva/jela', checkNotAuthenticated,  (req, res, next) =>{
    pool.connect(function (err, client, done) {
        if (err) {
            res.end('{"error" : "Error", "status" : 500}');
        }
        client.query(`SELECT distinct name FROM menu;`, [], function (err, result) {
            done();

            if (err) {
                console.info(err);
                res.sendStatus(500);
            } else {
                console.info(result.rows);
                res.render('svaJela', { title: 'Express', jela: result.rows });
            }
        });
    });
});


router.post("/users/sva/jela", async (req, res) => {
    let {jela} = req.body;


    console.log({
        jela
    });

    res.redirect('/users/jelo/'+jela)});






router.get('/users/jelo/:jela', checkNotAuthenticated,  (req, res, next) =>{
    var jela = req.params.jela;
    pool.connect(function (err, client, done) {
        if (err) {
            res.end('{"error" : "Error", "status" : 500}');
        }
        client.query(`select r.name as restoran, menu.name as jelo, menu.price as price, menu.id as id, menu.idrestorana as idrestorana from menu
inner join restaurant r on r.id = menu.idrestorana
 where menu.name = $1;`, [jela], function (err, result) {
            done();

            if (err) {
                console.info(err);
                res.sendStatus(500);
            } else {
                console.info(result.rows);
                res.render('jednoJelo', { title: 'Express', menu: result.rows,  user: req.user.id});
            }
        });
    });
});




















router.get('/users/svi/restorani//menu', checkNotAuthenticated, ((req, res, next) =>
res.redirect('/users/sva/jela')));


router.get('/users/moje/narudzbe', checkNotAuthenticated,  (req, res, next) =>{
    pool.connect(function (err, client, done) {
        if (err) {
            res.end('{"error" : "Error", "status" : 500}');
        }
        client.query(`select narudzba.id as id, narudzba.cijena as cijena, narudzba.kolicina as kolicina, r.name as restoran, m.name as jelo from narudzba
inner join restaurant r on r.id = narudzba.id_restorana
inner join menu m on m.id = narudzba.id_jela
 where id_kupca = $1;`, [req.user.id], function (err, result) {
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

router.get('/users/svi/restorani/:id', checkNotAuthenticated, (req, res, next) =>{
    var id = req.params.id;
    res.redirect('/users/svi/restorani/'+id+'/menu')

/*    pool.connect(function (err, client, done) {
        if (err) {
            res.end('{"error" : "Error", "status" : 500}');
        }
        client.query(`SELECT * FROM restaurant where id = id;`, [], function (err, result) {
            done();

            if (err) {
                console.info(err);
                res.sendStatus(500);
            } else {
                console.info(result.rows);
                res.render('pojedinacniRestoran', { title: 'Express', restaurant: result.rows, id : id });
            }
        });


    });*/
});

router.get('/users/svi/restorani/:id/menu', checkNotAuthenticated,(req, res, next) =>{
    var id = req.params.id;
    pool.connect(function (err, client, done) {
        if (err) {
            res.end('{"error" : "Error", "status" : 500}');
        }
        client.query(`SELECT * FROM menu where idrestorana = $1 and aktivno is true order by $1;`, [id], function (err, result) {
            done();

            if (err) {
                console.info(err);
                res.sendStatus(500);
            } else {
                console.info(result.rows);
                res.render('menu', { title: 'Express', menu: result.rows, id : id, user: req.user.id });
            }
        });


    });
});

        router.post("/naruci", async (req, res) => {
            let {restoran, jelo, korisnik, appt, komad, cijena} = req.body;
//apt vrijeme

            console.log({
                restoran,
                jelo,
                korisnik,
                appt,
                komad,
                cijena


        });
            console.log("PAZNJA!!!");
            console.log(mydate('date')
        );
            /*if(appt=='00:00:00'){
                appt=timestamp.utc('HH:mm:ss');
            }*/
          //  console.log(timestamp.utc('HH:mm:ss'));
            pool.query(
                `INSERT INTO narudzba (id_restorana, id_jela, id_kupca, vrijeme, kolicina, cijena, datum)
                        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [restoran, jelo, korisnik, appt, komad, cijena*komad, mydate('date')]);
            res.redirect('/users/potvrdi');
            //res.redirect('/users/svi/restorani/'+restoran+'/menu');
        });



router.get("/users/potvrdi", checkNotAuthenticated, (req, res) => {
    //nemoj zaboravit ugasit avast inace ne radi :)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'projekat.testiranje@gmail.com',
            pass: 'Sarajevo123'
        }
    });


    /*var transporter = nodemailer.createTransport({
        host: "gmail.com", // hostname
        secure: false, // use SSL
        port: 25, // port for secure SMTP
        auth: {
            user: 'projekat.testiranje@gmail.com',
            pass: 'Sarajevo123'
        },
        tls: {
            rejectUnauthorized: false
        }
    });*/




    var mailOptions = {
        from: 'projekat.testiranje@gmail.com',
        to: req.user.email,
        subject: 'Potvrda',
        text: 'Potvrda narudžbe!',
        html: '<h1 style="color: maroon">Vaša narudžba je zaprimljena</h1><hr><h2 style="color: brown">Uskoro cete biti obavjesteni o stanju</h2>'


    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log('greska'+error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    notifier.notify('Message');

// Object
    notifier.notify({
        title: 'Potvrda',
        message: 'Narudžba zaprimljena!'
    });
    console.log(req.user.email,"adresa");
    res.redirect('/users/svi/restorani');

});























router.get('/users/sve/akcije', checkNotAuthenticated,(req, res, next)=> {
    let id = req.user.id;
    pool.connect(function (err, client, done) {
        if (err) {
            res.end('{"error" : "Error", "status" : 500}');
        }
        client.query(`

SELECT akcija.id_restorana as restoran, akcija.cijena as nova_cijena,
       r.name as imerestorana
          , m.name as imejela, m.id as idjela, m.price as stara_cijena FROM akcija
          inner join menu m on akcija.id_jela = m.id
inner join restaurant r on r.id = akcija.id_restorana
 where akcija.aktivno = true ;`, function (err, result) {
            done();

            if (err) {
                console.info(err);
                res.sendStatus(500);
            } else {
                console.info(result.rows);
                res.render('sveAkcije', { title: 'Express', menu: result.rows, user: req.user.id });
            }
        });


    });
    //console.log( "ovo je moj menu ");
});








function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/users/dashboard");
    }
    next();
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/users/login");
}

module.exports = router;
