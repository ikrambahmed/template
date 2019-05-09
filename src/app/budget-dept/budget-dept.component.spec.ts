import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetDeptComponent } from './budget-dept.component';

describe('BudgetDeptComponent', () => {
  let component: BudgetDeptComponent;
  let fixture: ComponentFixture<BudgetDeptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetDeptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
