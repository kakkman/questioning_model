import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudInfoPage } from './cloud-info.page';

describe('CloudInfoPage', () => {
  let component: CloudInfoPage;
  let fixture: ComponentFixture<CloudInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
