import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeOrdreComponent } from './liste-ordre.component';

describe('ListeOrdreComponent', () => {
  let component: ListeOrdreComponent;
  let fixture: ComponentFixture<ListeOrdreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeOrdreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeOrdreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
