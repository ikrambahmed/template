import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionaireComponent } from './missionaire.component';

describe('MissionaireComponent', () => {
  let component: MissionaireComponent;
  let fixture: ComponentFixture<MissionaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
