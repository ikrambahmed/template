import { DeptGen } from "./DeptGen";

export class Projet {
	    public  libprjA?:String ;
	    public  libPrjL?:String ; 
    public codPrj?:String;
    public code?:String;
    public dept?:DeptGen ; 

    constructor(   libprjA?:String , 
        libPrjL?:String,
        codPrj?:String,
        code?:String , 
        dept? :DeptGen , 
     ) {
         this.dept=new DeptGen() ; 
     } 
}
