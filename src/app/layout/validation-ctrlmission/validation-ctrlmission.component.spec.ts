import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationCTRLMissionComponent } from './validation-ctrlmission.component';

describe('ValidationCTRLMissionComponent', () => {
  let component: ValidationCTRLMissionComponent;
  let fixture: ComponentFixture<ValidationCTRLMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationCTRLMissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationCTRLMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
