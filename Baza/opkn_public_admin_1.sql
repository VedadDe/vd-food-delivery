create table admin
(
    email    varchar,
    password varchar,
    id       serial not null
        constraint admin_pk
            primary key
);

alter table admin
    owner to postgres;

INSERT INTO public.admin (email, password, id) VALUES ('admin@opkn.com', '$2a$10$8AEWi5prsoMFhrnropCkWeZykWXfEM2spQLhwnyAg5fk/LX/vDARK', 2);