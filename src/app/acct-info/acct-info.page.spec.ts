import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcctInfoPage } from './acct-info.page';

describe('AcctInfoPage', () => {
  let component: AcctInfoPage;
  let fixture: ComponentFixture<AcctInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcctInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcctInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
