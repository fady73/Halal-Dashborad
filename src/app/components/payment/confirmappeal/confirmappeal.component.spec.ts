import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmappealComponent } from './confirmappeal.component';

describe('ConfirmappealComponent', () => {
  let component: ConfirmappealComponent;
  let fixture: ComponentFixture<ConfirmappealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmappealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmappealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
