import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HalallogoComponent } from './halallogo.component';

describe('HalallogoComponent', () => {
  let component: HalallogoComponent;
  let fixture: ComponentFixture<HalallogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HalallogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HalallogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
