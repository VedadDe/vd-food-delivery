create table restaurant
(
    id        serial               not null
        constraint restaurant_pk
            primary key,
    name      varchar(900),
    stars     integer,
    food      varchar(900),
    address   varchar(890),
    telephone integer,
    email     varchar(900),
    password  varchar(900),
    sirina    varchar,
    visina    varchar,
    aktivan   boolean default true not null,
    slika     varchar
);

alter table restaurant
    owner to postgres;

INSERT INTO public.restaurant (id, name, stars, food, address, telephone, email, password, sirina, visina, aktivan, slika) VALUES (1, 'Mrkva', 5, 'Fast Food', 'Kosevska 5', 61000000, 'mrkva@cevap.com', '$2b$10$VJex82BkA9Ifj41Hv/AaPe/EVJJ9ts9q6mzqnI4buw9VMiexlIkly', '43.8594535', '18.4295361', true, 'https://sarajevo.travel/assets/photos/places/big/cevabdzinica-mrkva-1398092783.jpg');
INSERT INTO public.restaurant (id, name, stars, food, address, telephone, email, password, sirina, visina, aktivan, slika) VALUES (2, 'Hodzic', 5, 'Fast Food', 'Sutjeska', 61000000, 'stanlio.and.olio7@gmail.com', '$2b$10$qpY0I8KOLeT9D8CS7cHamutAiu1MQumpbgNjCNiQ62h9/OeBm.OU.', '43.8594535', '18.4295361', false, '');
INSERT INTO public.restaurant (id, name, stars, food, address, telephone, email, password, sirina, visina, aktivan, slika) VALUES (3, 'Zeljo', 4, 'Fast Food', 'Kralja', 416777, 'zeljo@zeljo.com', '$2b$10$nUBi5Kcl1CGgJlHiTnMuaOaOIrLl2WR914iA9mGptRS37Q/ToDecS', '43.8594535', '18.4295361', true, 'https://media-cdn.tripadvisor.com/media/photo-s/0b/4d/5f/74/8260522002-4-zeljo-restaurant.jpg');
INSERT INTO public.restaurant (id, name, stars, food, address, telephone, email, password, sirina, visina, aktivan, slika) VALUES (6, 'Hadzibajric', 5, 'Fast Food', 'Saraci', 61000000, 'hadzija@gmail.com', '$2b$10$0SH8RMA6hveuqdpoDRUoKu.8Iw2FnLWAxSjDRM0o0cQuIBfomPJNW', '43.8594535', '18.4295361', true, 'https://media-cdn.tripadvisor.com/media/photo-s/14/37/e7/04/ascinica.jpg');
INSERT INTO public.restaurant (id, name, stars, food, address, telephone, email, password, sirina, visina, aktivan, slika) VALUES (4, 'Hodzic2', 5, 'Fast Food', 'zmaja od bosne', 61000000, 'hodza@gmail.com', '$2b$10$Cozm27L0kth5e2kCE6.IAuQb9yY11Ur8RjkZ3IDqlA2P1Y6xk7kau', '43.8594535', '18.4295361', true, 'https://seeyounexttriptest2.files.wordpress.com/2012/09/wymanstocks-blog-wymanstocks-bosnia-sarajevo-058.jpg');
INSERT INTO public.restaurant (id, name, stars, food, address, telephone, email, password, sirina, visina, aktivan, slika) VALUES (8, 'Koko', 7, 'kafic', 'Sarajevo 71000, Bosna i Hercegovina', 61000000, 'kjzufhsoifksod@klgjiduf.com', '$2b$10$ecdhqcQ8K.p.XK4PxJtbReX4TJoUa6K4bWpr2EzhX1Fr1MD6SdgoG', '43.8594535', '18.4295361', true, 'https://storage.radiosarajevo.ba/image/372663/1180x732/pekara_Maison_Coco_6.jpg');
INSERT INTO public.restaurant (id, name, stars, food, address, telephone, email, password, sirina, visina, aktivan, slika) VALUES (9, 'Milky', 2, 'slasticarna', 'Ferhadija', 33559995, 'milky@palacinak.com', '$2b$10$lo7SYrjSMYVsXkcDmA6m7.4uQ.sA8KTZa3aNAgUbUFgpR0j4uuXWO', '43.8594535', '18.4295361', true, 'https://gastro.24sata.hr/media/img/85/71/5215bab65318d2f98723.jpeg');
INSERT INTO public.restaurant (id, name, stars, food, address, telephone, email, password, sirina, visina, aktivan, slika) VALUES (10, 'U2', 3, 'brza hrana', 'Kosevo', 888888888, 'u2@gmail.com', '$2b$10$AfKcLhnp/0uOyEKg9NO0t.Hof3WHe4IfbROuVn2Hr6jcav1fXKbvG', '43.8594535', '18.4295361', true, 'https://media-cdn.tripadvisor.com/media/photo-s/0e/c7/ca/e5/pizza-u2.jpg');
INSERT INTO public.restaurant (id, name, stars, food, address, telephone, email, password, sirina, visina, aktivan, slika) VALUES (5, 'Kurto', 5, 'Fast Food', 'Saraci', 61000000, 'kurto@g.com', '$2b$10$LqAYWek9T4UFxjDJQFUZ9u637ZliL01/DpUA4l8kwS0A1x62zChgK', '43.8594535', '18.4295361', true, 'https://sarajevo.travel/assets/photos/places/original/cevadbzinica-kurto-1397168262.jpg');
INSERT INTO public.restaurant (id, name, stars, food, address, telephone, email, password, sirina, visina, aktivan, slika) VALUES (25, 'Nune', 9, 'Fast Food', 'Ferhadija', 33555666, null, '$2b$10$LqAYWek9T4UFxjDJQFUZ9u637ZliL01/DpUA4l8kwS0A1x62zChgK', '43.8594535', '18.4295361', true, 'https://media-cdn.tripadvisor.com/media/photo-s/15/76/1e/97/einfach-aber-gut.jpg');
INSERT INTO public.restaurant (id, name, stars, food, address, telephone, email, password, sirina, visina, aktivan, slika) VALUES (26, 'Manolo', 5, 'kafic', 'bb', 61000000, 'manolo@opkn.com', '$2b$10$sPM9uUx/39RI3Wvf02uGteHgJJ9NKyNHw42dsHz.bP2R8Ym1EfiIy', null, null, true, 'https://media-cdn.tripadvisor.com/media/photo-s/0f/af/c7/09/the-one-and-only-manolo.jpg');