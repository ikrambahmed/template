import { DeptGen } from './DeptGen';

export class budget {
    public  annee : Date ; 	
	public  valeur_miss: Number ; 
	public  reference_mis:String ; 
    public  valeur_tr :Number ; 
    public  reference_tr : String ;
	public  date_val:Date ; 
	public  cod_util:String ; 
	public  type_budget :String;
	public  code :String; 
    public  date_budg:Date ;
    public depart: DeptGen ; 
    constructor(   annee ?: Date ,	
          valeur_miss?: Number , 
          reference_miss?:String ,
          valeur_tr ?:Number , 
          reference_tr?:String ,
          date_val?:Date ,
          cod_util?:String , 
          type_budget ?:String,
          code ?:String, 
          depart?:DeptGen, 
          date_budg?:Date  ) {
          this.depart=new DeptGen() ; 
          } 
}
