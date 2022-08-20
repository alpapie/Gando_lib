const Document = require('../../models').document
const Auteur = require('../../models').auteur
const Ecrit = require('../../models').ecrit
const category = require('../../models').category
const Comment = require('../../models').commentaire
const User = require('../../models').user

const {getauteur,getcomment}=require('../controller/Dashboard/index')

const {Op}=require('sequelize')
const path = require('path')
let jwt=require('jsonwebtoken')

