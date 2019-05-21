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
	public duree : String ; 
	public annee :String; 
	
	constructor(
		numMission?:String , 
		code  ?:String,
		deptGen ?: DeptGen,
		objeta?: String,
		objetl?: String,
		datdepP?: Date,
		datarrP?: Date,
		motcle?: Motcle,
		annee?:String
	) 
	{
		this.deptGen=new DeptGen() ; 
		this.motcle = new Motcle();
		
	}
}