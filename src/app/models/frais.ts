import { Mission } from './mission';
import { ordMiss } from './Ord_Miss';
import { Missionnaire } from './missionnaire';
import { Pays } from './pays';
import { Projet } from './Projet';
import { TypeFrais } from './typeFrais';

export class frais {
    constructor(public numMission? : String ,
        public numord? : number , 
        public cin?  :String,
        public codPays?  :String , 
        public valeurP?:Number , 
        public valeurR?:Number , 
        public supporte ?:Number , 
        public codPrj ?:Projet , 
        public observ ?:String , 
        public  NVille?:String,
        public typFrais?:String,
        public  typetransport?:String ,
        public aobserv ?:String,
        public ordMis?:ordMiss ,
        public missionnaire?:Missionnaire,
        public pays?:Pays , 
        public duree?:String ,
        public supCode?:String ,


        public typFrais1?:TypeFrais)
         {
this.missionnaire=new Missionnaire() ;
            this.pays=new Pays() ; 
         } 
}
