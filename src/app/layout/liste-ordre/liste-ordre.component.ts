import { Component, OnInit } from '@angular/core';
import { OrdMissService } from 'src/app/services/ord-miss.service';
import { ordMiss } from 'src/app/models/Ord_Miss';

@Component({
  selector: 'app-liste-ordre',
  templateUrl: './liste-ordre.component.html',
  styleUrls: ['./liste-ordre.component.scss']
})
export class ListeOrdreComponent implements OnInit {
  ords:ordMiss[] ; 
cod:String ; 
selectedOrdre:ordMiss ; 
searchText:String ; 
operation:String ;
  constructor(private ordMissService : OrdMissService) { }

  ngOnInit() {
    var DeptGenVal = localStorage.getItem('deptGen') ; 
    var data = JSON.parse(DeptGenVal) ; 
    console.log('retrievedObject: ',data.departement.code) ;
    this.cod=data.departement.code;
    this.loadOrdMissionnaire() ; 

  }
  loadOrdMissionnaire(){
    this.ordMissService.getOrdsMiss(this.cod).subscribe(
      data => { this.ords=data},
      error => {console.log('an error occured') } , 
      () => {console.log('loading missionnaires was done ')}
    )

  }

}
