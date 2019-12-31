import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionCommitteComponent } from './decision-committe.component';

describe('DecisionCommitteComponent', () => {
  let component: DecisionCommitteComponent;
  let fixture: ComponentFixture<DecisionCommitteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionCommitteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionCommitteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
