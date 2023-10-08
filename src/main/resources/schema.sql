create table nyilvantartas (
    ID int auto_increment,
    Nev varchar(255) NOT NULL,
    Fuvar_Kezdet datetime NOT NULL,
    Fuvar_Vege datetime not null,
    Fuvar_Ido time NOT NULL,
    Piheno_STOP time NOT NULL,
    Pihen boolean null_to_default,
    Szallitmany varchar(255) not null,
    Uticel varchar(255) not null,
    Ceg_Uticel varchar(255) not null
);

insert into nyilvantartas(id, nev, fuvar_kezdet, fuvar_vege, fuvar_ido, piheno_stop, pihen, szallitmany, uticel, ceg_uticel)
values (1, 'Koczka Géza', '2023-10-07 00:41:20', '2023-10-08 18:30:05', '08:10:10', '00:00:00', 0, 'Kokain', 'Rotterdam - Hollandia', 'Rafael és Rómeó KFT.' );