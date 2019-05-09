import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetProjComponent } from './budget-proj.component';

describe('BudgetProjComponent', () => {
  let component: BudgetProjComponent;
  let fixture: ComponentFixture<BudgetProjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetProjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetProjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
