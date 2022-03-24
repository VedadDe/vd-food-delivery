create table akcija
(
    id           serial               not null
        constraint akcija_pk
            primary key,
    aktivno      boolean default true not null,
    id_jela      integer
        constraint akcija_menu_id_fk
            references menu,
    id_restorana integer
        constraint akcija_restaurant_id_fk
            references restaurant,
    cijena       integer
);

alter table akcija
    owner to postgres;

INSERT INTO public.akcija (id, aktivno, id_jela, id_restorana, cijena) VALUES (7, false, 16, 9, 1);
INSERT INTO public.akcija (id, aktivno, id_jela, id_restorana, cijena) VALUES (6, false, 16, 9, 1);
INSERT INTO public.akcija (id, aktivno, id_jela, id_restorana, cijena) VALUES (5, true, 15, 9, 2);
INSERT INTO public.akcija (id, aktivno, id_jela, id_restorana, cijena) VALUES (8, false, 17, 9, 3);
INSERT INTO public.akcija (id, aktivno, id_jela, id_restorana, cijena) VALUES (10, false, 19, 9, 2);
INSERT INTO public.akcija (id, aktivno, id_jela, id_restorana, cijena) VALUES (11, false, 19, 9, 1);
INSERT INTO public.akcija (id, aktivno, id_jela, id_restorana, cijena) VALUES (12, true, 15, 9, 2);
INSERT INTO public.akcija (id, aktivno, id_jela, id_restorana, cijena) VALUES (9, false, 18, 9, 2);
INSERT INTO public.akcija (id, aktivno, id_jela, id_restorana, cijena) VALUES (13, false, 22, 9, 2);
INSERT INTO public.akcija (id, aktivno, id_jela, id_restorana, cijena) VALUES (14, true, 24, 9, 2);