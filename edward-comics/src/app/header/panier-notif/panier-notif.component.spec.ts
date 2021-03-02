import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierNotifComponent } from './panier-notif.component';

describe('PanierNotifComponent', () => {
  let component: PanierNotifComponent;
  let fixture: ComponentFixture<PanierNotifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanierNotifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanierNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
