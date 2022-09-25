import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EparchyPanelComponent } from './eparchy-panel.component';

describe('EparchyPanelComponent', () => {
  let component: EparchyPanelComponent;
  let fixture: ComponentFixture<EparchyPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EparchyPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EparchyPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
