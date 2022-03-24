create table delivery
(
    id                serial not null
        constraint delivery_pk
            primary key,
    name              varchar(900),
    password          varchar(900),
    telephone         integer,
    email             varchar(900),
    trenutne_narudzbe integer default 0
);

alter table delivery
    owner to postgres;

INSERT INTO public.delivery (id, name, password, telephone, email, trenutne_narudzbe) VALUES (28, 'neki momak', null, null, 'dassfdgfhg@dsasfg.com', 8);
INSERT INTO public.delivery (id, name, password, telephone, email, trenutne_narudzbe) VALUES (27, 'Dino Merlin', '$2b$10$NMvOMYXSixZMg99A8Fei8.eSUSl8CrHlbhSsSbEd5ILXoAIcE1s2a', 61000000, 'milky@dostava.com', 8);
INSERT INTO public.delivery (id, name, password, telephone, email, trenutne_narudzbe) VALUES (29, 'Dostava test', '$2b$10$ZSP/YBlafb3DgxdqyoI5ye8Dvfrs4oPRMlh6KiUZb5r4J8HTc.mie', 61000000, 'dostava@palacinak.com', 8);
INSERT INTO public.delivery (id, name, password, telephone, email, trenutne_narudzbe) VALUES (30, 'Leo', '$2b$10$9/J10GZne25cYdbfk4Kpr.SD0Q8jpM9nDFbsO1W3/LblqTtCrfSWq', 61555222, 'milky@leo.com', 3);
INSERT INTO public.delivery (id, name, password, telephone, email, trenutne_narudzbe) VALUES (31, 'Vedad', '$2b$10$VdLs9KG0wSfx1wqMXGW3n.Mlo8ksDI71IrAX4mBA7fiKYV2iJPpES', 61000000, 'milky@palacina2k.com', 1);