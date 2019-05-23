import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheBlocageComponent } from './fiche-blocage.component';

describe('FicheBlocageComponent', () => {
  let component: FicheBlocageComponent;
  let fixture: ComponentFixture<FicheBlocageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheBlocageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheBlocageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
