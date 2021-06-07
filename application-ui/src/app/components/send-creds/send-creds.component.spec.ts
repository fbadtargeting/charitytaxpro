import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendCredsComponent } from './send-creds.component';

describe('SendCredsComponent', () => {
  let component: SendCredsComponent;
  let fixture: ComponentFixture<SendCredsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendCredsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendCredsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
