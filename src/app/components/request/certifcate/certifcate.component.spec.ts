import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifcateComponent } from './certifcate.component';

describe('CertifcateComponent', () => {
  let component: CertifcateComponent;
  let fixture: ComponentFixture<CertifcateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertifcateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertifcateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
