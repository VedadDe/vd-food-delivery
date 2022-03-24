
/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render("dashboard", { user: 'Express' });
});*/
const express = require("express");
var router = express.Router();
const { pool } = require("../dbConfig");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const passport = require("passport");
const flash = require("express-flash");
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


router.get("/restaurants/login", checkAuthenticated, (req, res) => {
  // flash sets a messages variable. passport sets the error message
  console.log(req.session.flash.error);
  res.render("login.ejs");
});
router.get("/restaurants/register", checkAuthenticated, (req, res) => {
    // flash sets a messages variable. passport sets the error message
    console.log(req.session.flash.error);
    res.render("register.ejs");
});

router.get("/restaurants/dashboard", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  res.render("dashboard", { user: req.user.name });
});

router.get('/restaurants/dodaj/dostavljaca', checkNotAuthenticated,function(req, res, next) {
    res.render('registerDeliver');
});



router.get("/restaurants/logout", (req, res) => {
  req.logout();
  res.render("index", { message: "You have logged out successfully" });
});


router.post(
    "/restaurants/login",
    passport.authenticate("local", {
      successRedirect: "/restaurants/dashboard",
      failureRedirect: "/restaurants/login",
      failureFlash: true
    })
);

router.post("/restaurants/register", (req, res, next) => {
    let {email} = req.body;




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
        text: 'Potvrda o prijemu zahtjeva za suradnju. Bit ćete brzo kontaktirani. Hvala na povjerenju! ' ,
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














    console.log({email});
    res.redirect(req.get('referer'));
});



router.get('/restaurants/dodaj/jelo', checkNotAuthenticated,(req, res, next)=> {

    pool.connect(function (err, client, done) {
        if (err) {
            res.end('{"error" : "Error", "status" : 500}');
        }
        client.query(`

SELECT * from tipovi_hrane where vidljivo is true;`, function (err, result) {
            done();

            if (err) {
                console.info(err);
                res.sendStatus(500);
            } else {
                console.info(result.rows);
                res.render('registerJelo', {jelo: result.rows, id: req.user.id});
            }
        });


        //console.log(req.user.id, "ovo je id");
    });
})

router.post("/restaurants/dodaj/jelo", checkNotAuthenticated,async (req, res) => {
    let { name, price, restoran, slika } = req.body;


    console.log({
        name,
        price,
        slika,
        restoran
    });

    pool.query(
        `INSERT INTO menu (idrestorana, name, price, slika)
                VALUES ($1, $2, $3, $4)`,
        [restoran, name, price, slika],
        (err, results) => {
            if (err) {
                throw err;
            }
            //console.log(results.rows);
            //req.display("success_msg", "You are now registered. Please log in");
            res.redirect("/restaurants/dashboard");
        }
    );

});

router.get('/restaurants/moj/menu', checkNotAuthenticated,(req, res, next)=> {
    let id = req.user.id;
    pool.connect(function (err, client, done) {
        if (err) {
            res.end('{"error" : "Error", "status" : 500}');
        }
        client.query(`SELECT * FROM menu where idrestorana = $1 and menu.aktivno=true order by $1;`, [id], function (err, result) {
            done();

            if (err) {
                console.info(err);
                res.sendStatus(500);
            } else {
                console.info(result.rows);
                res.render('mojMenu', { title: 'Express', menu: result.rows, user: req.user.id });
            }
        });


    });
    //console.log( "ovo je moj menu ");
});

router.post("/stavi/na/akciju", checkNotAuthenticated,async (req, res) => {
    let {restoran, jelo, cijena} = req.body;


    console.log({
        restoran,
        jelo,
        cijena
    });
    pool.query(
        `INSERT INTO akcija (id_restorana, id_jela, cijena)
                VALUES ($1, $2, $3)`,
        [restoran, jelo, cijena]);
    pool.query(
        `Update menu 
        set aktivno = false
        where menu.id= $1` , [jelo]);


    res.redirect('/restaurants/moj/menu');
    //res.redirect('/users/svi/restorani/'+restoran+'/menu');
});





router.get('/restaurants/moje/narudzbe', checkNotAuthenticated,  (req, res, next) =>{
    pool.connect(function (err, client, done) {
        if (err) {
            res.end('{"error" : "Error", "status" : 500}');
        }
        client.query(`select narudzba.id as id, narudzba.id_kupca as kupac, r.name as restoran, m.name as jelo from narudzba
        
inner join restaurant r on r.id = narudzba.id_restorana
inner join menu m on m.id = narudzba.id_jela
 where id_restorana = $1 and dostavljeno = false;`, [req.user.id], function (err, result) {
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











router.get('/restaurants/moje/akcije', checkNotAuthenticated,(req, res, next)=> {
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
 where idrestorana = $1 and akcija.aktivno = true order by $1;`,[id], function (err, result) {
            done();

            if (err) {
                console.info(err);
                res.sendStatus(500);
            } else {
                console.info(result.rows);
                res.render('mojaAkcija', { title: 'Express', menu: result.rows, user: req.user.id });
            }
        });


    });
    //console.log( "ovo je moj menu ");
});


router.post("/ukini/akciju", async (req, res) => {
    let {jelo} = req.body;


    console.log({
        jelo
    });
    pool.query(
        `Update menu 
        set aktivno = true
        where menu.id= $1` , [jelo]);

    pool.query(
        `Update akcija
        set aktivno = false
        where id_jela= $1` , [jelo]);

    res.redirect('/restaurants/moje/akcije');
    //res.redirect('/users/svi/restorani/'+restoran+'/menu');
});



router.post("/izbrisi/jelo", async (req, res) => {
    let {jelo} = req.body;


    console.log({
        jelo
    });
    pool.query(
        `Update menu 
        set aktivno = false
        where menu.id= $1` , [jelo]);

    res.redirect('/restaurants/moj/menu');
    //res.redirect('/users/svi/restorani/'+restoran+'/menu');
});





router.post("/restaurants/dodaj/dostavljaca",checkNotAuthenticated, async (req, res) => {
    let { name, email, password, telephone } = req.body;

    let errors = [];

    console.log({
        name,
        email,
        password,
        telephone,

    });
    if (errors.length > 0) {
        res.render("restaurants/dodaj/dostavljaca", { errors, name, email, password });
    } else {
        hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        // Validation passed
        pool.query(
            `SELECT * FROM delivery
        WHERE email = $1`,
            [email],
            (err, results) => {
                if (err) {
                    console.log(err);
                }
                console.log(results.rows);

                if (results.rows.length > 0) {
                    return res.render("registerDeliver", {
                        message: "Email already registered"
                    });
                } else {
                    pool.query(
                        `INSERT INTO delivery (name, password, telephone, email)
                VALUES ($1, $2, $3, $4)
                RETURNING id, password`,
                        [name, hashedPassword, telephone, email],
                        (err, results) => {
                            if (err) {
                                throw err;
                            }
                            console.log(results.rows);
                            //req.display("success_msg", "You are now registered. Please log in");
                            res.redirect("/restaurants/pridruzi");
                        }
                    );
                }
            }
        );
    }
});



//ne radi
//nađi način da select pretvoris u int :)


router.get("/restaurants/pridruzi",checkNotAuthenticated, async (req, res) => {
//console.log("usao")



    pool.query(`Insert into restoran_dostava (id_kurira)
                select delivery.id from delivery order by id desc limit 1`);
    //console.log(x);


    /*pool.query(
        `INSERT INTO restoran_dostava (id_restorana, id_kurira)
                    VALUES ($1, $2)`,
        [req.user.id,  dost ]);*/
    res.redirect("/restaurants/pridruzi/1")



});

router.get("/restaurants/pridruzi/1",checkNotAuthenticated, async (req, res) => {
//console.log("usao")

    /*

        pool.query(`Insert into restoran_dostava (id_kurira)
                    select delivery.id from delivery order by id desc limit 1`);
        //console.log(x);
    */
    pool.query(`
    UPDATE restoran_dostava
    SET    id_restorana = $1
    WHERE  id_restorana is null;

`,
        [req.user.id]);
    /*pool.query(
        `INSERT INTO restoran_dostava (id_restorana, id_kurira)
                    VALUES ($1, $2)`,
        [req.user.id,  dost ]);*/
    res.redirect("/restaurants/dashboard")



});












router.get('/restaurants/svi/dostavljaci', checkNotAuthenticated,  (req, res, next) =>{
    pool.connect(function (err, client, done) {
        if (err) {
            res.end('{"error" : "Error", "status" : 500}');
        }
        client.query(`select * from delivery;`, function (err, result) {
            done();

            if (err) {
                console.info(err);
                res.sendStatus(500);
            } else {
                console.info(result.rows);
                res.render('dostava', { title: 'Express', dostava: result.rows});
            }
        });
    });
});


router.get('/restaurants/moji/dostavljaci', checkNotAuthenticated,  (req, res, next) =>{
    pool.connect(function (err, client, done) {
        if (err) {
            res.end('{"error" : "Error", "status" : 500}');
        }
        client.query(`
select * from delivery
inner join restoran_dostava rd on delivery.id = rd.id_kurira
where rd.id_restorana = $1;`,[req.user.id], function (err, result) {
            done();

            if (err) {
                console.info(err);
                res.sendStatus(500);
            } else {
                console.info(result.rows);
                res.render('dostava1', { title: 'Express', dostava: result.rows});
            }
        });
    });
});














router.post("/zaposli", async (req, res) => {
    let {kurir} = req.body;


    console.log({
        kurir
    });
    pool.query(
        `INSERT INTO restoran_dostava (id_restorana, id_kurira)
                    VALUES ($1, $2)`,
        [req.user.id, kurir]);
    res.redirect('/restaurants/dashboard');
    //res.redirect('/users/svi/restorani/'+restoran+'/menu');
});




router.post("/otpremi", async (req, res) => {

    let {narudzba} = req.body;


    console.log({
        narudzba
    });

    pool.query(`
   
   
update narudzba
    set id_kurira=delivery.id
    from delivery
    inner join restoran_dostava rd on delivery.id = rd.id_kurira
    inner join restaurant r on rd.id_restorana = r.id
    inner join narudzba n on n.id_restorana = r.id
where delivery.id=(select delivery.id from delivery order by trenutne_narudzbe asc limit 1)
and n.id=$1 and delivery.id in (select id_kurira from restoran_dostava where n.id_restorana = $2 )
;`,[narudzba, req.user.id]);

    pool.query(`
    Update delivery
    Set trenutne_narudzbe = trenutne_narudzbe + 1
    Where delivery.id=( select delivery.id from delivery order by trenutne_narudzbe asc limit 1)
    `);


    res.redirect('/restaurants/dashboard');
    //res.redirect('/users/svi/restorani/'+restoran+'/menu');
});











function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/restaurants/dashboard");
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/restaurants/login");
}

module.exports = router;
