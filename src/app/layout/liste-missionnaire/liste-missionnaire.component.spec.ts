import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeMissionnaireComponent } from './liste-missionnaire.component';

describe('ListeMissionnaireComponent', () => {
  let component: ListeMissionnaireComponent;
  let fixture: ComponentFixture<ListeMissionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeMissionnaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeMissionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
