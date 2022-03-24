
/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render("dashboard", { user: 'Express' });
});*/
const fs = require('fs');
const express = require("express");
var router = express.Router();
var nodemailer = require('nodemailer');
const { pool } = require("../dbConfig");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const notifier = require('node-notifier');
const session = require("express-session");
require("dotenv").config();
//const router = express();
//var router = express.Router();

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


router.get("/admin/login", checkAuthenticated, (req, res) => {
    // flash sets a messages variable. passport sets the error message
    console.log(req.session.flash.error);
    res.render("login.ejs");
});
/*
router.get("/admin/dashboard", checkNotAuthenticated, (req, res) => {
    console.log(req.isAuthenticated());

    res.render("dashboard", { user: req.user.name });
});*/
router.get("/admin/dashboard", checkNotAuthenticated, (req, res) => {

    pool.connect(function (err, client, done) {
        if (err) {
            res.end('{"error" : "Error", "status" : 500}');
        }
        client.query(`SELECT * from preporuke`, function (err, result) {
            done();

            if (err) {
                console.info(err);
                res.sendStatus(500);
            } else {
                console.info(result.rows);
                res.render('dashboard', {menu:result.rows});
            }
        });


    });
});

router.get('/admin/dodaj/restoran', function(req, res, next) {
    res.render('registerRestaurant');
});







router.get('/admin/pregled/restorana', checkNotAuthenticated,  (req, res, next) =>{
    pool.connect(function (err, client, done) {
        if (err) {
            res.end('{"error" : "Error", "status" : 500}');

        }

        client.query(`SELECT * FROM restaurant order by id;`, [], function (err, result) {
            done();

            if (err) {
                console.info(err);
                res.sendStatus(500);
            } else {
                console.info(result.rows);
                res.render('pregledRestorana', { title: 'Express', restaurant: result.rows });
            }
        });






    });
});






router.get('/admin/pregled/narudzbi', checkNotAuthenticated,  (req, res, next) =>{
    pool.connect(function (err, client, done) {
        if (err) {
            res.end('{"error" : "Error", "status" : 500}');

        }

        client.query(`SELECT * FROM narudzba order by id;`, [], function (err, result) {
            done();

            if (err) {
                console.info(err);
                res.sendStatus(500);
            } else {
                console.info(result.rows);
                res.render('pregledNarudzba', { title: 'Express', restaurant: result.rows });
            }
        });






    });
});







router.get('/admin/tipovi/hrane', function(req, res, next) {

    pool.connect(function (err, client, done) {
        if (err) {
            res.end('{"error" : "Error", "status" : 500}');
        }
        client.query(`SELECT * from tipovi_hrane`, function (err, result) {
            done();

            if (err) {
                console.info(err);
                res.sendStatus(500);
            } else {
                console.info(result.rows);
                res.render('tipoviHrane', {menu:result.rows});
            }
        });


    });
    //console.log( "ovo je moj menu ");
});






router.post("/azuriraj/jela", async (req, res) => {
    let {id, name, vidljivo} = req.body;


    console.log({
        id,
        name,
        vidljivo
    });
    pool.query(
        `update tipovi_hrane set name = $1, vidljivo = $2 where id = $3` , [ name, vidljivo, id]);

    res.redirect(req.get('referer'));

});


router.post("/dodaj/jelo", async (req, res) => {
    let {name} = req.body;


    console.log({

        name,

    });
    pool.query(
        `insert into tipovi_hrane  (name) values  ($1)` , [ name]);

    res.redirect(('/admin/tipovi/hrane'));

});


router.post("/azuriraj/narudzbe", async (req, res) => {
    let {id, kupac, restoran, jelo, kurir, kolicina, dostavljeno } = req.body;

console.log( "OVO JE NONO");
    console.log({

        id, kupac, restoran, jelo, kurir, kolicina, dostavljeno    });
    pool.query(
        `update narudzba set id_kupca =$1, id_jela =$2,  id_restorana=$3,  id_kurira=$4,  kolicina=$5,  dostavljeno=$6 where id = $7 `
        , [kupac, jelo, restoran, kurir, kolicina, dostavljeno, id]);

    res.redirect(req.get('referer'));

});


router.post("/azuriraj/restoran", async (req, res) => {
    let {id, name, aktivan, stars, food, telephone, address } = req.body;

    console.log( "OVO JE NONO");
    console.log({

        id, name, aktivan, stars, food, telephone, address
    });
    pool.query(
        `update restaurant set name =$1, aktivan =$2,  stars=$3,  food =$4,  telephone=$5,  address=$6 where id = $7 `
        , [name, aktivan, stars, food, telephone, address, id]);

    res.redirect(req.get('referer'));

});














router.post("/admin/dodaj/restoran", async (req, res) => {
    let { name, email, password, address, stars, food, telephone, slika} = req.body;

    let errors = [];

    console.log({
        name,
        email,
        password,
        address,
        stars,
        food,
        telephone


    });
    if (errors.length > 0) {
        res.render("admin/dodaj/restoran", { errors, name, email, password });
    } else {
        hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        // Validation passed
        pool.query(
            `SELECT * FROM restaurant
        WHERE email = $1`,
            [email],
            (err, results) => {
                if (err) {
                    console.log(err);
                }
                console.log(results.rows);

                if (results.rows.length > 0) {
                    return res.render("registerRestaurant", {
                        message: "Email already registered"
                    });
                } else {
                    pool.query(
                        `INSERT INTO restaurant (name, stars, food, address, telephone, email, password, slika)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING id, password`,
                        [name, stars, food, address, telephone, email, hashedPassword, slika],
                        (err, results) => {
                            if (err) {
                                throw err;
                            }
                            console.log(results.rows);
                            //req.display("success_msg", "You are now registered. Please log in");
                            res.redirect("/admin/dashboard");
                        }
                    );
                }
            }
        );
    }
});










router.post("/dodaj/preporuku", async (req, res) => {
    let {preporuka} = req.body;


    console.log({
        preporuka
    });
    pool.query(
        `insert into preporuke (poruka) values ($1)` , [ preporuka]);

    res.redirect(req.get('referer'));

});




router.post("/azuriraj/poruke", async (req, res) => {
    let {id, poruka, vidljivo} = req.body;


    console.log({
        id,
        poruka,
        vidljivo
    });
    pool.query(
        `update preporuke set poruka = $1, vidljivo = $2 where id = $3` , [ poruka, vidljivo, id]);

    res.redirect(req.get('referer'));

});








router.get ("/admin/izvjestaj",(req, res) => {


    pool.connect(function (err, client, done) {
        if (err) {
            res.end('{"error" : "Error", "status" : 500}');
        }
        client.query(`select r.name, count(*) as broj_narudzbi, sum(cijena) as profit from narudzba
inner join restaurant r on r.id = narudzba.id_restorana
group by r.name;`, function (err, result) {
            done();

            if (err) {
                console.info(err);
                res.sendStatus(500);
            } else {
                console.info(result.rows);
                res.redirect(req.get('referer'));



                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'projekat.testiranje@gmail.com',
                        pass: 'Sarajevo123'
                    }
                });

            var string="projekat proba";
            console.log(result.rows.length + "DUZINA")
            for(let i=0; i<result.rows.length; i++){
                string+=" ime restorana: " + String(result.rows[i].name) + " " + " br_narudzbi: "+
                    String(result.rows[i].broj_narudzbi) + " " + "profit: " + String(result.rows[i].profit)+"\n";
            }

                fs.writeFile('C:\\Users\\Vedad\\Desktop\\izvjestaj/izvjestaj.txt', string, err => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })

                var mailOptions = {
                    from: 'projekat.testiranje@gmail.com',
                    to: 'vedad.delic.student@gmail.com',///hard kodirana moj mail radi testiranja
                    subject: 'Izvjestaj',
                    text: string ,
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
















            }
        });


    });
});



router.get("/admin/logout", (req, res) => {
    req.logout();
    res.render("index", { message: "You have logged out successfully" });
});


router.post(
    "/admin/login",
    passport.authenticate("local", {
        successRedirect: "/admin/dashboard",
        failureRedirect: "/admin/login",
        failureFlash: true
    })
);







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
    res.redirect("/admin/login");
}

module.exports = router;
