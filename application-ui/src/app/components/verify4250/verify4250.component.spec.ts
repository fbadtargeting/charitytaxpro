import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Verify4250Component } from './verify4250.component';

describe('Verify4250Component', () => {
  let component: Verify4250Component;
  let fixture: ComponentFixture<Verify4250Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Verify4250Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Verify4250Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
