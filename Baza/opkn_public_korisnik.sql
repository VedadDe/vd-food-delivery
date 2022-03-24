create table korisnik
(
    id        serial not null
        constraint korisnik_pk
            primary key,
    name      varchar(900),
    telephone integer,
    email     varchar(900),
    password  varchar(900),
    visina    varchar,
    sirina    varchar
);

alter table korisnik
    owner to postgres;

INSERT INTO public.korisnik (id, name, telephone, email, password, visina, sirina) VALUES (2, 'Vedad', 61000000, 'stanlio.and.olio7@gmail.com', '$2b$10$LkBDnpfAM6kldjW6i4lhDetnUU4h3JRkjqaAYQjYtksgpuNWdbePq', '', '');
INSERT INTO public.korisnik (id, name, telephone, email, password, visina, sirina) VALUES (3, 'Vedad', 61000000, 'djana133@gmail.com', '$2b$10$GUGj/X0nh/lQGJzAoJyIKeayMxTgA43hs3BL/FFdYXszEV/gWuQ/2', '', '');
INSERT INTO public.korisnik (id, name, telephone, email, password, visina, sirina) VALUES (4, 'cofitigar', 61000000, 'hfhsfdus@jfsid.com', '$2b$10$JwuzisRTZOEx1YLo2nXyzOuIu1zcVE5SqP.hoeSaUJBguqesVXdwS', '', '');
INSERT INTO public.korisnik (id, name, telephone, email, password, visina, sirina) VALUES (5, 'kurto', 61000000, 'adfjsfiughdif@fsjdfiojsg.com', '$2b$10$VQsgn/rSM8NlXbRgpG6Gb..j43g.1SkzGQRFFJ5NJtE22I5Z6qw36', '', '');
INSERT INTO public.korisnik (id, name, telephone, email, password, visina, sirina) VALUES (6, 'neki momak', 61000000, 'neki@mail.com', '$2b$10$u6ASsojHZi.s4pr3/sFPYecHazUUk6nGzvMttqGJc4mAXAydBCfWW', '43.8587681', '18.420003599999998');
INSERT INTO public.korisnik (id, name, telephone, email, password, visina, sirina) VALUES (7, 'Vedad1', 61000000, 'kjbvcfg@kfghidf.com', '$2b$10$WQbtSDaXa5uFYdXmJEnt1e29XnlP.H6xl5/YoAq/jQ8LI7A5JC8xC', '43.8587681', '18.420003599999998');
INSERT INTO public.korisnik (id, name, telephone, email, password, visina, sirina) VALUES (12, 'Mrkva', 61000000, 'user@gmail.com', '$2b$10$I2lhM7JS0U.v4tuwsGHqE.e.p9pVUqcnLgCNoBshHNfpxCkujEXQu', '43.85769099433145', '18.41619810043693');
INSERT INTO public.korisnik (id, name, telephone, email, password, visina, sirina) VALUES (13, 'cofitigar', -1, 'admin@opkn.com', '$2b$10$Plrij3j3sMQYO96EZTnl6eph77K0kBRs7MXmO2jz/n.XXfsR1xbDu', '', '');
INSERT INTO public.korisnik (id, name, telephone, email, password, visina, sirina) VALUES (14, 'Mrkva345678', 1, 'milky@palacinak.com', '$2b$10$1fchjw4n3gcvJ0LyogxgkOd2CZ1TU95ZYtVeR3qLRrAPKVHW1fg92', '43.85778549999961', '18.41519008200123');
INSERT INTO public.korisnik (id, name, telephone, email, password, visina, sirina) VALUES (15, 'Vedadadas', 61000000, 'user@gmaidl.com', '$2b$10$hxfnrckxEwegMl7Qz1F.ZuJ5nt62D3/1ts3rkFZlu4TWpko5VCGmG', '', '');
INSERT INTO public.korisnik (id, name, telephone, email, password, visina, sirina) VALUES (16, 'Vedad radi', 61000000, 'milky@palacinaksdsd.com', '$2b$10$rPALSkmJ5jor6ldjc/3BpeVKLyDqaYsV.sNvKItJYJ6qYVDHmkeV6', '43.879623605971176', '18.411659177816972');
INSERT INTO public.korisnik (id, name, telephone, email, password, visina, sirina) VALUES (17, 'Vedad', 61000000, 'admin@ogfhgjpkn.com', '$2b$10$Jn8cD1btp3AUQomrRp5cX.leUfVhQd2UUUjAyOUL9L/A5Tmn.bwzO', '43.85866753157205', '18.418630308985996');
INSERT INTO public.korisnik (id, name, telephone, email, password, visina, sirina) VALUES (18, 'Vedad Delic', 33555225, 'user@gma1il.com', '$2b$10$iZlOeWAkxVw7oPBQiowIVu5tX42e1LwNb1bqYafY7irXNyg2kMR16', '43.85835809025164', '18.422127897556493');