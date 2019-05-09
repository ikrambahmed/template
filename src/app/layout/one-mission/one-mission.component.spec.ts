import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneMissionComponent } from './one-mission.component';

describe('OneMissionComponent', () => {
  let component: OneMissionComponent;
  let fixture: ComponentFixture<OneMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneMissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
