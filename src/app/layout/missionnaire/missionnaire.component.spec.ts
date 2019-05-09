import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionnaireComponent } from './missionnaire.component';

describe('MissionnaireComponent', () => {
  let component: MissionnaireComponent;
  let fixture: ComponentFixture<MissionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionnaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
