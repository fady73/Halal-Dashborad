import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitAuditReportSection3Component } from './submit-audit-report-section3.component';

describe('SubmitAuditReportSection3Component', () => {
  let component: SubmitAuditReportSection3Component;
  let fixture: ComponentFixture<SubmitAuditReportSection3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitAuditReportSection3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitAuditReportSection3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
