create table tipovi_hrane
(
    name     varchar,
    id       serial not null
        constraint tipovihrane_pk
            primary key,
    vidljivo boolean default true
);

alter table tipovi_hrane
    owner to postgres;

create unique index tipovihrane_id_uindex
    on tipovi_hrane (id);

INSERT INTO public.tipovi_hrane (name, id, vidljivo) VALUES ('Palacinci', 2, true);
INSERT INTO public.tipovi_hrane (name, id, vidljivo) VALUES ('Hamburger', 3, true);
INSERT INTO public.tipovi_hrane (name, id, vidljivo) VALUES ('Cevapi', 1, false);
INSERT INTO public.tipovi_hrane (name, id, vidljivo) VALUES ('Baklava', 5, true);
INSERT INTO public.tipovi_hrane (name, id, vidljivo) VALUES ('Krempita', 6, true);
INSERT INTO public.tipovi_hrane (name, id, vidljivo) VALUES ('Ruzica', 7, true);
INSERT INTO public.tipovi_hrane (name, id, vidljivo) VALUES ('Ražnjići', 8, true);
INSERT INTO public.tipovi_hrane (name, id, vidljivo) VALUES ('Sis cevap', 10, false);
INSERT INTO public.tipovi_hrane (name, id, vidljivo) VALUES ('Pizza', 11, false);
INSERT INTO public.tipovi_hrane (name, id, vidljivo) VALUES ('Buranija', 9, false);
INSERT INTO public.tipovi_hrane (name, id, vidljivo) VALUES ('Hurmasica', 12, true);