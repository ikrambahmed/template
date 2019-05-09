import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutBudgetDeptComponent } from './ajout-budget-dept.component';

describe('AjoutBudgetDeptComponent', () => {
  let component: AjoutBudgetDeptComponent;
  let fixture: ComponentFixture<AjoutBudgetDeptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutBudgetDeptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutBudgetDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
