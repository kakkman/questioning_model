import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitiveInstallPage } from './competitive-install.page';

describe('CompetitiveInstallPage', () => {
  let component: CompetitiveInstallPage;
  let fixture: ComponentFixture<CompetitiveInstallPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitiveInstallPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitiveInstallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
