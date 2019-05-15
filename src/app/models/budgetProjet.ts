import { DeptGen } from './DeptGen';
import { Projet } from './Projet';

export class budgetProjet {

    public  codPrj : String ; 	
	public  annee: Date ; 
	public  reference:String ; 
    public  valeur :Number ; 
    public  dateBproj:Date;  
	public  dateVal:Date ; 
	public  typeBudgetp :String;
	public  code :DeptGen; 
    public  codUtil:String ;
    public projet : Projet ; 
    constructor(   codPrj ?: String ,	
          annee?: Date ,
          reference?:String ,
          valeur ?:Number , 
          dateBproj?:Date,
          dateVal?:Date , 
          typeBudgetp ?:String , 
          code ?:DeptGen , 
          projet ?:Projet,
          codUtil?:String   ) {
          this.code=new DeptGen() ; 
          } 
}
