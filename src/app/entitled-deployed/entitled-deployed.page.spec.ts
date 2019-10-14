import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitledDeployedPage } from './entitled-deployed.page';

describe('EntitledDeployedPage', () => {
  let component: EntitledDeployedPage;
  let fixture: ComponentFixture<EntitledDeployedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitledDeployedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitledDeployedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
