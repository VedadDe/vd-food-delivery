create table preporuke
(
    id       serial               not null
        constraint preporuke_pk
            primary key,
    poruka   varchar,
    vidljivo boolean default true not null
);

alter table preporuke
    owner to postgres;

create unique index preporuke_id_uindex
    on preporuke (id);

INSERT INTO public.preporuke (id, poruka, vidljivo) VALUES (4, 'Naša dostava na Vašim vratima vrlo brzo- Vaš Hodžić', true);
INSERT INTO public.preporuke (id, poruka, vidljivo) VALUES (3, 'Preporuka sedmice- uz ćevape Coca-Cola gratis !', true);
INSERT INTO public.preporuke (id, poruka, vidljivo) VALUES (5, 'Najpovoljnija dostava u gradu!
', true);
INSERT INTO public.preporuke (id, poruka, vidljivo) VALUES (6, '2 po cijeni 1 samo danas - U2', true);
INSERT INTO public.preporuke (id, poruka, vidljivo) VALUES (2, 'Preporuka dana - restoran Milky', true);
INSERT INTO public.preporuke (id, poruka, vidljivo) VALUES (7, 'addasdasdsd', false);
INSERT INTO public.preporuke (id, poruka, vidljivo) VALUES (8, 'Nova akcija
', true);