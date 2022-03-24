create table restoran_dostava
(
    id_restorana integer
        constraint restoran_dostava_restaurant_id_fk
            references restaurant,
    id_kurira    integer
        constraint restoran_dostava_delivery_id_fk
            references delivery
);

alter table restoran_dostava
    owner to postgres;

INSERT INTO public.restoran_dostava (id_restorana, id_kurira) VALUES (9, 27);
INSERT INTO public.restoran_dostava (id_restorana, id_kurira) VALUES (9, 28);
INSERT INTO public.restoran_dostava (id_restorana, id_kurira) VALUES (9, 29);
INSERT INTO public.restoran_dostava (id_restorana, id_kurira) VALUES (9, 29);
INSERT INTO public.restoran_dostava (id_restorana, id_kurira) VALUES (9, 29);
INSERT INTO public.restoran_dostava (id_restorana, id_kurira) VALUES (9, 30);
INSERT INTO public.restoran_dostava (id_restorana, id_kurira) VALUES (9, 28);
INSERT INTO public.restoran_dostava (id_restorana, id_kurira) VALUES (9, 30);
INSERT INTO public.restoran_dostava (id_restorana, id_kurira) VALUES (9, 28);
INSERT INTO public.restoran_dostava (id_restorana, id_kurira) VALUES (9, 28);
INSERT INTO public.restoran_dostava (id_restorana, id_kurira) VALUES (9, 28);
INSERT INTO public.restoran_dostava (id_restorana, id_kurira) VALUES (9, 28);
INSERT INTO public.restoran_dostava (id_restorana, id_kurira) VALUES (9, 27);
INSERT INTO public.restoran_dostava (id_restorana, id_kurira) VALUES (9, 28);
INSERT INTO public.restoran_dostava (id_restorana, id_kurira) VALUES (9, 27);
INSERT INTO public.restoran_dostava (id_restorana, id_kurira) VALUES (9, 30);
INSERT INTO public.restoran_dostava (id_restorana, id_kurira) VALUES (9, 27);
INSERT INTO public.restoran_dostava (id_restorana, id_kurira) VALUES (9, 28);
INSERT INTO public.restoran_dostava (id_restorana, id_kurira) VALUES (9, 27);
INSERT INTO public.restoran_dostava (id_restorana, id_kurira) VALUES (9, 27);
INSERT INTO public.restoran_dostava (id_restorana, id_kurira) VALUES (9, 30);
INSERT INTO public.restoran_dostava (id_restorana, id_kurira) VALUES (9, 31);
INSERT INTO public.restoran_dostava (id_restorana, id_kurira) VALUES (9, 30);