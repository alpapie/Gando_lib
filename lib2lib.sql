
/*==============================================================*/
/* Table: Admin                                                 */
/*==============================================================*/
create table Admin 
(
   id                   integer                        not null,
   Com_id               integer                        not null,
   constraint PK_ADMIN primary key (id)
);

/*==============================================================*/
/* Index: ADMIN_PK                                              */
/*==============================================================*/
create unique index ADMIN_PK on Admin (
id ASC
);

/*==============================================================*/
/* Table: Auteur                                                */
/*==============================================================*/
create table Auteur 
(
   id                   integer                        not null,
   nom                  varchar(254)                   null,
   prenom               varchar(254)                   null,
   numero               varchar(254)                   null,
   email                varchar(254)                   null,
   constraint PK_AUTEUR primary key (id),
   constraint AK_ID_AUTEUR unique (id)
);

/*==============================================================*/
/* Index: AUTEUR_PK                                             */
/*==============================================================*/
create unique index AUTEUR_PK on Auteur (
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
   Use_id               integer                        not null,
   Doc_id               integer                        not null,
   content              varchar(254)                   null,
   date              timestamp                      null,
   constraint PK_COMMENTAIRE primary key (id)
);

/*==============================================================*/
/* Index: COMMENTAIRE_PK                                        */
/*==============================================================*/
create unique index COMMENTAIRE_PK on Commentaire (
id ASC
);

/*==============================================================*/
/* Index: COMMENTE_FK                                           */
/*==============================================================*/
create index COMMENTE_FK on Commentaire (
Use_id ASC
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
   date              timestamp                      null,
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
   Use_id               integer                        not null,
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
   date              timestamp                      null,
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
/* Table: Ecrit                                                 */
/*==============================================================*/
create table Ecrit 
(
   id                   integer                        not null,
   Aut_id               integer                        not null,
   Doc_id               integer                        not null,
   date              datetime                       null,
   constraint PK_ECRIT primary key clustered (id)
);

/*==============================================================*/
/* Index: ECRIT_PK                                              */
/*==============================================================*/
create unique clustered index ECRIT_PK on Ecrit (
id ASC
);

/*==============================================================*/
/* Index: ASSOCIATION9_FK                                       */
/*==============================================================*/
create index ASSOCIATION9_FK on Ecrit (
Aut_id ASC
);

/*==============================================================*/
/* Table: Users                                                 */
/*==============================================================*/
create table Users 
(
   id                   integer                        not null,
   Com_id               integer                        not null,
   constraint PK_USERS primary key (id)
);

/*==============================================================*/
/* Index: USERS_PK                                              */
/*==============================================================*/
create unique index USERS_PK on Users (
id ASC
);

alter table Admin
   add constraint FK_ADMIN_APARTIENT_COMPTE foreign key (Com_id)
      references Compte (id)
      on update restrict
      on delete restrict;

alter table Commentaire
   add constraint FK_COMMENTA_COMMENTE_USERS foreign key (Use_id)
      references Users (id)
      on update restrict
      on delete restrict;

alter table Commentaire
   add constraint FK_COMMENTA_CONSERNE_DOCUMENT foreign key (Doc_id)
      references Documents (id)
      on update restrict
      on delete restrict;

alter table Documents
   add constraint FK_DOCUMENT_ENRERGIST_USERS foreign key (Use_id)
      references Users (id)
      on update restrict
      on delete restrict;

alter table Ecrit
   add constraint FK_ECRIT_ASSOCIATI_DOCUMENT foreign key (Doc_id)
      references Documents (id)
      on update restrict
      on delete restrict;

alter table Ecrit
   add constraint FK_ECRIT_ASSOCIATI_AUTEUR foreign key (Aut_id)
      references Auteur (id)
      on update restrict
      on delete restrict;

alter table Users
   add constraint FK_USERS_APARTIENT_COMPTE foreign key (Com_id)
      references Compte (id)
      on update restrict
      on delete restrict;

