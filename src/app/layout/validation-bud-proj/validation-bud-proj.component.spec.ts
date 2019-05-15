import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationBudProjComponent } from './validation-bud-proj.component';

describe('ValidationBudProjComponent', () => {
  let component: ValidationBudProjComponent;
  let fixture: ComponentFixture<ValidationBudProjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationBudProjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationBudProjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
