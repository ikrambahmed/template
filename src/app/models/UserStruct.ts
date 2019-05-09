import { DeptGen } from "./DeptGen";
import { User } from "./User";

export class UserStruct{
    
    constructor(public idUserStruct?:String , 
        public dateAffectation ?:Date , 
        public departement ?: DeptGen , 
        public utilisateur?:User

    ){
this.departement=new DeptGen() ; 
this.utilisateur=new User() ; 
    }
}