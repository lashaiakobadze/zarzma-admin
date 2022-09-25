import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChantsPanelComponent } from './chants-panel.component';

describe('ChantsPanelComponent', () => {
  let component: ChantsPanelComponent;
  let fixture: ComponentFixture<ChantsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChantsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChantsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
