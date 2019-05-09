import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdMissionnaireComponent } from './ord-missionnaire.component';

describe('OrdMissionnaireComponent', () => {
  let component: OrdMissionnaireComponent;
  let fixture: ComponentFixture<OrdMissionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdMissionnaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdMissionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
