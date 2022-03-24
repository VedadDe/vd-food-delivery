create table narudzba
(
    id           serial not null
        constraint narudzba_pk
            primary key,
    id_kupca     integer
        constraint narudzba_korisnik_id_fk
            references korisnik,
    id_jela      integer
        constraint narudzba_menu_id_fk
            references menu,
    id_restorana integer
        constraint narudzba_restaurant_id_fk
            references restaurant,
    datum        date,
    id_kurira    integer
        constraint narudzba_delivery_id_fk
            references delivery,
    vrijeme      time,
    kolicina     integer,
    cijena       integer,
    dostavljeno  boolean default false
);

alter table narudzba
    owner to postgres;

INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (74, 12, 1, 1, '2021-02-22', 31, '00:00:00', 1, 2, false);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (75, 12, 18, 9, '2021-02-23', 31, '02:03:00', 4, 12, false);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (76, 12, 15, 9, '2021-02-23', 31, '00:00:00', 4, 8, false);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (68, 12, 16, 9, '2021-02-14', 31, '00:00:00', 1, 3, false);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (54, 2, 3, 1, null, 31, '00:00:00', 3, null, false);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (66, 3, 6, 5, '2021-02-19', 31, '00:00:00', 1, 8, true);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (67, 12, 15, 9, '2021-02-19', 31, '00:00:00', 1, 2, true);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (59, 2, 15, 9, null, 31, '00:00:00', 1, 2, null);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (45, 3, 15, 9, null, 31, null, null, null, null);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (46, 3, 16, 9, null, 31, null, null, null, null);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (47, 2, 3, 1, null, 31, '00:00:00', null, null, null);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (48, 2, 4, 3, null, 31, '05:05:00', null, null, null);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (49, 2, 2, 2, null, 31, '00:00:00', null, null, null);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (50, 2, 5, 4, null, 31, '00:00:00', null, null, null);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (51, 2, 1, 2, null, 31, '00:00:00', null, null, null);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (52, 2, 3, 1, null, 31, '00:00:00', null, null, null);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (53, 2, 5, 4, null, 31, '04:05:00', null, null, null);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (55, 2, 10, 2, null, 31, '00:00:00', 1, null, null);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (56, 2, 4, 3, null, 31, '00:00:00', 1, 3, null);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (57, 2, 5, 4, null, 31, '00:00:00', 1, 9, null);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (58, 2, 3, 1, null, 31, '00:00:00', 5, 10, null);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (60, 2, 5, 4, null, 31, '00:00:00', 3, 27, null);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (61, 2, 16, 9, '2021-01-23', 31, '00:00:00', 1, 3, null);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (62, 3, 4, 3, '2021-01-23', 31, '00:00:00', 1, 3, null);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (63, 3, 6, 5, '2021-01-23', 31, '00:00:00', 1, 8, null);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (64, 3, 5, 4, '2021-01-23', 31, '00:00:00', 1, 9, null);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (65, 3, 4, 3, '2021-01-23', 31, '00:00:00', 1, 3, null);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (70, 12, 15, 9, '2021-02-19', 31, '00:00:00', 4, 8, false);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (69, 12, 18, 9, '2021-02-19', 31, '03:02:00', 5, 15, false);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (71, 12, 18, 9, '2021-02-22', 31, '00:00:00', 1, 3, false);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (44, 3, 16, 9, null, 31, null, 3, null, true);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (40, 3, 16, 9, null, 31, null, 2, null, true);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (73, 12, 16, 9, '2021-02-22', 31, '00:00:00', 5, 15, false);
INSERT INTO public.narudzba (id, id_kupca, id_jela, id_restorana, datum, id_kurira, vrijeme, kolicina, cijena, dostavljeno) VALUES (72, 12, 16, 9, '2021-02-23', 29, '15:04:00', 5, 15, true);