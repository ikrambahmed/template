import { DeptGen } from './DeptGen';

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
    constructor(   codPrj ?: String ,	
          annee?: Date ,
          reference?:String ,
          valeur ?:Number , 
          dateBproj?:Date,
          dateVal?:Date , 
          typeBudgetp ?:String , 
          code ?:DeptGen , 
          codUtil?:String   ) {
          this.code=new DeptGen() ; 
          } 
}
