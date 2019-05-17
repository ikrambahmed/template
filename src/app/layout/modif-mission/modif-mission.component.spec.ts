import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifMissionComponent } from './modif-mission.component';

describe('ModifMissionComponent', () => {
  let component: ModifMissionComponent;
  let fixture: ComponentFixture<ModifMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifMissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
