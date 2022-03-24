create table kupac
(
    id      serial not null
        constraint kupac_pk
            primary key,
    ime     varchar(900),
    prezime varchar(900),
    adresa  varchar(900),
    telefon varchar(900),
    email   varchar(900),
    sifra   varchar(900)
);

alter table kupac
    owner to postgres;

