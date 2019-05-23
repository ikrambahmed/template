import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-fiche-blocage',
  templateUrl: './fiche-blocage.component.html',
  styleUrls: ['./fiche-blocage.component.scss']
})
export class FicheBlocageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  generate() {
    const doc = new jsPDF();
   doc.text('test', 10, 10);
   doc.autoTable({html: '#basic-table'});
   doc.save('table.pdf');
  }

}
