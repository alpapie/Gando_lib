/*==============================================================*/
/* DBMS name:      Sybase SQL Anywhere 12                       */
/* Created on:     09/07/2022 20:54:19                          */
/*==============================================================*/


if exists(select 1 from sys.sysforeignkey where role='FK_ADMIN_ASSOCIATI_COMPTE') then
    alter table Admin
       delete foreign key FK_ADMIN_ASSOCIATI_COMPTE
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_DOCUMENT_ASSOCIATI_COMMENTA') then
    alter table Documents
       delete foreign key FK_DOCUMENT_ASSOCIATI_COMMENTA
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_DOCUMENT_ASSOCIATI_USERS') then
    alter table Documents
       delete foreign key FK_DOCUMENT_ASSOCIATI_USERS
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_USERS_ASSOCIATI_COMPTE') then
    alter table Users
       delete foreign key FK_USERS_ASSOCIATI_COMPTE
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_USERS_ASSOCIATI_COMMENTA') then
    alter table Users
       delete foreign key FK_USERS_ASSOCIATI_COMMENTA
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_ASSOCIAT_ASSOCIATI_AUTEURS') then
    alter table association9
       delete foreign key FK_ASSOCIAT_ASSOCIATI_AUTEURS
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_ASSOCIAT_ASSOCIATI_DOCUMENT') then
    alter table association9
       delete foreign key FK_ASSOCIAT_ASSOCIATI_DOCUMENT
end if;

drop index if exists Admin.ASSOCIATION2_FK;

drop index if exists Admin.ADMIN_PK;

drop table if exists Admin;

drop index if exists Auteurs.AUTEURS_AK;

drop table if exists Auteurs;

drop index if exists Category.CATEGORY_PK;

drop table if exists Category;

drop index if exists Commentaire.COMMENTAIRE_PK;

drop table if exists Commentaire;

drop index if exists Compte.COMPTE_PK;

drop table if exists Compte;

drop index if exists Documents.ASSOCIATION7_FK;

drop index if exists Documents.ASSOCIATION3_FK;

drop index if exists Documents.DOCUMENTS_PK;

drop table if exists Documents;

drop index if exists Users.ASSOCIATION8_FK;

drop index if exists Users.ASSOCIATION1_FK;

drop index if exists Users.USERS_PK;

drop table if exists Users;

drop index if exists association9.ASSOCIATION9_FK;

drop index if exists association9.ASSOCIATION9_PK;

drop table if exists association9;

/*==============================================================*/
/* Table: Admin                                                 */
/*==============================================================*/
create table Admin 
(
   id                   integer                        not null,
   Com_id               integer                        null,
   constraint PK_ADMIN primary key (id)
);

/*==============================================================*/
/* Index: ADMIN_PK                                              */
/*==============================================================*/
create unique index ADMIN_PK on Admin (
id ASC
);

/*==============================================================*/
/* Index: ASSOCIATION2_FK                                       */
/*==============================================================*/
create index ASSOCIATION2_FK on Admin (
Com_id ASC
);

/*==============================================================*/
/* Table: Auteurs                                               */
/*==============================================================*/
create table Auteurs 
(
   id                   integer                        null,
   nom                  varchar(254)                   null,
   prenom               varchar(254)                   null,
   email                varchar(254)                   null,
   numero               varchar(254)                   null,
   constraint AK_ID_AUTEURS unique (id)
);

/*==============================================================*/
/* Index: AUTEURS_AK                                            */
/*==============================================================*/
create unique index AUTEURS_AK on Auteurs (
id ASC
);

/*==============================================================*/
/* Table: Category                                              */
/*==============================================================*/
create table Category 
(
   id                   integer                        not null,
   intituler            varchar(254)                   null,
   constraint PK_CATEGORY primary key (id)
);

/*==============================================================*/
/* Index: CATEGORY_PK                                           */
/*==============================================================*/
create unique index CATEGORY_PK on Category (
id ASC
);

/*==============================================================*/
/* Table: Commentaire                                           */
/*==============================================================*/
create table Commentaire 
(
   id                   integer                        not null,
   content              varchar(254)                   null,
   "date"               timestamp                      null,
   constraint PK_COMMENTAIRE primary key (id)
);

/*==============================================================*/
/* Index: COMMENTAIRE_PK                                        */
/*==============================================================*/
create unique index COMMENTAIRE_PK on Commentaire (
id ASC
);

/*==============================================================*/
/* Table: Compte                                                */
/*==============================================================*/
create table Compte 
(
   id                   integer                        not null,
   nom                  varchar(254)                   null,
   prenom               varchar(254)                   null,
   email                varchar(254)                   null,
   password             varchar(254)                   null,
   numero               varchar(254)                   null,
   adress               varchar(254)                   null,
   adress1              varchar(254)                   null,
   adress2              varchar(254)                   null,
   entreprise           varchar(254)                   null,
   "date"               timestamp                      null,
   constraint PK_COMPTE primary key (id)
);

/*==============================================================*/
/* Index: COMPTE_PK                                             */
/*==============================================================*/
create unique index COMPTE_PK on Compte (
id ASC
);

/*==============================================================*/
/* Table: Documents                                             */
/*==============================================================*/
create table Documents 
(
   id                   integer                        not null,
   Com_id               integer                        null,
   Use_id               integer                        null,
   titre                varchar(254)                   null,
   commentaire          varchar(254)                   null,
   langue               varchar(254)                   null,
   annee                timestamp                      null,
   editeur              varchar(254)                   null,
   page                 integer                        null,
   fichier              varchar(254)                   null,
   isbn10               varchar(254)                   null,
   types                varchar(254)                   null,
   category             varchar(254)                   null,
   "date"               timestamp                      null,
   note                 integer                        null,
   constraint PK_DOCUMENTS primary key (id)
);

/*==============================================================*/
/* Index: DOCUMENTS_PK                                          */
/*==============================================================*/
create unique index DOCUMENTS_PK on Documents (
id ASC
);

/*==============================================================*/
/* Index: ASSOCIATION3_FK                                       */
/*==============================================================*/
create index ASSOCIATION3_FK on Documents (
Com_id ASC
);

/*==============================================================*/
/* Index: ASSOCIATION7_FK                                       */
/*==============================================================*/
create index ASSOCIATION7_FK on Documents (
Use_id ASC
);

/*==============================================================*/
/* Table: Users                                                 */
/*==============================================================*/
create table Users 
(
   id                   integer                        not null,
   Com_id               integer                        null,
   Com_id2              integer                        null,
   constraint PK_USERS primary key (id)
);

/*==============================================================*/
/* Index: USERS_PK                                              */
/*==============================================================*/
create unique index USERS_PK on Users (
id ASC
);

/*==============================================================*/
/* Index: ASSOCIATION1_FK                                       */
/*==============================================================*/
create index ASSOCIATION1_FK on Users (
Com_id2 ASC
);

/*==============================================================*/
/* Index: ASSOCIATION8_FK                                       */
/*==============================================================*/
create index ASSOCIATION8_FK on Users (
Com_id ASC
);

/*==============================================================*/
/* Table: association9                                          */
/*==============================================================*/
create table association9 
(
   id                   integer                        not null,
   constraint PK_ASSOCIATION9 primary key clustered (id)
);

/*==============================================================*/
/* Index: ASSOCIATION9_PK                                       */
/*==============================================================*/
create unique clustered index ASSOCIATION9_PK on association9 (
id ASC
);

/*==============================================================*/
/* Index: ASSOCIATION9_FK                                       */
/*==============================================================*/
create index ASSOCIATION9_FK on association9 (

);

alter table Admin
   add constraint FK_ADMIN_ASSOCIATI_COMPTE foreign key (Com_id)
      references Compte (id)
      on update restrict
      on delete restrict;

alter table Documents
   add constraint FK_DOCUMENT_ASSOCIATI_COMMENTA foreign key (Com_id)
      references Commentaire (id)
      on update restrict
      on delete restrict;

alter table Documents
   add constraint FK_DOCUMENT_ASSOCIATI_USERS foreign key (Use_id)
      references Users (id)
      on update restrict
      on delete restrict;

alter table Users
   add constraint FK_USERS_ASSOCIATI_COMPTE foreign key (Com_id2)
      references Compte (id)
      on update restrict
      on delete restrict;

alter table Users
   add constraint FK_USERS_ASSOCIATI_COMMENTA foreign key (Com_id)
      references Commentaire (id)
      on update restrict
      on delete restrict;

alter table association9
   add constraint FK_ASSOCIAT_ASSOCIATI_AUTEURS foreign key ()
      references Auteurs
      on update restrict
      on delete restrict;

alter table association9
   add constraint FK_ASSOCIAT_ASSOCIATI_DOCUMENT foreign key (id)
      references Documents (id)
      on update restrict
      on delete restrict;

