import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Rc232Component } from './rc232.component';

describe('Rc232Component', () => {
  let component: Rc232Component;
  let fixture: ComponentFixture<Rc232Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Rc232Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Rc232Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
