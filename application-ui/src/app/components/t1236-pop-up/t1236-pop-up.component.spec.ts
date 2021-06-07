import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { T1236PopUpComponent } from './t1236-pop-up.component';

describe('T1236PopUpComponent', () => {
  let component: T1236PopUpComponent;
  let fixture: ComponentFixture<T1236PopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ T1236PopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(T1236PopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
