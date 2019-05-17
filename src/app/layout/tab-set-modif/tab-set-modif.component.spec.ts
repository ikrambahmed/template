import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSetModifComponent } from './tab-set-modif.component';

describe('TabSetModifComponent', () => {
  let component: TabSetModifComponent;
  let fixture: ComponentFixture<TabSetModifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabSetModifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabSetModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
