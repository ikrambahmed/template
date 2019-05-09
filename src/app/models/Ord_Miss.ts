import { Mission } from './mission';
import { DeptGen } from './DeptGen';
import { Missionnaire } from './missionnaire';

export class ordMiss {
    constructor(public numord? :Number ,
        public numMission?:String , 
       public mission ?: Mission ,
        public code ?: DeptGen ,
    public  datarrP?:Date , 
    public  datdepP?:Date ,
    public missionnaire ?: Missionnaire ,
    public  cin?:String ,
    public etat?:String 
    )
    {
        this.code = new DeptGen() ; 
        this.mission = new Mission () ; 
        this.missionnaire= new Missionnaire() ; 
    } 
}