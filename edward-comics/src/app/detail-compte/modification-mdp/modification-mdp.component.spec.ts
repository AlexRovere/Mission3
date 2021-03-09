import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationMdpComponent } from './modification-mdp.component';

describe('ModificationMdpComponent', () => {
  let component: ModificationMdpComponent;
  let fixture: ComponentFixture<ModificationMdpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificationMdpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationMdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
