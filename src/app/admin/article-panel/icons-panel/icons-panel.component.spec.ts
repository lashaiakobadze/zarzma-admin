import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsPanelComponent } from './icons-panel.component';

describe('IconsPanelComponent', () => {
  let component: IconsPanelComponent;
  let fixture: ComponentFixture<IconsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
