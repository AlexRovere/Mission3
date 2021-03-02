import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosFacturationComponent } from './infos-facturation.component';

describe('InfosFacturationComponent', () => {
  let component: InfosFacturationComponent;
  let fixture: ComponentFixture<InfosFacturationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfosFacturationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosFacturationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
