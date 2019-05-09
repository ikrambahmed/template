import { grade } from './grade';
import { fonction } from './fonction';
import { classe } from './classe';
import { categorie } from './categorie';
import { DeptGen } from './DeptGen';

export class Missionnaire {


  cin: String;
  matricule: String;
  nom: String;
  nomL: String;
  prenom: String;
  place_cin :String ;
  date_cin :Date ; 
  prenomL: String;
  nationalite: String;
  nationaliteL: String;
  datenaissance: Date;
  place_naissance: String;
  rib: String;
  niveau: String;
  ministr: String;
  groupe: String;
  graade: grade;
  fonnction: fonction;
  classgrd: classe;
  codCat: categorie;
  code:DeptGen ;
  codgrp:String ;
  constructor(
    cin?: String,
    matricule?: String,
    nom?: String,
    nomL?: String,
    prenom?: string,
    prenomL?: String,
    nationalite?: String,
    nationaliteL?: String,
    datenaissance?: Date,
    place_naissance?: String,
    rib?: String,
    date_cin?: Date,
    place_cin?: String,
    niveau?: String,
    ministr?: String,
    groupe?: String,
    graade?: grade,
    fonnction?: fonction,
    classgrd?: classe,
    codCat?: categorie,
    code?:String ,
    dept ?:DeptGen ,
    codgrp?:String 
    // public  group?:number ,
    //   public  dept?:number 
  ) {
    // public  group?:number ,
    // public  dept?:number 
    this.code=new DeptGen() ; 
    this.graade = new grade();
    this.fonnction = new fonction();
    this.classgrd = new classe();
    this.codCat = new categorie();

  };

}