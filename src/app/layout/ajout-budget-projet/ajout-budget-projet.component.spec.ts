import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutBudgetProjetComponent } from './ajout-budget-projet.component';

describe('AjoutBudgetProjetComponent', () => {
  let component: AjoutBudgetProjetComponent;
  let fixture: ComponentFixture<AjoutBudgetProjetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutBudgetProjetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutBudgetProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
