import { Motcle } from './Motcle';
import { DeptGen } from './DeptGen';
import { missionPK } from './missionPK';

export class Mission {
	public numMission: String;
	public code : String ; 
	public deptGen:DeptGen ; 
	public objeta: String;
	public objetl: String;
	public datdepP: Date;
	public datarrP: Date;
	public motcle: Motcle;
	
	constructor(
		numMission?:String , 
		code  ?:String,
		deptGen ?: DeptGen,
		objeta?: String,
		objetl?: String,
		datdepP?: Date,
		datarrP?: Date,
		motcle?: Motcle
	) 
	{
		this.deptGen=new DeptGen() ; 
		this.motcle = new Motcle();
		
	}
}