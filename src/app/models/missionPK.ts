import { DeptGen } from './DeptGen';

export class missionPK {
    public numMission: String;
	public code:DeptGen ; 
    constructor(numMission?:String , code  ?:DeptGen)
    {
        this.code=new DeptGen() ;
    }
}
