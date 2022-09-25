import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChantPanelComponent } from './chant-panel.component';

describe('ChantPanelComponent', () => {
  let component: ChantPanelComponent;
  let fixture: ComponentFixture<ChantPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChantPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChantPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
