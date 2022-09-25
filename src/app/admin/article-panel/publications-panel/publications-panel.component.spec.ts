import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationsPanelComponent } from './publications-panel.component';

describe('PublicationsPanelComponent', () => {
  let component: PublicationsPanelComponent;
  let fixture: ComponentFixture<PublicationsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicationsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
